import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import Input from "../components/Input";
import { validateRegistration } from "../util/validation";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateRegistration({ formData, setError })) {
      setIsLoading(true);
      try {
        const res = await axiosConfig.post(API_ENDPOINTS.REGISTER, formData);

        if (res.status === 201) {
          toast.success("Profile Created Successfully");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error creating profile:", error);
        toast.error("An error occurred while creating your profile.");
        setError(error.message);
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
            Create an Account
          </h3>
          <p className="text-xm text-slate-700 text-center mb-8">
            Start tracking your spendings by joining with us.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex justify-center mb-6">
              <img src={assets.logo} alt="logo" className="w-24 h-24" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                type="text"
                placeholder="John Doe"
              />
              <Input
                label="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                type="email"
                placeholder="john.doe@example.com"
              />
              <div className="col-span-2">
                <Input
                  label="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  type="password"
                  placeholder="********"
                />
              </div>
            </div>
            {error && (
              <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                {error}
              </p>
            )}

            <button disabled={isLoading} className={`btn-primary flex justify-center items-center gap-2 ${isLoading && "opacity-50 cursor-not-allowed"}`} type="submit">
              {
                isLoading ? (
                  <>
                    <LoaderCircle className="animate-spin w-5 h-5" />
                    <span>Signing Up...</span>
                  </>
                ) : (
                  "Sign Up"
                )
              }
            </button>
            <p className="text-sm text-slate-800 text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-primary hover:underline hover:text-primary-dark transition-colors"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
