import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import Home from "./components/Sample/Home/Home";
import { useState } from "react";
import HomePage from "./components/HomePage/HomePage";
import AdminLogin from "./AdminPages/AdminLogin";
import AdminDashboard from "./AdminPages/AdminDashboard";
import CategoryPage from "./components/CategoryPage/CategoryPage";
import EmployeeDashboard from "./AdminPages/EmployeeDashboard";
import RequireAuth from "./components/RequireAuth";
import Dashboard from "./AdminPages/Dashboard";
import Pricing from "./components/Pricing/Pricing";
import Privacy from "./components/PolicyPages/Privacy";
import Terms from "./components/PolicyPages/Terms";
import Refund from "./components/PolicyPages/Refund";
import { ThemeProvider } from "./context/ThemeProvider";
import AboutPage from "./components/About/AboutPage";
import PaymentPage from "./components/Pricing/PaymentPage";
import Faqs from "./components/About/Faqs";
import SearchPage from "./components/SearchPage/SearchPage";
import CustomerDashboard from "./components/Customer/CustomerDashboard";
import Subscribe from "./components/Subscribe";
import ShipmentDelivery from "./components/PolicyPages/ShipmentDelivery";
import ContactUs from "./components/ContactUs";
import OneTimePaymentPage from "./components/Pricing/OneTimePaymentPage";
import Chatbot from "./components/Chatbot";
//
import AdminCreate from "./AdminCreate";
//

function App() {
  // commit5

  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />

          <Route path="admin" element={<AdminLogin />} />

          <Route element={<RequireAuth />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="payment" element={<PaymentPage />} />
            <Route
              path="onetimepurchase/:id"
              element={<OneTimePaymentPage />}
            />
            ß
          </Route>

          {/* <Route path="user/:id" element={<CustomerDashboard />} /> */}

          <Route path="search" element={<SearchPage />} />

          <Route path="category/:id" element={<CategoryPage />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="subscribe" element={<Subscribe />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="faqs" element={<Faqs />} />
          <Route path="contactus" element={<ContactUs />} />

          <Route path="privacypolicy" element={<Privacy />} />
          <Route path="termsandconditions" element={<Terms />} />
          <Route path="refundpolicy" element={<Refund />} />
          <Route path="shipmentanddelivery" element={<ShipmentDelivery />} />
          <Route path="admincreate" element={<AdminCreate />} />
          <Route path="chatbot" element={<Chatbot />} />

        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
