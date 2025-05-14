import React, { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeProvider";
import { useLocation } from "react-router-dom";
import SignIn from "../SignIn/SignIn";

const PaymentPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchSavedAddress();
  }, []);

  const [showSignInModal, setShowSignInModal] = useState(false);

  const [plan, setPlan] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Extract query parameters from the URL
    const searchParams = new URLSearchParams(location.search);
    const planType = searchParams.get("plan"); // 'year' in this case

    if (planType) {
      setPlan(planType); // Set the plan in state
    } else {
      console.warn("No 'plan' parameter found in the URL");
    }
  }, [location.search]); // Re-run if URL changes

  console.log(plan);
  const { darkMode } = useTheme();
  // const [plan, setPlan] = useState("monthly");
  const [savedAddress, setSavedAddress] = useState(null);
  const [loadingAddress, setLoadingAddress] = useState(true);
  const [saveDetails, setSaveDetails] = useState(false);
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  const [policyError, setPolicyError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    gst: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    // lastName: "",
    email: "",
    password: "",
    address1: "",
    // address2: "",
    city: "",
    state: "",
    zip: "",
    // gst: "",
  });

  // Simulate fetching saved address from backend
  const fetchSavedAddress = async () => {
    setLoadingAddress(true);
    try {
      // Replace this with your actual API call to fetch saved address
      const response = await fetch("/api/user/billing/address"); // Example API endpoint
      if (response.ok) {
        const data = await response.json();
        setSavedAddress(data);
        setFormData(data); // Populate form with saved address
      } else {
        setSavedAddress(null);
      }
    } catch (error) {
      console.error("Error fetching saved address:", error);
      setSavedAddress(null);
    } finally {
      setLoadingAddress(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when user types
  };

  const handleUseSavedAddress = () => {
    if (savedAddress) {
      setFormData(savedAddress);
    }
  };

  const handleSubmit = () => {
    let newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";

    if (!formData.address1.trim())
      newErrors.address1 = "Address Line 1 is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zip.trim()) newErrors.zip = "Zip Code is required";

    setErrors(newErrors);
    if (!agreedToPolicy) {
      setPolicyError(
        "Please agree to the Privacy Policy and Terms & Conditions before proceeding."
      );
      return; // Prevent further submission
    } else {
      setPolicyError(""); // Clear the error if they have agreed
    }

    if (Object.keys(newErrors).length === 0 && agreedToPolicy) {
      // Proceed with payment and potentially save details to backend
      console.log("Form submitted:", formData, "Save Details:", saveDetails);
      if (saveDetails) {
        // Make API call to save billing details to backend
        console.log("Saving billing details to backend:", formData);
        // Example API call:
        // fetch("/api/user/billing/address", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(formData),
        // });
      }
      // navigate("/dashboard");
    }
  };

  const monthlyPrice = 999;
  const yearlyPrice = 9999;
  const selectedPrice = plan === "month" ? monthlyPrice : yearlyPrice;
  const tax = selectedPrice * 0.18; // 18% GST
  const total = selectedPrice + tax;

  return (
    <div className={darkMode ? "" : "bg-white"}>
      <div className="bigscreen p-10 grid grid-cols-2 !gap-10 justify-center">
        <div className="flex flex-col gap-4">
          <div className="font-bold text-3xl mb-6">Checkout</div>

          {/* <div className="grid grid-cols-2 gap-2"> */}
          {["firstName", "lastName", "email", "password"].map((field) => (
            <div className="relative mb-4" key={field}>
              <input
                type={field == "password" ? "password" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field
                  .replace("firstName", "First Name*")
                  .replace("lastName", "Last Name")
                  .replace("email", "Email*")
                  .replace("password", "Password*")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
                className={darkMode ? "input dark w-full" : "input w-full"}
              />
              {errors[field] && (
                <p className="absolute top-9 right-0 text-[var(--primary)] text-xs font-medium mt-1">
                  {errors[field]}
                </p>
              )}
            </div>
          ))}
          {/* </div> */}

          {/* {successMessage && (
            <p className="text-green-500 text-center mt-2">
              {successMessage}
            </p>
          )} */}

          {/* <p className="text-sm text-center mt-4">
              An account will be created on checkout.
            </p>

            <p className="text-sm text-center mt-2">
              Already have an account?{" "}
              <button
                className="text-[var(--primary)] font-medium hover:underline"
                onClick={() => setShowSignInModal(true)}
                >
                Sign in
              </button>
            </p> */}

          {/* Saved Address Section */}
          {/* <div className="mb-4">
            <div className="font-semibold mb-2">Saved Address</div>
            {loadingAddress ? (
              <div className="text-sm italic">Loading saved address...</div>
            ) : savedAddress ? (
              <div className="border p-4 rounded">
                <p className="text-sm">{savedAddress.address1}</p>
                {savedAddress.address2 && (
                  <p className="text-sm">{savedAddress.address2}</p>
                )}
                <p className="text-sm">
                  {savedAddress.city}, {savedAddress.state} {savedAddress.zip}
                </p>
                <button
                  onClick={handleUseSavedAddress}
                  className="text-[var(--primary)] text-sm underline mt-2"
                >
                  Use this address
                </button>
              </div>
            ) : (
              <div className="text-sm italic">No saved address found.</div>
            )}
          </div> */}

          <div className="font-bold text-xl mt-8 mb-4">Address Details</div>

          {["address1", "address2", "city", "state", "zip", "gst"].map(
            (field) => (
              <div className="relative mb-4" key={field}>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={field
                    .replace("address1", "Address Line 1*")
                    .replace("address2", "Address Line 2 (Optional)")
                    .replace("zip", "Zip Code*")
                    .replace("gst", "GSTIN(For company Billing)")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                  className={darkMode ? "input dark w-full" : "input w-full"}
                />
                {errors[field] && (
                  <p className="absolute top-9 right-0 text-[var(--primary)] text-xs font-medium mt-1">
                    {errors[field]}
                  </p>
                )}
              </div>
            )
          )}

          {/* Save Details Checkbox */}
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="saveDetails"
              className="form-checkbox text-[var(--primary)] focus:ring-[var(--primary)] mr-2"
              checked={saveDetails}
              onChange={(e) => setSaveDetails(e.target.checked)}
            />
            <label htmlFor="saveDetails" className="text-sm">
              Save details for future use
            </label>
          </div>
        </div>

        <div className="">
          <div
            className={`${
              darkMode
                ? "bg-[#1B1D1C] border-[#333333]"
                : "bg-[#F1F1F1] border-[#CBCBCB]"
            } rounded-[4px] flex flex-col gap-4 p-6 w-full border`}
          >
            <div className="font-bold text-3xl">Order Summary</div>

            <div className="font-semibold text-lg mb-4">Billing Cycle</div>

            {/* Monthly Option */}
            <label className="flex justify-between items-center rounded cursor-pointer text-sm mb-3 p-3 ">
              <div className="flex items-center gap-2 font-semibold">
                <input
                  type="radio"
                  name="plan"
                  value="month"
                  checked={plan === "month"}
                  onChange={(e) => setPlan(e.target.value)}
                  className="accent-[var(--primary)]"
                />
                <span>Monthly</span>
              </div>
              <div>
                <span className="font-bold">₹{monthlyPrice.toFixed(2)}</span>
                <span className="text-xs"> /month</span>
              </div>
            </label>

            {/* Yearly Option */}
            <label className="flex justify-between items-center cursor-pointer text-sm mb-6 p-3 ">
              <div className="flex items-center gap-2 font-semibold">
                <input
                  type="radio"
                  name="plan"
                  value="year"
                  checked={plan === "year"}
                  onChange={(e) => setPlan(e.target.value)}
                  className="accent-[var(--primary)]"
                />
                <span>Yearly</span>
              </div>
              <div>
                <span className="font-bold">₹{yearlyPrice.toFixed(2)}</span>
                <span className="text-xs"> /year</span>
              </div>
            </label>

            <div className="font-semibold text-lg mb-4">
              Subscription Summary
            </div>

            <div className="flex justify-between items-center text-sm mb-2">
              <div className="font-semibold">Price</div>
              <div>
                <span className="font-bold">₹{selectedPrice.toFixed(2)}</span>
                <span className="text-xs"> </span>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm mb-2">
              <div className="font-semibold">Tax (18% GST)</div>
              <div>
                <span className="font-bold">₹{tax.toFixed(2)}</span>
                <span className="text-xs"> </span>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm mt-4 pt-3 border-t border-gray-200">
              <div className="font-semibold">Total</div>
              <div>
                <span className="font-bold">₹{total.toFixed(2)}</span>
                <span className="text-xs"> /year</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-8 mx-auto">
              <input
                type="checkbox"
                id="agree"
                className="form-checkbox text-[var(--primary)] focus:ring-[var(--primary)]"
                checked={agreedToPolicy}
                onChange={(e) => {
                  setAgreedToPolicy(e.target.checked);
                  setPolicyError("");
                }}
              />
              <label htmlFor="agree" className="text-sm">
                By subscribing to Shotkut, you confirm you are 18 or over, and
                that you agree to our{" "}
                <a
                  href="/privacypolicy"
                  className="text-[var(--primary)] underline hover:opacity-80"
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="/termsandconditions"
                  className="text-[var(--primary)] underline hover:opacity-80"
                >
                  Terms and Conditions
                </a>
                .
              </label>
            </div>

            {policyError && (
              <p className="text-red-500 text-sm mt-2">{policyError}</p>
            )}

            <button
              className={`greenButton mt-6 mx-auto ${
                !agreedToPolicy ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleSubmit}
              // disabled={!agreedToPolicy}
            >
              Complete Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
