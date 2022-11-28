import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaGoogle } from "react-icons/fa";
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';
import toast from 'react-hot-toast';
import { setAuthtoken } from '../../AuthToken/AuthToken';

const Navbar = () => {
    const navigate = useNavigate()
    const googleProvider = new GoogleAuthProvider()
    const { user, setUser, Logout, googleSignIn } = useContext(AuthContext)
    const role = localStorage.getItem('role')
    const handleLogout = () => {
        Logout()
            .then(() => {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('role')
                navigate('/')
            })
            .catch(error => console.error(error))
    }
    const handleGoogleSignIn = () => {
        googleSignIn(googleProvider)
            .then(res => {
                const user = res.user;
                setUser(user)
                setAuthtoken(user)
                localStorage.setItem('role', 'Buyer')
            })
            .catch(error => {
                const message = error.message;
                toast.error(message)
            })
    }
    const menuItems = <>
        {
            user?.uid ?
                <>
                    {
                        role === "Buyer" &&
                        <>
                            <li><Link className='lg:hidden' to={'/allproducts'}>All Products</Link></li>
                        </>
                    }

                    <li><Link className='lg:hidden' to={'/dashboard'}>Dashboard</Link></li>

                    <li><Link className='lg:hidden' onClick={handleLogout}>Logout</Link></li>
                </> :
                <>
                    <li><Link className='lg:hidden'>Login</Link></li>
                    <li><Link className='btn btn-primary lg:hidden text-white' onClick={handleGoogleSignIn}>Sign In With Google</Link></li>
                </>
        }
    </>

    return (

        <div className="navbar mb-10 lg:my-0 lg:px-20 bg-secondary text-accent">
            <div className="flex-1">
                <Link className="btn btn-ghost normal-case text-2xl font-bold " to={'/'}>Furniclaim</Link>
            </div>
            <div className="flex items-center">

                <Link className='btn btn-ghost text-accent font-bold' to={'/blog'}>Blogs</Link>
                {
                    user?.uid ?
                        <>
                            {
                                role === "Buyer" &&
                                <Link className='text-accent font-bold btn btn-ghost hidden lg:flex' to={'/allproducts'}>All Products</Link>
                            }
                            {
                                role === "Admin" &&
                                <Link className='text-accent font-bold btn btn-ghost hidden lg:flex' to={'/allproducts'}>All Products</Link>
                            }
                            <Link className=' text-accent font-bold btn btn-ghost hidden lg:flex' to={'/dashboard'}>Dashboard</Link>
                            <Link className=' text-accent font-bold btn btn-ghost hidden lg:flex' onClick={handleLogout}>Logout</Link>
                        </> :
                        <>
                            <Link to={'/login'} className='text-accent font-bold btn btn-ghost hidden lg:flex'>Login</Link>
                            <Link className='btn btn-ghost btn-outline hover:text-primary hidden lg:flex text-accent' onClick={handleGoogleSignIn}>Sign In With <FaGoogle className='ml-2' /></Link>
                        </>
                }
                <div>
                    {
                        user?.uid ?
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar ">
                                    <div className="w-10 rounded-full">
                                        <img src={user?.photoURL} alt="" />
                                    </div>
                                </label>
                                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 text-secondary rounded-box w-52 lg:hidden">
                                    {menuItems}
                                </ul>
                            </div>
                            :
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle flex justify-center items-center lg:hidden">
                                    <div className="w-10 rounded-full flex justify-center items-center">
                                        <FaBars />
                                    </div>
                                </label>
                                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 text-secondary rounded-box w-52">
                                    {menuItems}
                                </ul>
                            </div>
                    }
                </div>
            </div>
            {
                user?.uid &&
                <label htmlFor="dashboard-drawer" tabIndex={2} className="btn btn-ghost md:hidden mr-auto drawer-button">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg></label>
            }
        </div>
    );
};

export default Navbar;