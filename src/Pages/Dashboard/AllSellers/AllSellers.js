import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const AllSellers = () => {
    const { data: buyers = [], refetch } = useQuery({
        queryKey: ["seller"],
        queryFn: async () => {
            const res = await fetch(`https://furniclaim-server.vercel.app/users/admin/seller`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data
        },
    })

    const handleVerify = (seller) => {
        console.log(seller)
        fetch(`https://furniclaim-server.vercel.app/users/admin/seller/verify/${seller._id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })

            .then(res => res.json())
            .then(data => {
                if (data?.modifiedCount > 0) {
                    toast.success('Seller Verified Successfully!')
                    fetch(`https://furniclaim-server.vercel.app/userverify/${seller._id}`, {
                        method: 'PUT',
                        headers: {
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        }
                    })
                        .then(res => res.json())
                        .then((data) => { console.log(data); })
                    refetch()
                }
                else {
                    toast.error(data.message)
                }
            })
    }
    const handleDelete = (id) => {
        fetch(`https://furniclaim-server.vercel.app/users/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })

            .then(res => res.json())
            .then(data => {
                if (data?.modifiedCount > 0) {
                    toast.success('Sellers Deleted Successfully!')
                    refetch()
                }
                else {
                    toast.error(data.message)
                }
            })
    }


    console.log(buyers)
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
                                <th>Verify</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                buyers.map((seller, i) =>
                                    <tr key={seller._id} className="hover text-secondary hover:text-white" >
                                        <th>{i + 1}</th>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={seller.image} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{seller.name}</td>
                                        <td>{seller.email}</td>
                                        <td>
                                            {
                                                seller.verified === false && <button className='btn btn-xs btn-outline font-bold text-primary hover:text-white' onClick={() => handleVerify(seller)}>verify</button>
                                            }
                                            {
                                                seller.verified === true && <p className='text-center'>Verified</p>
                                            }
                                        </td>
                                        <td>
                                            <button className='btn btn-xs btn-outline font-bold text-primary hover:text-white' onClick={() => handleDelete(seller._id)}>Delete</button>
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

export default AllSellers;