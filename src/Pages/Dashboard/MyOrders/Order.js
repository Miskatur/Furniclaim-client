import React from 'react';
import { Link } from 'react-router-dom';

const Order = ({ order, i, handleDelete }) => {
    const { productName, productCategory, image, phone, availabilty, location, _id, price } = order;

    return (
        <>
            <tr className="hover text-black hover:text-white">
                <th>{i + 1}</th>
                <td>
                    <div className="flex items-center space-x-3">
                        <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                                <img src={image} alt="Avatar Tailwind CSS Component" />
                            </div>
                        </div>
                    </div>

                </td>
                <td>{productName}</td>
                <td>{productCategory}</td>
                <td>${price}</td>
                <td>{phone}</td>
                <td>{location}</td>
                <td>
                    {
                        availabilty ?
                            <Link to={`/dashboard/myorder/payment/${_id}`}>
                                <button className='btn btn-secondary btn-sm'>{`${"Pay Now"}`}</button>
                            </Link> :

                            <p className='text-sm font-semibold bg-warning  w-[96px] text-white text-center rounded-lg'>Paid</p>

                    }
                </td>
                <td><button className='btn bg-red-500 hover:bg-red-700 text-white btn-xs' onClick={() => { handleDelete(order._id) }}>Delete</button>
                </td>

            </tr>
        </>


    );
};

export default Order;