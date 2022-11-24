import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaBook } from "react-icons/fa";


const Navbar = () => {

    const menuItems = <>
        <li><Link>Profile</Link></li>
        <li><Link>Settings</Link></li>
        <li><Link>Logout</Link></li>
    </>

    return (

        <div className="navbar mb-10 lg:my-0 lg:px-20 bg-secondary text-white">
            <div className="flex-1">
                <Link className="btn btn-ghost normal-case text-2xl font-bold " to={'/'}>Furniclaim</Link>
            </div>
            <div className="flex items-center">

                <Link className='flex items-center mr-3'><FaBook className='mr-3' /> <span > Blogs</span></Link>

                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost text-accent">
                        <div>
                            <FaBars></FaBars>
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 text-secondary rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;