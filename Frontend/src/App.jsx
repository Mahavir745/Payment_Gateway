import React from 'react'
import Paygateway from './PayGateway/Paygateway'
import axios from "axios";

const App = () => {
  let donorData = [];

  const handlePayment = async (information) => {
    const { data } = await axios.post("http://localhost:5000/create-order", {
      amount: information.amountdonate,
    });

    const options = {
      key: "rzp_test_Rf8dintt8rUfec", 
      amount: data.amount,
      currency: data.currency,
      name: "My Donor Payment gateway",
      description: "Test Transaction",
      order_id: data.id,
      handler: function (response) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: information.fullName,
        email: information.email,
        contact: information.mobileNumber,
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div>
      <Paygateway donorData ={donorData} handlePayment={handlePayment}/>
    </div>
  )
}

export default App