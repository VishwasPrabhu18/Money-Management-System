import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import Input from "../components/Input";
import { validateLogin } from "../util/validation";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import { useAuth } from "../context/AppContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();    

    if(validateLogin({ formData, setError })) {
      setIsLoading(true);
      
      try {
        const res = await axiosConfig.post(API_ENDPOINTS.LOGIN, formData);        

        if (res.status === 200) {
          const { token, user } = res.data;
          if (token) {
            localStorage.setItem("accessToken", token);
            setUser(user);
            navigate("/dashboard");
          }
        }
      } catch (error) {
        if (error.response && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          console.error("Error logging in:", error);
          toast.error("An error occurred while logging in.");
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
      <img
        src={assets.login_bg}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover blur-sm"
      />

      <div className="relative z-10 w-full max-w-lg px-6">
        <div className="bg-white opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 overflow-y-auto">
          <h3 className="text-2xl font-semibold text-black text-center mb-2">
            Welcome Back
          </h3>
          <p className="text-xm text-slate-700 text-center mb-8">
            Please enter your details to login.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center gap-4">
              <Input
                label="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                type="email"
                placeholder="john.doe@example.com"
              />

              <Input
                label="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                type="password"
                placeholder="********"
              />
              {error && (
                <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                  {error}
                </p>
              )}
            </div>

            <button disabled={isLoading} className={`btn-primary flex justify-center items-center gap-2 ${isLoading && "opacity-50 cursor-not-allowed"}`} type="submit">
              {
                isLoading ? (
                  <>
                    <LoaderCircle className="animate-spin w-5 h-5" />
                    <span>Logging In...</span>
                  </>
                ) : (
                  "Log In"
                )
              }
            </button>
            <p className="text-sm text-slate-800 text-center mt-3">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-primary hover:underline hover:text-primary-dark transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
