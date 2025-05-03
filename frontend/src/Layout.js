import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import useAuth from "./hooks/useAuth";
// import LoadingSpinner from "./components/LoadingSpinner"; // Create this component

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  

  axios.defaults.withCredentials = true;

  useEffect(() => {
    let isMounted = true;

    const checkauthentication = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/refresh`,
          { withCredentials: true }
        );
        
        const token = response.data.accessToken;
        const decodedToken = jwtDecode(token);
        
        if (isMounted) {
          setAuth({
            ...decodedToken,
            RawToken: token
          });
        }
      } catch (e) {
        console.log("Auth check failed:", e);
        if (isMounted) {
          // navigate('/');this line
        }
      } finally {
        if (isMounted) {
          setAuthChecked(true);
        }
      }
    };

    if (!auth?.role) {
      console.log('here')
      checkauthentication();
    } else {
      setAuthChecked(true);
    }

    return () => {
      isMounted = false;
    };
  }, [auth?.role, navigate, setAuth]);

  if (!authChecked) {
    return <LoadingSpinner />;
  }

  return (
    <div className="App">
      {!location.pathname.startsWith("/admin") && <Nav />}
      <Outlet />
      {!location.pathname.startsWith("/admin") &&
        !location.pathname.startsWith("/dashboard") && <Footer />}
    </div>
  );
};

export default Layout;




