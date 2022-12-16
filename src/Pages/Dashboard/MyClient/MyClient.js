import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { FaTrashAlt } from 'react-icons/fa';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import Loader from '../../../components/Loader/Loader';
import ConfirmationModal from '../../../Shared/ConfirmationModal/confirmationModal';

const MyClient = () => {
    const { user, loading } = useContext(AuthContext)
    const [deletingClient, setDeletingClient] = useState(null)
    const { data: clients = [], refetch, isLoading } = useQuery({
        queryKey: [user.email],
        queryFn: async () => {
            const res = await fetch(`https://furniclaim-server.vercel.app/products/client/${user.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json()
            return data
        }
    })


    const closeModal = () => {
        setDeletingClient(null)
    }
    const handleDeletingClient = (product) => {
        console.log([product]);
        fetch(`https://furniclaim-server.vercel.app/product/${product?._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data?.deletedCount > 0) {
                    toast.success(`You have succesfully deleted ${product?.name}`)
                    refetch()
                }
            })

    }
    console.log(clients);


    if (loading || isLoading) {
        return <Loader></Loader>
    }

    return (
        <div>
            <div className='mt-12'>
                <h2 className='text-3xl text-center text-black font-bold'>My Clients Inquire</h2>
                <div className="overflow-x-auto my-10">
                    <table className="table table-compact w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Client Image</th>
                                <th>Client Email</th>
                                <th>Client Name</th>
                                <th>Phone</th>
                                <th>transaction Id</th>
                                <th>Status</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                clients.map((client, i) =>
                                    <tr key={i} className="hover text-black hover:text-white">
                                        <th>{i + 1}</th>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={client.image} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{client.clientEmail}</td>
                                        <td>{client.clientName}</td>
                                        <td>{client.phone}</td>
                                        <td className='font-semibold'>{client.transactionId}</td>
                                        <td><p >{`${client.availabilty ? "Unsold" : "Sold"}`}</p>
                                        </td>

                                        <td>
                                            <label onClick={() => setDeletingClient(client)} htmlFor="confirmation-modal" className="btn btn-ghost ">
                                                <FaTrashAlt className='text-2xl text-red-600' />
                                            </label>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                {
                    deletingClient &&
                    <ConfirmationModal
                        title={`Are you Sure You want to Delete`}
                        message={`If you delete ${deletingClient?.name}, it can not be undone again.`}
                        successAction={handleDeletingClient}
                        successButtonName={`Delete`}
                        modalData={deletingClient}
                        closeModal={closeModal}
                    ></ConfirmationModal>

                }
            </div>
        </div>
    );
};

export default MyClient;