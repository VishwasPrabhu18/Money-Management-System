import Menubar from "./Menubar";
import Sidebar from "./Sidebar";
import { useUser } from "../hooks/useUser";

const Dashboard = ({ children }) => {
  useUser();

  return (
    <div>
      <Menubar />

      <div className="flex">
        <div className="max-[1080px]:hidden">
          <Sidebar />
        </div>

        <div className="grow mx-5">{children}</div>
      </div>
    </div>
  );
};

export default Dashboard;
