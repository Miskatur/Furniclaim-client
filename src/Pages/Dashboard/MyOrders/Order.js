import React from 'react';

const Order = ({ order, i, handleDelete }) => {
    const { productName, productCategory, image, phone, availabilty, location } = order;

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
                <td>{phone}</td>
                <td>{location}</td>
                <td><button className='btn btn-secondary btn-sm'>{`${availabilty ? "Pay Now" : "Paid"}`}</button>
                </td>
                <td><button className='btn bg-red-500 hover:bg-red-700 text-white btn-xs' onClick={() => { handleDelete(order._id) }}>Delete</button>
                </td>

            </tr>
        </>


    );
};

export default Order;