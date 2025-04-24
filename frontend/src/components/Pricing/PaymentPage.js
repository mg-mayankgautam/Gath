import React, { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeProvider";

const PaymentPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { darkMode } = useTheme();
  const [plan, setPlan] = useState("monthly");

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    country: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    gstin: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    company: "",
    country: "",
    address1: "",
    city: "",
    state: "",
    zip: "",
    gstin: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when user types
  };

  const handleSubmit = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.company.trim()) newErrors.company = "Company is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.address1.trim())
      newErrors.address1 = "Address Line 1 is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zip.trim()) newErrors.zip = "Zip Code is required";
    if (!formData.gstin.trim()) newErrors.gstin = "GSTIN is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // navigate("/dashboard");
    }
  };

  return (
    <div className={darkMode ? "" : "bg-white"}>
      <div className="bigscreen p-10 grid grid-cols-2 !gap-10 justify-center">
        <div className="flex flex-col gap-4">
          <div className="font-bold text-3xl mb-6">Checkout</div>
          {[
            "company",
            "country",
            "address1",
            "address2",
            "city",
            "state",
            "zip",
            "gstin",
          ].map((field) => (
            <div className="relative mb-4" key={field}>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field
                  .replace("address1", "Address Line 1")
                  .replace("address2", "Address Line 2 (Optional)")
                  .replace("zip", "Zip Code")
                  .replace("gstin", "GSTIN")
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

            <div className="font-semibold">Billing Cycle</div>

            {/* Monthly Option */}
            <label className="flex justify-between items-center rounded cursor-pointer text-sm">
              <div className="flex items-center gap-2  font-semibold">
                <input
                  type="radio"
                  name="plan"
                  value="monthly"
                  checked={plan === "monthly"}
                  onChange={(e) => setPlan(e.target.value)}
                  className="accent-[var(--primary)]"
                />
                <span>Monthly</span>
              </div>
              <div>
                <span className="font-bold">₹29.00 </span>
                <span className="text-xs"> /month </span>
              </div>
            </label>

            {/* Yearly Option */}
            <label className="flex justify-between items-center cursor-pointer text-sm">
              <div className="flex items-center gap-2  font-semibold">
                <input
                  type="radio"
                  name="plan"
                  value="yearly"
                  checked={plan === "yearly"}
                  onChange={(e) => setPlan(e.target.value)}
                  className="accent-[var(--primary)]"
                />
                <span>Yearly</span>
              </div>
              <div>
                <span className="font-bold">₹14.50 </span>
                <span className="text-xs"> /month </span>
              </div>
            </label>

            <div className="font-semibold mt-4">
              Individual Yearly Subscription
            </div>

            {/* Monthly Option */}
            <div className="flex justify-between items-center text-sm">
              <div className="font-semibold">Price</div>
              <div>
                <span className="font-bold">₹198.00 </span>
                <span className="text-xs"> /year </span>
              </div>
            </div>

            {/* Yearly Option */}
            <div className="flex justify-between items-center text-sm">
              <div className="font-semibold">Tax</div>
              <div>
                <span className="font-bold">₹35.64 </span>
                <span className="text-xs"> /year </span>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm mt-4">
              <div className="font-semibold">Total</div>
              <div>
                <span className="font-bold">₹233.64 </span>
                <span className="text-xs"> /year </span>
              </div>
            </div>

            <button
              className="greenButton mt-6 mx-auto"
              onClick={() => handleSubmit()}
            >
              Complete Payment
            </button>
          </div>

          <div className="flex items-center gap-2 mt-8 mx-auto">
            <input
              type="checkbox"
              id="agree"
              className="form-checkbox text-[var(--primary)] focus:ring-[var(--primary)]"
            />
            <label htmlFor="agree" className="text-sm">
              By subscribing to Shotkut, you confirm you are 18 or over, and
              that you agree to our{" "}
              <a
                href="/privacypolicy"
                className="text-[var(--primary)] underline hover:opacity-80"
              >
                Privacy Policy
              </a>
              {" "}
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
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
