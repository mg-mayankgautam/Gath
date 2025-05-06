import React, { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeProvider";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "sonner";

const OneTimePaymentPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchSavedAddress();
  }, []);

  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const videoType = searchParams.get("type");
  //   console.log(id, videoType);

  const { darkMode } = useTheme();
  const [plan, setPlan] = useState("");
  const [savedAddress, setSavedAddress] = useState(null);
  const [loadingAddress, setLoadingAddress] = useState(true);
  const [saveDetails, setSaveDetails] = useState(false);
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  const [policyError, setPolicyError] = useState("");

  const [gst, setGst] = useState("");
  const [total, setTotal] = useState("");

  const [video, setVideo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/videos/getonevideo?id=${id}`
        );
        if (response) {
          setVideo(response.data);
        }
      } catch (err) {
        setError("Failed to fetch video");
        console.error(err);
      }
    };

    if (id) {
      fetchVideo();
    }
  }, [id]);

  useEffect(() => {
    console.log("plan changed", plan);
    let calculatedGst = 0;
    let totalamt = 0;

    const gstRate = 0.18; // Assuming an 18% GST rate (you can adjust this)

    if (plan == "4K") {
      // Check if plan is '4k' (string) or 4 (number)
      calculatedGst = 129 * gstRate;
      totalamt = 129 + calculatedGst;
    } else {
      // Calculate for other plans if 'plan' has a value
      calculatedGst = 79 * gstRate;
      totalamt = 79 + calculatedGst;
    }
    console.log(calculatedGst);

    setGst(calculatedGst.toFixed(2));
    setTotal(totalamt.toFixed(2));
  }, [plan]); // Only re-run the effect when the 'plan' state changes

  const [formData, setFormData] = useState({
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    gst:"",
  });

  const [errors, setErrors] = useState({
    address1: "",
    city: "",
    state: "",
    zip: "",
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

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    if (
      formData.firstName === "" ||
      formData.lastName === "" ||
      formData.email === "" ||
      formData.phone === "" ||
      formData.country === "" ||
      formData.address === "" ||
      formData.city === "" ||
      formData.state === ""
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    // if (cartItems.length == 0 || totalPrice == "") {
    //   toast.error("No Items in your cart");
    //   return;
    // }

    if (
      errors.firstName != "" ||
      errors.lastName != "" ||
      errors.email != "" ||
      errors.phone != "" ||
      errors.country != "" ||
      errors.address != "" ||
      errors.city != "" ||
      errors.state != ""
    ) {
      toast.error("Please check your details");
      return;
    }

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      toast.error("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      const amount = total;
      const firstName = formData.firstName;
      const lastName = formData.lastName;
      const email = formData.email;
      const phone = formData.phone;
      const country = formData.country;
      const address = formData.address;
      const city = formData.city;
      const state = formData.state;

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/pay/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount,
            currency: "INR",
            receipt: "receipt#1",
            notes: {},
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (!data || !data.id) {
        toast.error("Failed to create Razorpay order");
        return;
      }

      const options = {
        key: process.env.REACT_APP_RAZORPAY,
        amount: data.amount, // Amount in smallest currency unit
        currency: data.currency,
        name: "Moheera Jewels",
        description: "Test Transaction",
        image: "./watermark.png",
        order_id: data.id, // Use orderId from backend
        // callback_url: `/verify-payment`, // Optional, can handle manually
        handler: function (response) {
          fetch(`${process.env.REACT_APP_BACKEND_URL}/pay/verify-payment`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              firstName,
              lastName,
              email,
              phone,
              country,
              address,
              city,
              state,
            //   totalPrice,
            //   cartItems,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.status === "ok") {
                toast.success("Payment successful!");
                window.location.href = "/";
                // Redirect to success page
              } else {
                toast.error("Payment verification failed");
              }
            })
            .catch((error) => {
              console.error("Error:", error);
              toast.error("Error verifying payment");
            });
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#CB919A",
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error in Razorpay integration:", error);
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <div className={darkMode ? "" : "bg-white"}>
      <div className="bigscreen p-10 grid grid-cols-2 !gap-10 justify-center">
        <div className="flex flex-col gap-4">
          <div className="font-bold text-3xl mb-6">Checkout</div>

          {/* Saved Address Section */}
          <div className="mb-4">
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
          </div>

          {["address1", "address2", "city", "state", "zip", "gst"].map((field) => (
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
                  .replace("gst", "GSTIN")
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

            <div className="font-semibold">Video Selected:</div>

            <div
              key={video?._id}
              className={`grid grid-cols-[200px_1fr] border ${
                darkMode
                  ? "bg-[#1B1D1C] border-[#333333]"
                  : "bg-[#F1F1F1] border-[#CBCBCB]"
              }`}
            >
              <div className="w-full h-full max-w-full aspect-video overflow-hidden">
                <video
                  src={video?.previewURL}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  preload="metadata"
                  controls
                />
              </div>
              <div className="p-4 flex flex-col">
                <h3 className="font-semibold mb-1 break-all max-h-[24px] overflow-hidden">
                  {video?.name}
                </h3>
                <div className="text-xs text-[var(--grey)]">
                  Duration: {video?.duration}s • Size:{" "}
                  {parseFloat(video?.fileSizeInMB).toFixed(1)} MB
                </div>
              </div>
            </div>

            <div className="font-semibold mt-4">Choose Video Quality</div>

            {/* Monthly Option */}
            <label className="flex justify-between items-center rounded cursor-pointer text-sm">
              <div className="flex items-center gap-2  font-semibold">
                <input
                  type="radio"
                  name="plan"
                  value="4K"
                  checked={plan === "4K"}
                  onChange={(e) => setPlan(e.target.value)}
                  className="accent-[var(--primary)]"
                />
                <span>4K</span>
              </div>
              <div>
                <span className="font-bold">₹119.00 </span>
              </div>
            </label>

            {/* Yearly Option */}
            <label className="flex justify-between items-center cursor-pointer text-sm">
              <div className="flex items-center gap-2  font-semibold">
                <input
                  type="radio"
                  name="plan"
                  value="HD"
                  checked={plan === "HD"}
                  onChange={(e) => setPlan(e.target.value)}
                  className="accent-[var(--primary)]"
                />
                <span>HD</span>
              </div>
              <div>
                <span className="font-bold">₹79 </span>
              </div>
            </label>

            <div
              className={`${
                darkMode ? "bg-[#333333]" : "bg-[#CBCBCB]"
              } w-[100%] mx-auto my-4 h-[1px]`}
            ></div>

            <div className="font-semibold">Bill Summary</div>

            {/* Monthly Option */}
            <div className="flex justify-between items-center text-sm">
              <div className="font-semibold">Price</div>
              <div>
                <span className="font-bold">
                  ₹{plan == "4K" ? <>129</> : <>79</>}
                </span>
                {/* <span className="text-xs">  </span> */}
              </div>
            </div>

            {/* Yearly Option */}
            <div className="flex justify-between items-center text-sm">
              <div className="font-semibold">Tax</div>
              <div>
                <span className="font-bold">₹ {gst}</span>
                {/* <span className="text-xs"> /year </span> */}
              </div>
            </div>

            <div className="flex justify-between items-center text-sm mt-4">
              <div className="font-semibold">Amount to be paid</div>
              <div>
                <span className="font-bold">₹ {total} </span>
                <span className="text-xs"> </span>
              </div>
            </div>

            {policyError && (
              <p className="text-red-500 text-sm mt-2">{policyError}</p>
            )}

            <button
              className={`greenButton mt-6 mx-auto ${
                !agreedToPolicy ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => handleSubmit()}
              disabled={!agreedToPolicy}
            >
              Complete Payment
            </button>
          </div>

          <div className="flex items-center gap-2 mt-8 mx-auto">
            <input
              type="checkbox"
              id="agree"
              className="form-checkbox text-[var(--primary)] focus:ring-[var(--primary)]"
              checked={agreedToPolicy}
              onChange={(e) => {
                setAgreedToPolicy(e.target.checked);
                setPolicyError(""); // Clear error when user agrees
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
        </div>
      </div>
      <Toaster position="top-center" richColors />
    </div>
  );
};

export default OneTimePaymentPage;
