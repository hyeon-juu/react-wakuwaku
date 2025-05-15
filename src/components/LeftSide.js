import PropTypes from "prop-types";
import styles from "../css/LeftSide.module.css";

function LeftSide() {
  return (
    <div className={styles.container}>
      <h1>WAKU WAKU !</h1>
      <div>
        <h2>MENU</h2>
        <ul>
          <li>
            <i class="fa-solid fa-house"></i>Home
          </li>
          <li>
            <i class="fa-regular fa-paper-plane"></i>Community
          </li>
          <li>
            <i class="fa-regular fa-rectangle-list"></i>Discovery
          </li>
          <li>
            <i class="fa-regular fa-clock"></i>Coming soon
          </li>
        </ul>
      </div>
      <div>
        <h2>SOCIAL</h2>
        <ul>
          <li>
            <i class="fa-regular fa-user"></i>Friends
          </li>
          <li>
            <i class="fa-regular fa-comments"></i>Parties
          </li>
          <li>
            <i class="fa-solid fa-tv"></i>Media
          </li>
        </ul>
      </div>
      <div>
        <h2>GENERAL</h2>
        <ul>
          <li>
            <i class="fa-solid fa-gear"></i>Setting
          </li>
          <li>
            <i class="fa-solid fa-arrow-right-from-bracket"></i>Log Out
          </li>
        </ul>
      </div>
    </div>
  );
}

export default LeftSide;
