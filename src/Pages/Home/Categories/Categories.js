import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import Loader from '../../../components/Loader/Loader';
import Category from './Category/Category';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const { loading, setLoading } = useContext(AuthContext)

    useEffect(() => {
        axios.get(`https://furniclaim-server.vercel.app/categories`, {
            headers: {
                authorization: (`bearer ${localStorage.getItem('accessToken')}`)
            }
        })
            .then(res => {
                setCategories(res.data)
                setLoading(false)
            })
            .catch(error => console.error(error))
    }, [setLoading])

    if (loading) {
        return <Loader></Loader>
    }

    return (
        <div className='mb-20 lg:px-20'>
            <h1 className='text-4xl text-secondary font-bold text-center my-10'>Categories</h1>

            <div className='grid lg:grid-cols-4 gap-5'>
                {
                    categories.map(category => <Category
                        key={category._id}
                        category={category}
                    ></Category>)
                }

            </div>
        </div>
    );
};

export default Categories;