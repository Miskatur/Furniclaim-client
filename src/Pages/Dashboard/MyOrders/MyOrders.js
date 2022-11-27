import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import Loader from '../../../components/Loader/Loader';
import Order from './Order';

const MyOrders = () => {
    const { user } = useContext(AuthContext)
    const url = `http://localhost:5000/orders?email=${user?.email}`
    const { data: orders = [], isLoading } = useQuery({
        queryKey: [`${user?.email}`],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data
        },
    })
    console.log(orders.length);
    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div className='text-left my-12'>
            <h2 className='text-3xl text-center text-black font-bold'>My Orders Inquire</h2>

            <div className="overflow-x-auto my-10 ">
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product Image</th>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Your Phone</th>
                            <th>Location</th>
                            <th>Payment</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            orders.map((order, i) => <Order
                                key={order._id}
                                order={order}
                                i={i}
                            ></Order>)
                        }
                    </tbody>


                </table>

            </div>
        </div>
    );
};

export default MyOrders;