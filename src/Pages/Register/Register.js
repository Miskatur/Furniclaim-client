import { Player } from '@lottiefiles/react-lottie-player';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { setAuthtoken } from '../../AuthToken/AuthToken';

const Register = () => {
    const navigate = useNavigate()
    const { createUser, updateUserInfo } = useContext(AuthContext)
    const [errorMessage, setErrorMessage] = useState('')
    const ImgKey = process.env.REACT_APP_ImgBB_API_KEY;

    const handleRegister = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value
        const email = form.email.value;
        const image = form.image.files[0];
        const password = form.password.value;
        const role = form.select.value;
        console.log(name, email, image, password, role)
        createUser(email, password)
            .then(res => {
                const user = res.user;
                setAuthtoken(user)
                fetch(`http://localhost:5000/user/${user?.email}`, {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": true,
                        authorization: (`bearer ${localStorage.getItem('accessToken')}`)
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        localStorage.setItem('role', data?.role)
                    })
                const formData = new FormData()
                formData.append('image', image)
                const url = `https://api.imgbb.com/1/upload?key=${ImgKey}`
                fetch(url, {
                    method: 'POST',
                    body: formData
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.success) {
                            updateUserInfo(name, data.data.url)
                                .then(() => { })
                                .catch(error => console.error(error))
                            const user = {
                                name: name,
                                email: email,
                                image: data.data.url,
                                role: role,
                                verified: false
                            }
                            fetch(`http://localhost:5000/users`, {
                                method: 'POST',
                                headers: {
                                    "content-type": "application/json",
                                    authorization: (`bearer ${localStorage.getItem('accessToken')}`)
                                },
                                body: JSON.stringify(user)
                            })
                                .then(res => res.json())
                                .then((data) => {
                                    if (data.acknowledged) {
                                        toast.success('User created Successfully!')
                                        localStorage.setItem('role', role)
                                        navigate('/')
                                    }
                                    console.log(data)
                                })
                        }

                    })
            })
            .catch(err => {
                const message = err.message;
                setErrorMessage(message)
            })

    }

    return (
        <div>
            <div className='grid lg:grid-cols-2 gap-5 my-20'>
                <div className='flex justify-center items-center'>
                    <Player
                        src='https://assets10.lottiefiles.com/packages/lf20_jcikwtux.json'
                        className="player"
                        loop
                        autoplay
                        style={{ height: '25em', width: '25em' }}
                    />
                </div>
                <div className='border bg-base-100 p-10 w-2/3 mr-auto rounded-xl shadow-xl'>
                    <h2 className='text-2xl text-secondary font-bold mb-5'>Registration Form</h2>
                    <form onSubmit={handleRegister} className='text-black'>
                        <input name='name' type="text" placeholder="Full Name" className="input input-bordered input-primary w-full mb-3" required />
                        <input name='email' type="email" placeholder="Email Address" className="input input-bordered input-primary w-full mb-3" required />
                        <input name='password' type="password" placeholder="Password" className="input input-bordered input-primary w-full mb-3" required />
                        <div className="form-control w-full">
                            <label htmlFor="select" className="label">
                                <span className='label-text text-black'>  What Kind Of Account You Want to Create?</span>
                            </label>
                            <select name='select' className="select select-primary w-full text-black mb-3">
                                <option>Buyer</option>
                                <option>Seller</option>
                            </select>
                        </div>

                        <div className="form-control w-full">
                            <label htmlFor="file" className="label"><span className='label-text text-black'>
                                Provide Your Profile Picture </span>
                            </label>
                            <input name='image' type="file" className="file-input file-input-bordered file-input-secondary w-full text-black mb-5" />
                        </div>
                        <p className='text-red-500'>{errorMessage}</p>
                        <button className='btn btn-secondary w-full'>Register</button>
                        <p className='text-black mt-2'>Already Have an Account? <Link to={'/login'} className="font-bold">Login Now</Link></p>
                    </form>
                </div>
            </div >
        </div >
    );
};

export default Register;