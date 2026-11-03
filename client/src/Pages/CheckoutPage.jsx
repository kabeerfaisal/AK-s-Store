import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiLock, FiTruck, FiCreditCard, FiCheckCircle, FiArrowLeft, FiShoppingBag } from 'react-icons/fi';
import { CartContext } from '../hooks/CartHook';
import { createOrder } from '../services/orderServices';


const Checkout = () => {
  const navigate = useNavigate();
  const { cart, cartSubtotal, getCartData } = useContext(CartContext);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    streetAddress: '',
    city: '',
    postalCode: '',
    paymentMethod: 'COD',
  });

  // Calculate Shipping (Free above PKR 5,000, else 250)
  const shippingFee = cartSubtotal > 5000 || cartSubtotal === 0 ? 0 : 250;
  const totalAmount = cartSubtotal + shippingFee;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setLoading(true);

    try {
      const orderPayload = {
        shippingAddress: {
          fullName: formData.fullName,
          phone: formData.phone,
          streetAddress: formData.streetAddress,
          city: formData.city,
          postalCode: formData.postalCode,
        },
        paymentMethod: formData.paymentMethod,
      };

      const response = await createOrder(orderPayload);

      if (response.success) {
        // Clear local context state by re-fetching (backend clear ho chuka hai)
        await getCartData();
        alert("Order placed successfully!");
        navigate(`/order-success/${response.order._id}`, { state: { order: response.order } });
        // navigate('/')
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to place order. Please try again.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#120404] text-[#EEEEEE] flex flex-col items-center justify-center p-6 text-center">
        <FiShoppingBag className="h-16 w-16 text-[#EAD196]/40 mb-4" />
        <h2 className="text-2xl font-bold tracking-wide">Your Cart is Empty</h2>
        <p className="text-sm text-[#EEEEEE]/60 mt-2 mb-6">Add some products to your cart before proceeding to checkout.</p>
        <Link
          to="/shop"
          className="bg-[#BF3131] hover:bg-[#7D0A0A] text-white px-6 py-3 rounded-lg font-mono text-xs uppercase tracking-wider transition"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#120404] text-[#EEEEEE] py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Back Link */}
        <Link to="/shop" className="inline-flex items-center space-x-2 text-xs font-mono text-[#EAD196] hover:underline mb-6">
          <FiArrowLeft className="h-4 w-4" />
          <span>BACK TO SHOPPING</span>
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-wide mb-8 border-b border-[#EAD196]/20 pb-4">
          Checkout & Order Review
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Shipping & Payment Form */}
          <div className="lg:col-span-7 space-y-6">
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
              
              {/* Shipping Address Section */}
              <div className="bg-[#1A0808] p-6 rounded-2xl border border-[#EAD196]/20 shadow-xl space-y-4">
                <div className="flex items-center space-x-2 border-b border-[#EAD196]/10 pb-3">
                  <FiTruck className="text-[#EAD196] h-5 w-5" />
                  <h2 className="text-lg font-bold text-[#EEEEEE]">Shipping Address</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-mono text-[#EAD196] mb-1">FULL NAME *</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Ali Khan"
                      className="w-full bg-[#120404] border border-[#EAD196]/20 rounded-lg px-4 py-2.5 text-sm text-[#EEEEEE] focus:outline-none focus:border-[#EAD196] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#EAD196] mb-1">PHONE NUMBER *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="03001234567"
                      className="w-full bg-[#120404] border border-[#EAD196]/20 rounded-lg px-4 py-2.5 text-sm text-[#EEEEEE] focus:outline-none focus:border-[#EAD196] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#EAD196] mb-1">CITY *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g. Karachi"
                      className="w-full bg-[#120404] border border-[#EAD196]/20 rounded-lg px-4 py-2.5 text-sm text-[#EEEEEE] focus:outline-none focus:border-[#EAD196] transition"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-mono text-[#EAD196] mb-1">STREET ADDRESS *</label>
                    <input
                      type="text"
                      name="streetAddress"
                      required
                      value={formData.streetAddress}
                      onChange={handleChange}
                      placeholder="House #, Street name, Area"
                      className="w-full bg-[#120404] border border-[#EAD196]/20 rounded-lg px-4 py-2.5 text-sm text-[#EEEEEE] focus:outline-none focus:border-[#EAD196] transition"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-mono text-[#EAD196] mb-1">POSTAL / ZIP CODE *</label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="e.g. 75300"
                      className="w-full bg-[#120404] border border-[#EAD196]/20 rounded-lg px-4 py-2.5 text-sm text-[#EEEEEE] focus:outline-none focus:border-[#EAD196] transition"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Section */}
              <div className="bg-[#1A0808] p-6 rounded-2xl border border-[#EAD196]/20 shadow-xl space-y-4">
                <div className="flex items-center space-x-2 border-b border-[#EAD196]/10 pb-3">
                  <FiCreditCard className="text-[#EAD196] h-5 w-5" />
                  <h2 className="text-lg font-bold text-[#EEEEEE]">Payment Method</h2>
                </div>

                <div className="space-y-3 pt-2">
                  <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition ${
                    formData.paymentMethod === 'COD' 
                      ? 'bg-[#120404] border-[#EAD196]' 
                      : 'border-[#EAD196]/20 opacity-70'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="COD"
                        checked={formData.paymentMethod === 'COD'}
                        onChange={handleChange}
                        className="accent-[#EAD196]"
                      />
                      <div>
                        <p className="text-sm font-bold text-[#EEEEEE]">Cash on Delivery (COD)</p>
                        <p className="text-xs text-[#EEEEEE]/60">Pay with cash upon package delivery.</p>
                      </div>
                    </div>
                    <FiCheckCircle className={`h-5 w-5 ${formData.paymentMethod === 'COD' ? 'text-[#EAD196]' : 'text-transparent'}`} />
                  </label>

                  <label className="flex items-center justify-between p-4 rounded-xl border border-[#EAD196]/10 opacity-40 cursor-not-allowed">
                    <div className="flex items-center space-x-3">
                      <input type="radio" disabled name="paymentMethod" value="Card" />
                      <div>
                        <p className="text-sm font-bold text-[#EEEEEE]">Credit / Debit Card</p>
                        <p className="text-xs text-[#EEEEEE]/60">Online card payment (Coming Soon)</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-[#1A0808] p-6 rounded-2xl border border-[#EAD196]/20 shadow-xl sticky top-6 space-y-6">
              <h2 className="text-lg font-bold text-[#EEEEEE] border-b border-[#EAD196]/10 pb-3">
                Order Summary ({cart.length} {cart.length === 1 ? 'item' : 'items'})
              </h2>

              {/* Items List */}
              <div className="max-h-64 overflow-y-auto space-y-3 pr-2">
                {cart.map((item, idx) => {
                  const product = item.productId || {};
                  const title = product.title || item.title || "Product";
                  const image = product.images?.[0]?.url || item.images?.[0]?.url || item.images?.[0] || 'https://via.placeholder.com/60';

                  return (
                    <div key={`${item._id || idx}-${item.selectedSize}`} className="flex items-center space-x-3 bg-[#120404]/50 p-2.5 rounded-xl border border-[#EAD196]/10">
                      <img src={image} alt={title} className="w-12 h-12 object-contain rounded-lg bg-white/5" />
                      <div className="grow min-w-0">
                        <h4 className="text-xs font-bold text-[#EEEEEE] truncate">{title}</h4>
                        <p className="text-[11px] text-[#EAD196] font-mono">
                          {item.quantity} x PKR {item.price?.toLocaleString()}
                        </p>
                        {item.selectedSize && (
                          <span className="text-[9px] text-[#EEEEEE]/50 uppercase">Size: {item.selectedSize}</span>
                        )}
                      </div>
                      <span className="text-xs font-bold font-mono text-[#EEEEEE]">
                        PKR {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-[#EAD196]/10 pt-4 space-y-2.5 text-xs font-mono">
                <div className="flex justify-between text-[#EEEEEE]/70">
                  <span>Subtotal</span>
                  <span>PKR {cartSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#EEEEEE]/70">
                  <span>Shipping Fee</span>
                  <span>{shippingFee === 0 ? <span className="text-[#EAD196]">FREE</span> : `PKR ${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#EAD196] border-t border-[#EAD196]/20 pt-3">
                  <span>Total Amount</span>
                  <span>PKR {totalAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                form="checkout-form"
                disabled={loading}
                className="w-full bg-[#BF3131] hover:bg-[#7D0A0A] disabled:opacity-50 text-white py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider shadow-xl transition flex items-center justify-center space-x-2 border border-[#BF3131]/30"
              >
                <FiLock className="h-4 w-4" />
                <span>{loading ? "Placing Order..." : "Confirm & Place Order"}</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;