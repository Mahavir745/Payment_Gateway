import React, { useState, useRef } from "react";

const Paygateway = ({ donorData,handlePayment}) => {
  let amount = [100, 200, 500];
  let donationType = ["Give Once", "Give Monthly"];

  const [pan, setPan] = useState("");
  const [error, setError] = useState("");
  const [indexvalue, setIndexValue] = useState(0);
  const [indexvalue2, setIndexValue2] = useState(0);

  const otherAmount = useRef();
  const fullName = useRef();
  const dob = useRef();
  const email = useRef();
  const mobileNumber = useRef();
  const address = useRef();
  const pincode = useRef();
  const city = useRef();
  const state = useRef();
  const country = useRef();
  const PanNumber = useRef();

  const [citizenType, setCitizenType] = useState("Indian Citizen");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const selectedAmount =
      otherAmount.current.value && otherAmount.current.value !== ""
        ? otherAmount.current.value
        : amount[indexvalue2];

    let information = {
      citizenship: citizenType,
      donationMode: donationType[indexvalue],
      amountdonate: selectedAmount,
      fullName: fullName.current.value,
      dob: dob.current.value,
      email: email.current.value,
      mobileNumber: mobileNumber.current.value,
      address: address.current.value,
      pincode: pincode.current.value,
      city: city.current.value,
      state: state.current.value,
      country: country.current.value,
      PanNumber: PanNumber.current.value,
    };

    donorData.push(information);
    handlePayment(information);
    console.log("Captured Donor Data:", donorData);
  };

  const handlePanChange = (e) => {
    const value = e.target.value.toUpperCase();
    setPan(value);

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (value === "") {
      setError("");
    } else if (!panRegex.test(value)) {
      setError("Invalid PAN format. Example: MAHAV1234J");
    } else {
      setError("");
    }
  };

  const currentDonationType = (index) => {
    setIndexValue(index);
  };

  const currentAmount = (index) => {
    setIndexValue2(index);
    otherAmount.current.value = ""; 
  };

  return (
    <div className="bg-gray-50 min-h-screen flex justify-center py-10 px-4">
      <form
        onSubmit={handleFormSubmit}
        className="bg-white shadow-lg rounded-xl w-full max-w-2xl p-6 border border-gray-200"
      >
        {/* Title */}
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Yes! I’d like to help
        </h2>

        {/* Citizenship */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Citizenship<span className="text-red-500">*</span>
          </label>
          <div className="flex gap-6 mb-2">
            <label className="flex items-center gap-2 text-md">
              <input
                type="radio"
                name="citizen"
                value="Indian Citizen"
                checked={citizenType === "Indian Citizen"}
                onChange={() => setCitizenType("Indian Citizen")}
                className="accent-yellow-400 w-5 h-5 outline-0"
              />
              <span>Indian Citizen</span>
            </label>
            <label className="flex items-center gap-2 text-md">
              <input
                type="radio"
                name="citizen"
                value="Foreign Citizen/NRI"
                checked={citizenType === "Foreign Citizen/NRI"}
                onChange={() => setCitizenType("Foreign Citizen/NRI")}
                className="accent-yellow-400 w-5 h-5"
              />
              <span>Foreign Citizen/NRI</span>
            </label>
          </div>
          <p className="text-sm text-gray-600">
            Indian citizen option is for transacting through Indian bank
            accounts or cards issued by Indian banks.
          </p>
        </div>

        {/* Donation type */}
        <div className="mb-6 flex gap-4">
          {donationType.map((dntype, index) => (
            <button
              key={index}
              type="button"
              className={`w-1/2 border font-semibold rounded-md py-2 transition ${
                index !== indexvalue
                  ? "text-yellow-800 border-yellow-400"
                  : "bg-yellow-400 text-white"
              }`}
              onClick={() => currentDonationType(index)}
            >
              {dntype}
            </button>
          ))}
        </div>

        {/* Donation Amount */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-yellow-900 mb-2">
            Choose an amount to donate
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
            {amount.map((amt, index) => (
              <button
                key={amt}
                type="button"
                className={`border font-semibold rounded-md py-2 transition ${
                  index !== indexvalue2
                    ? "text-yellow-800 border-yellow-400"
                    : "bg-yellow-400 text-white"
                }`}
                onClick={() => currentAmount(index)}
              >
                ₹{amt}
              </button>
            ))}
          </div>
          <input
            type="number"
            placeholder="Other Amount"
            ref={otherAmount}
            onFocus={() => setIndexValue2(-1)} // deselect amount buttons if user types other amount
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Donor Info */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-3">
            Special characters not allowed in full name field
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Full Name *"
              ref={fullName}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400 outline-0"
            />
            <input
              type="date"
              ref={dob}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400 outline-0"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <input
              type="email"
              placeholder="Email *"
              ref={email}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400 outline-0"
            />
            <input
              type="number"
              placeholder="Mobile Number *"
              ref={mobileNumber}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400 outline-0"
            />
          </div>

          <textarea
            placeholder="Address *"
            rows="2"
            ref={address}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-4 focus:ring-2 focus:ring-yellow-400 outline-0"
          ></textarea>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <input
              type="number"
              placeholder="Pincode *"
              ref={pincode}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400 outline-0"
            />
            <input
              type="text"
              placeholder="City"
              ref={city}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400 outline-0"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="State"
              ref={state}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400 outline-0"
            />
            <input
              type="text"
              placeholder="Country (India)"
              ref={country}
              value="India"
              disabled
              className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100 outline-0"
            />
          </div>

          <input
            type="text"
            placeholder="PAN Number"
            value={pan}
            onChange={handlePanChange}
            ref={PanNumber}
            className={`w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-2 focus:ring-2 outline-0 ${
              error ? "focus:ring-red-400" : "focus:ring-yellow-400"
            }`}
          />
          {error && (
            <p className="text-red-500 text-[12px] mt-1 mb-8 font-extrabold">
              {error}
            </p>
          )}

          <p className="text-red-400 text-xs font-semibold mb-3">
            Please note that if you do not provide your PAN Number, you will not
            be able to claim 50% tax exemption u/s 80G in India.
          </p>

          <p className="text-xs text-gray-500 mb-2">
            Information is being collected to comply with government regulations
            and shall be treated as confidential. ... Read More
          </p>

          <label className="text-sm text-gray-600 flex items-start gap-2">
            <input type="checkbox" className="mt-1 accent-yellow-400" /> I
            hereby declare that I am a citizen of India, making this donation
            out of my own funds. ... Read More
          </label>
        </div>

        {/* Payment Section */}
        <div className="text-center mb-6">
          <div className="flex justify-center gap-3 mb-2">
            <img
              src="https://play-lh.googleusercontent.com/2BQu8Y7Ah9Gh9CZvmaMSYIcZvdO4KfdJ26EZ1WGyaOG_xxeDxNn-AZYxOtQJvyQQPFY"
              alt="Rozarpay"
              className="h-5"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
              alt="Visa"
              className="h-5"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg"
              alt="Mastercard"
              className="h-5"
            />
            <img
              src="https://images.icon-icons.com/2699/PNG/512/upi_logo_icon_170312.png"
              alt="UPI"
              className="h-5"
            />
          </div>
          <p className="text-sm text-gray-600">
            We accept all major payment methods
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-yellow-400 text-white font-semibold py-3 rounded-md hover:bg-yellow-500 transition"
        >
          Continue To Payment
        </button>
      </form>
    </div>
  );
};

export default Paygateway;
