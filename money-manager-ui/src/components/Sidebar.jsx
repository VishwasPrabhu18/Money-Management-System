import { useAuth } from "../context/AppContext";
import { LogOut, User } from "lucide-react";
import { SidebarData } from "../constants/constants";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const pathname = window.location.pathname;

  return (
    <div className="w-64 h-[calc(100vh-74px)] bg-white border-gray-200/50 p-5 sticky top-[75px] z-20 shadow-lg">
      <div className="flex flex-col items-center justify-center gap-3 mb-5">
        {user?.profileImageUrl ? (
          <img
            src={user?.profileImageUrl}
            alt="Profile Image"
            className="w-20 h-20 bg-slate-400 rounded-full"
          />
        ) : (
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-xl text-purple-500" />
          </div>
        )}
        <h5 className="text-gray-950 font-medium leading-5">
          {user?.fullName}
        </h5>
      </div>

      <div className="flex flex-col gap-3">
        <div>
          {SidebarData.map((item) => (
            <button
              onClick={() => navigate(item.path)}
              key={`menu_${item.id}`}
              className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 cursor-pointer transition-colors duration-300 ${pathname == item.path ? "bg-purple-500 text-white" : "hover:bg-purple-200 text-purple-900 hover:text-purple-950"}`}
            >
              <item.icon className="text-xl" />
              <span className="font-medium text-[15px]">{item.label}</span>
            </button>
          ))}
        </div>
        <div>
          <button
            onClick={() => logout()}
            className="w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg cursor-pointer bg-red-100 hover:bg-red-200 transition-colors duration-300 text-red-900 hover:text-red-950"
          >
            <LogOut />
            <span className="font-medium text-[15px]">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
