import styles from "../css/Nav.module.css";
import { NavLink } from "react-router-dom";

function Nav({}) {
  return (
    <div className={styles.container}>
      <NavLink
        to={`/tv`}
        className={({ isActive }) =>
          isActive || window.location.pathname === "/"
            ? styles.activeTv
            : styles.nav
        }
      >
        Tv Series
      </NavLink>

      <NavLink
        to={`/movie`}
        className={({ isActive }) =>
          isActive ? styles.activeMovie : styles.nav
        }
      >
        Movies
      </NavLink>
    </div>
  );
}
export default Nav;
