import styles from "../css/Nav.module.css";
import { Link } from "react-router-dom";

function Nav({}) {
  return (
    <div className={styles.container}>
      <Link to={`/`}>
        <div>Tv Series</div>
      </Link>

      <Link to={`/movie`}>
        <div>Movies</div>
      </Link>
    </div>
  );
}
export default Nav;
