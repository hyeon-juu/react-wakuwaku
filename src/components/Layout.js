// components/Layout.js
import { Outlet } from "react-router-dom";
import LeftSide from "./LeftSide";
import RightSideTv from "./RightSideTv";
import styles from "../css/Layout.module.css";

function Layout() {
  return (
    <div className={styles.container}>
      <LeftSide />
      <div className={styles.center}>
        <Outlet />
      </div>
      <RightSideTv />
    </div>
  );
}

export default Layout;
