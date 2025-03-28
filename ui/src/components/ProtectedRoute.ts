import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const isTokenExpired = (token:string) => {
    try {
        const decodedPayload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
        console.log(decodedPayload)
        console.log(decodedPayload)
        const expirationTime = decodedPayload.exp * 1000; // Convert to milliseconds
        return Date.now() > expirationTime; // Check if expired
    } catch (error) {
        return true; // If decoding fails, treat it as expired
    }
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const authToken = localStorage.getItem("blogger-api-auth-token");
  
    useEffect(() => {
      if (!authToken || isTokenExpired(authToken)) {
        localStorage.removeItem("blogger-api-auth-token"); 
        navigate("/auth/login", { replace: true });
      }
    }, [authToken, navigate]); // Run only when authToken or navigate changes
  
    if (!authToken || isTokenExpired(authToken)) {
      return null; // Return nothing while redirecting
    }
  
    return children; 
  };
  
  export default ProtectedRoute;