import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../AuthProvider/AuthProvider';

const AddProduct = () => {
    const { user } = useContext(AuthContext)
    const date = new Date().toISOString().split('T')[0];
    const [loggedInUser, setLoggedInUser] = useState([])
    const { verified, email, name, _id } = loggedInUser;
    const ImgKey = process.env.REACT_APP_ImgBB_API_KEY;
    const navigate = useNavigate()
    useEffect(() => {
        fetch(`https://furniclaim-server.vercel.app/users/${user?.email}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setLoggedInUser(data)
            })

    }, [user])

    const handleAddProduct = event => {
        event.preventDefault();
        const form = event.target;
        const productName = form.name.value;
        const location = form.location.value;
        const usedYear = form.usedYear.value;
        const category = form.category.value;
        const condition = form.condition.value;
        const originalPrice = form.originalPrice.value;
        const resalePrice = form.resalePrice.value;
        const image = form.image.files[0];
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
                    const productsInfo = {
                        category,
                        image: data.data.url,
                        name: productName,
                        location,
                        resalePrice,
                        originalPrice,
                        usedYear,
                        postedTime: date,
                        sellerName: name,
                        verified,
                        condition,
                        email,
                        availabilty: true,
                        sellerId: _id
                    }

                    fetch(`https://furniclaim-server.vercel.app/products`, {
                        method: 'POST',
                        headers: {
                            "content-type": "application/json",
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(productsInfo)
                    })
                        .then(res => res.json())
                        .then((data) => {
                            if (data.acknowledged) {
                                toast.success('You have Successfully Added A Product!')
                                navigate('/dashboard/myproducts')
                            }
                        })
                }
            })
    }

    return (
        <div className='my-3'>
            <div className='border bg-base-100 p-10 lg:w-2/3 mr-auto rounded-xl shadow-xl'>
                <h2 className='text-2xl text-secondary font-bold mb-5'>Provide Your Furniture Information</h2>
                <form onSubmit={handleAddProduct} className='text-black'>
                    <input name='name' type="text" placeholder="Product Name" className="input input-bordered input-primary w-full mb-3" required />
                    <input name='location' type="text" placeholder="Your Location" className="input input-bordered input-primary w-full mb-3" required />
                    <input name='usedYear' type="text" placeholder="How many years did you used?" className="input input-bordered input-primary w-full mb-3" required />
                    <div className="form-control w-full">
                        <label htmlFor="category" className="label">
                            <span className='label-text text-black'>  What is your furniture category?</span>
                        </label>
                        <select name='category' className="select select-primary w-full text-black mb-3">
                            <option>Chairs</option>
                            <option>Tables</option>
                            <option>Beds</option>
                            <option>Sofas</option>
                        </select>
                    </div>
                    <div className="form-control w-full">
                        <label htmlFor="condition" className="label">
                            <span className='label-text text-black'>  What is your furniture condition?</span>
                        </label>
                        <select name='condition' className="select select-primary w-full text-black mb-3">
                            <option>Good</option>
                            <option>Fair</option>
                            <option>Excellent</option>
                        </select>
                    </div>
                    <input name='originalPrice' type="number" placeholder="Original Price" className="input input-bordered input-primary w-full mb-3" required />
                    <input name='resalePrice' type="number" placeholder="Your Price" className="input input-bordered input-primary w-full mb-3" required />
                    <div className="form-control w-full">
                        <label htmlFor="file" className="label"><span className='label-text text-black'>
                            Provide Your Furniture Picture </span>
                        </label>
                        <input name='image' type="file" className="file-input file-input-bordered file-input-secondary w-full text-black mb-5" required />
                    </div>
                    <button className='btn btn-secondary w-full'>Add Product</button>
                </form>
            </div>

        </div>
    );
};

export default AddProduct;