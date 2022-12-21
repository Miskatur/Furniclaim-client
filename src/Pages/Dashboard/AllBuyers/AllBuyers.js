import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import Loader from '../../../components/Loader/Loader';

const AllBuyers = () => {
    const { data: buyers = [], refetch, isLoading } = useQuery({
        queryKey: ["buyer"],
        queryFn: async () => {
            const res = await fetch(`https://furniclaim-server.vercel.app/users/admin/buyer`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data
        },
    })

    const handleDelete = (id) => {
        fetch(`https://furniclaim-server.vercel.app/users/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })

            .then(res => res.json())
            .then(data => {
                if (data?.acknowledged) {
                    toast.success('Buyers Deleted Successfully!')
                    refetch()
                }
                else {
                    toast.error(data.message)
                }
            })
    }
    if (isLoading) {
        <Loader></Loader>
    }

    return (
        <div>
            <div className='text-left my-12'>
                <h2 className='text-3xl text-center text-black font-bold'>My Orders Inquire</h2>
                <div className="overflow-x-auto my-10 ">
                    <table className="table table-compact w-full">

                        <thead>
                            <tr>
                                <th></th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                buyers.map((buyer, i) =>
                                    <tr key={buyer._id} className="hover text-secondary hover:text-white" >
                                        <th>{i + 1}</th>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={buyer.image} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{buyer.name}</td>
                                        <td>{buyer.email}</td>
                                        <td>
                                            {
                                                <button className='btn btn-xs btn-outline font-bold text-primary hover:text-white' onClick={() => handleDelete(buyer._id)}>Delete</button>

                                            }
                                        </td>
                                        <td>

                                        </td>
                                    </tr>

                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>


        </div>
    );
};

export default AllBuyers;