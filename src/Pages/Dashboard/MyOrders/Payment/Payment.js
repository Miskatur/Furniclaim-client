import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Loader from '../../../../components/Loader/Loader';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';



const Payment = () => {
    const navigation = useNavigation()
    const info = useLoaderData()
    console.log(info);
    const { productName, price } = info;
    if (navigation.state === 'loading') {
        return <Loader></Loader>
    }

    const stripePromise = loadStripe(`${process.env.REACT_APP_stripe_key}`);

    return (
        <div>
            <div className='px-5'>
                <h2 className="text-2xl text-center my-5 text-black">Payment for <span className=' font-bold text-md text-secondary'>{productName}</span></h2>
                <p className='text-center text-sm text-black'>Please purchase <span className=' font-bold text-md text-secondary'>${price}</span> for your choosen product.</p>

                <div className='my-16 '>
                    <h2 className='text-center text-xl font-semibold my-5 text-secondary'>Your Payment Information here</h2>
                    <div className='w-full lg:w-3/5 mx-auto border-2 p-10 shadow-lg rounded-lg bg-gray-100 border-primary'>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm
                                info={info}
                            />
                        </Elements>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;