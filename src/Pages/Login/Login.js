import { Player } from '@lottiefiles/react-lottie-player';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const Login = () => {
    const { Login } = useContext(AuthContext)

    const handleLogin = event => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const select = form.select.value;
        console.log(email, password, select);
        Login(email, password)
            .then(res => {
                const user = res.user;
                console.log(user)
            })
    }

    return (
        <div>
            <div className='grid lg:grid-cols-2 gap-5 my-20'>
                <div className='flex justify-center items-center'>
                    <Player
                        src='https://assets10.lottiefiles.com/packages/lf20_xlmz9xwm.json'
                        className="player"
                        loop
                        autoplay
                        style={{ height: '23em', width: '23em' }}
                    />
                </div>
                <div className='border bg-base-100 p-10 w-full lg:w-2/3 mr-auto rounded-xl shadow-xl'>
                    <h2 className='text-2xl text-secondary font-bold mb-5'>Login In</h2>
                    <form onSubmit={handleLogin}>
                        <input name='email' type="email" placeholder="Email Address" className="input input-bordered input-primary w-full mb-3 text-black" required />
                        <input name='password' type="password" placeholder="Password" className="input input-bordered input-primary w-full mb-3 text-black" required />
                        <div className="form-control w-full">
                            <label htmlFor="select" className="label">
                                <span className='label-text text-black'>  What Kind Of Account You Have?</span>
                            </label>
                            <select name='select' className="select select-primary w-full text-black mb-3">
                                <option>Buyer</option>
                                <option>Seller</option>
                            </select>
                        </div>
                        <button className='btn btn-secondary w-full'>Login</button>
                        <p className='text-black mt-2'>Don't Have an Account? <Link to={'/register'} className="font-bold">Register Now</Link></p>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;