import styles from "../css/Nav.module.css";
import { NavLink, useLocation } from "react-router-dom";

function Nav({}) {
  const location = useLocation();
  const isHome = location.pathname === "/" || location.hash === "#/";

  return (
    <div className={styles.container}>
      <NavLink
        to={`/tv`}
        className={({ isActive }) =>
          isActive || isHome ? styles.activeTv : styles.nav
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
