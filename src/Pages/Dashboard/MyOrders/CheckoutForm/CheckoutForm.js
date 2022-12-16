import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../../components/Loader/Loader';

const CheckoutForm = ({ info }) => {
    const { price, clientEmail, clientName, productName, sellerEmail, phone, _id, productId } = info
    const [cardError, setCardError] = useState("")
    const [success, setSuccess] = useState("")
    const [transactionId, setTransactionId] = useState("")
    const [clientSecret, setClientSecret] = useState("");
    const stripe = useStripe()
    const elements = useElements()
    const [processing, setProcessing] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        setIsLoading(true)
        fetch("https://furniclaim-server.vercel.app/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data.clientSecret)
                setIsLoading(false)
            });
    }, [price]);

    if (isLoading) {
        return <Loader></Loader>
    }


    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })

        console.log(paymentMethod)

        if (error) {
            setCardError(error.message)
        }
        else {
            setCardError('')
        }

        setSuccess('')
        setProcessing(true)
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: clientName,
                        email: clientEmail
                    },
                },

            },
        );
        console.log(paymentIntent);

        if (confirmError) {
            setCardError(confirmError.message)
            return;
        }

        if (paymentIntent.status === "succeeded") {

            const payment = {
                price,
                transactionId: paymentIntent.id,
                clientEmail,
                bookingId: _id,
                productName,
                sellerEmail,
                phone
            }
            fetch(`https://furniclaim-server.vercel.app/payments`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        setSuccess('Congrats! Your Payment Completed!')
                        setTransactionId(paymentIntent.id)
                        toast.success(`Congrats! Your Payment Completed!`)
                        fetch(`https://furniclaim-server.vercel.app/product/update/${productId}`, {
                            method: 'PUT',
                            headers: {
                                'content-type': 'application/json',
                                authorization: `bearer ${localStorage.getItem('accessToken')}`
                            }
                        })
                            .then(res => res.json())
                            .then(data => {
                            })
                        navigate('/dashboard/myorders')
                    }
                })
        }
        setProcessing(false)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: 'text-secondary',
                                '::placeholder': {
                                    color: 'text-secondary',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" className='btn btn-sm btn-primary mt-5' disabled={!stripe || !clientSecret || processing}>
                    Pay Now
                </button>
            </form>
            <p className='text-red-500 text-center pt-3'>{cardError}</p>
            {
                success && <div>
                    <p className='text-green-500'>{success}</p>
                    <p><small>Your Transaction Id: {transactionId}</small></p>
                </div>
            }
        </div>
    );
};

export default CheckoutForm;