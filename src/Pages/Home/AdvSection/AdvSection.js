import React, { useEffect, useState } from 'react';
import Product from '../../Furnitures/Product/Product';

const AdvSection = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch(`https://furniclaim-server.vercel.app/advproduct`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    console.log(products);
    // var settings = {
    //     dots: true,
    //     infinite: true,
    //     slidesToShow: 3,
    //     slidesToScroll: 1,
    //     autoplay: true,
    //     autoplaySpeed: 2000,
    //     pauseOnHover: true
    // };
    return (
        <div>
            <h2 className='text-3xl font-bold text-secondary text-center'>Advertisement</h2>
            <div className='content my-12'>

                <div className='grid lg:grid-cols-3 gap-5 my-10 mx-5 lg:mx-0'>
                    {
                        products.map((product) => <Product
                            key={product._id}
                            product={product}
                        ></Product>)
                    }
                </div>
            </div>
        </div>

    );
};

export default AdvSection;