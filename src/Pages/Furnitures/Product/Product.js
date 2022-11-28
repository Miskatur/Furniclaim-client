import React from 'react';

const Product = ({ product, setFurniture }) => {
    const { condition, image, location, name, originalPrice, postedTime, resalePrice, sellerName, usedYear, verified, availabilty } = product;
    const role = localStorage.getItem('role')
    return (
        <div>

            {availabilty &&
                <div className="card w-96 mx-auto h-[560px] bg-base-100 lg:shadow-xl border-2 relative ">
                    <figure><img src={image} alt="Shoes" className='h-64 w-full rounded-2xl' /></figure>
                    <div className='mx-5 text-left'>
                        <h2 className="card-title font-bold text-center text-secondary h-20">
                            {name}
                        </h2>
                        <div className='flex justify-between items-center text-black '>
                            <p className='font-semibold'>Seller : <span className='font-bold'>{sellerName}</span></p>
                            <>
                                {
                                    verified ?
                                        <div className="badge  badge-secondary">Verified</div> :
                                        <div className='badge badge-warning'>Not Verified</div>
                                }
                            </>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='font-semibold text-black'>Location : <span className='font-bold'>{location}</span></p>
                            <p className='text-black'><small>Posted Date : {postedTime}</small></p>
                        </div>
                        <div className='text-black flex justify-between items-center my-3'>
                            <p className='font-semibold'>Price : <span className='font-bold'>{resalePrice}</span></p>
                            <p className='font-semibold'>Original Price : <span><del>{originalPrice}</del></span></p>
                        </div>
                        <div className='text-black flex justify-between items-center'>
                            <div>
                                <p className='font-semibold'>Condition : <span className='font-bold'>{condition}</span></p>
                                <p className='font-semibold'>Used For : <span className='font-bold'>{usedYear} Years</span></p>
                            </div>
                            <div>
                                <button className='btn btn-xs bg-red-500 hover:bg-red-700 text-white font-bold'>Report</button>
                            </div>
                        </div>
                    </div>
                    {
                        role === 'Buyer' &&
                        <label
                            onClick={() => setFurniture(product)}
                            htmlFor="addCart-modal"
                            className='btn btn-outline rounded-lg btn-secondary w-full absolute bottom-0'
                        >
                            Add to Cart
                        </label>
                    }
                    {
                        role === 'Admin' &&
                        <label
                            onClick={() => setFurniture(product)}
                            htmlFor="addCart-modal"
                            className='btn btn-outline rounded-lg btn-secondary w-full absolute bottom-0'
                        >
                            Add to Cart
                        </label>
                    }

                    {
                        role === 'Seller' &&
                        <p className='text-secondary text-2xl flex justify-center items-center mt-5'>You can't buy Products</p>
                    }




                </div>
            }
        </div>
    );
};

export default Product;