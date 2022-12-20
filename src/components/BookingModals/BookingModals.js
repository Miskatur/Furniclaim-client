import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const BookingModals = ({ furniture, setFurniture }) => {
    const { user } = useContext(AuthContext)
    const { image, category, name, email, resalePrice, availabilty, _id } = furniture;

    const handleModalsData = event => {
        event.preventDefault()
        const form = event.target;
        const clientName = form.name.value;
        const clientEmail = form.email.value;
        const productName = form.productName.value;
        const price = form.price.value;
        const phone = form.phone.value;
        const location = form.location.value;
        const orderData = {
            clientName,
            clientEmail,
            productName,
            price,
            phone,
            location,
            image,
            productCategory: category,
            sellerEmail: email,
            availabilty,
            productId: _id
        }
        console.log(orderData)
        fetch(`https://furniclaim-server.vercel.app/orders`, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(orderData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    setFurniture(null)
                    toast.success('Added To The Cart Successfully.')

                }
                else {
                    toast.error(data.message)
                }
            })
    }
    return (
        <>
            <input type="checkbox" id="addCart-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="addCart-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className={`text-lg font-bold `}>{ }</h3>
                    <form onSubmit={handleModalsData}>
                        <input type="text" name='name' value={`${user.displayName}`} className={`input input-bordered font-semibold text-secondary w-full mb-5`} readOnly />

                        <input type="text" name='email' value={`${user.email}`} className={`input input-bordered font-semibold text-secondary  w-full mb-5`} readOnly />

                        <input type="text" name='productName' value={`${name}`} className={`input input-bordered font-semibold text-secondary  w-full mb-5`} readOnly />

                        <input type="text" name='price' value={`${resalePrice}`} className={`input input-bordered font-semibold text-secondary  w-full mb-5`} readOnly />

                        <input type="number" name='phone' placeholder="Phone Number" className={`input input-bordered font-semibold text-secondary w-full mb-5 `} required />

                        <input type="text" name='location' placeholder="Your Location" className={`input input-bordered font-semibold text-secondary w-full mb-5 `} required />


                        <input type="submit" value="Add To Cart" className='btn text-white font-semibold w-full' />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModals;