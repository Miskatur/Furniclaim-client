import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaBook, FaGoogle } from "react-icons/fa";
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';
import toast from 'react-hot-toast';


const Navbar = () => {
    const googleProvider = new GoogleAuthProvider()
    const { user, setUser, Logout, googleSignIn } = useContext(AuthContext)
    const handleLogout = () => {
        Logout()
            .then(() => { })
            .catch(error => console.error(error))

    }

    const handleGoogleSignIn = () => {
        googleSignIn(googleProvider)
            .then(res => {
                const user = res.user;
                setUser(user)
                console.log(user);
            })
            .catch(error => {
                const message = error.message;
                toast.error(message)
            })
    }

    const menuItems = <>
        <li><Link>Profile</Link></li>
        <li><Link>Settings</Link></li>
        {
            user?.uid ?
                <>
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

                <Link className='btn btn-ghost flex items-center'><FaBook className='mr-3' /> <span >Blogs</span></Link>
                {
                    user?.uid ?
                        <>
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
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={user?.photoURL} alt="" />
                                    </div>
                                </label>
                                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 text-secondary rounded-box w-52">
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
        </div>
    );
};

export default Navbar;