import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const AllOrders = () => {

    const { data: allorders = [], refetch, } = useQuery({
        queryKey: [`allorders`],
        queryFn: async () => {
            const res = await fetch(`https://furniclaim-server.vercel.app/allorders`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data
        },
    })

    const handleDelete = id => {
        fetch(`https://furniclaim-server.vercel.app/order/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })

            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data?.acknowledged) {
                    toast.success('Orders Deleted Successfully!')
                    refetch()
                }
                else {
                    toast.error(data.message)
                }
            })
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
                                <th>Product Name</th>
                                <th>Buyer Name</th>
                                <th>Buyer Email</th>
                                <th>Seller Email</th>
                                <th>Price</th>
                                <th>Meeting Location</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                allorders.map((order, i) =>
                                    <tr key={order._id} className="hover text-secondary hover:text-white" >
                                        <th>{i + 1}</th>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={order.image} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{order.productName}</td>
                                        <td>{order.clientName}</td>
                                        <td>{order.clientEmail}</td>
                                        <td>{order.sellerEmail}</td>
                                        <td>{order.price}</td>
                                        <td>{order.location}</td>
                                        <td>
                                            {
                                                <button className='btn btn-xs btn-outline font-bold text-primary hover:text-white' onClick={() => handleDelete(order._id)}>Delete</button>

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

export default AllOrders;