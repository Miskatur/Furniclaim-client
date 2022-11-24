import React from 'react';
import { Link } from 'react-router-dom';

const Category = ({ category }) => {
    const { _id, image, name } = category;
    return (
        <div>
            <Link to={`/category/${_id}`}>
                <div className={`card hover:bg-accent bg-base-100 shadow-xl text-secondary`}>
                    <div className="card-body">
                        <div className="card-actions justify-center">
                            <img src={image} alt="" className='w-1/3' />
                        </div>
                        <p className='text-2xl font-bold'>{name}</p>
                    </div>
                </div></Link>
        </div>
    );
};

export default Category;