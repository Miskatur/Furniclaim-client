import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { FaTrashAlt } from 'react-icons/fa';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import Loader from '../../../components/Loader/Loader';
import ConfirmationModal from '../../../Shared/ConfirmationModal/confirmationModal';

const MyProducts = () => {
    // const [product, setProduct] = useState(null)
    const { user, loading } = useContext(AuthContext)
    const [deletingProduct, setDeletingProduct] = useState(null)

    const { data: products = [], refetch, isLoading } = useQuery({
        queryKey: [user.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/product/${user.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json()
            return data
        }
    })
    const closeModal = () => {
        setDeletingProduct(null)
    }

    const handleDeletingProduct = (product) => {
        console.log([product]);
        fetch(`http://localhost:5000/product/${product?._id}`, {
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

    if (loading || isLoading) {
        return <Loader></Loader>
    }
    return (
        <div className='mt-12'>
            <h2 className='text-3xl text-center text-black font-bold'>My Products Inquire</h2>
            <div className="overflow-x-auto my-10">
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product Image</th>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Posted Date</th>
                            <th>Status</th>
                            <th>Advertisement</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            products.map((product, i) =>
                                <tr key={i} className="hover text-black hover:text-white">
                                    <th>{i + 1}</th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={product.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>{product.postedTime}</td>
                                    <td><p >{`${product.availabilty ? "Unsold" : "Sold"}`}</p>
                                    </td>
                                    <td>
                                        {
                                            product.availabilty ?
                                                <label
                                                    htmlFor="confirmation-modal" className="btn btn-xs btn-info ">
                                                    Advertise Now
                                                </label> :
                                                <p>Advertised</p>
                                        }
                                    </td>
                                    <td>
                                        <label onClick={() => setDeletingProduct(product)} htmlFor="confirmation-modal" className="btn btn-ghost ">
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
                deletingProduct &&
                <ConfirmationModal
                    title={`Are you Sure You want to Delete`}
                    message={`If you delete ${deletingProduct?.name}, it can not be undone again.`}
                    successAction={handleDeletingProduct}
                    successButtonName={`Delete`}
                    modalData={deletingProduct}
                    closeModal={closeModal}
                ></ConfirmationModal>

            }
        </div>
    );
};

export default MyProducts;  