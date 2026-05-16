import { FaHome, FaChartBar, FaUsers } from "react-icons/fa";

function Sidebar() {
  return (
    <div className="sidebar">

      <h2 className="logo">Sales App</h2>

      <ul>
        <li>
          <FaHome />
          <span>Dashboard</span>
        </li>

        <li>
          <FaChartBar />
          <span>Sales</span>
        </li>

        <li>
          <FaUsers />
          <span>Customers</span>
        </li>
      </ul>

    </div>
  );
}

export default Sidebar;