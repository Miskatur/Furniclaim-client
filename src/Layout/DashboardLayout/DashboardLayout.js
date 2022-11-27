import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../../Shared/Navbar/Navbar';

const DashboardLayout = () => {
    const role = localStorage.getItem('role')
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle  " />
                <div className="drawer-content">
                    <Outlet></Outlet>

                </div>
                <div className="drawer-side lg:px-10">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 lg:bg-transparent text-secondary font-bold">
                        {/* <!-- Sidebar content here --> */}
                        {
                            role === 'Buyer' &&
                            <li className=' hover:text-primary'><Link to={'/dashboard/myorders'}>My Orders</Link></li>
                        }
                        {
                            role === "Admin" &&
                            <>
                                <li className=' hover:text-primary'><Link to={'/dashboard/allsellers'}>All Sellers</Link></li>
                                <li className=' hover:text-primary'><Link to={'/dashboard/allbuyers'}>All Buyers</Link></li>
                                <li className=' hover:text-primary'><Link to={'/dashboard/reporteditems'}>Reported Items</Link></li>
                            </>
                        }
                        {
                            role === "Seller" &&
                            <>
                                <li className=' hover:text-primary'><Link to={'/dashboard/myproducts'}>My Products</Link></li>
                                <li className=' hover:text-primary'><Link to={'/dashboard/addproduct'}>Add a Product</Link></li>
                            </>
                        }
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;