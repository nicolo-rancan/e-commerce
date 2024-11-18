import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer>
      <div className="wrapper">
        <div className="left">
          <h2>ZANARRA</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error saepe sed molestias voluptates quia, cupiditate vel ipsam magnam, reiciendis quae</p>
          <ul>
            <li>
              <FaInstagram />
            </li>
            <li>
              <FaFacebook />
            </li>
            <li>
              <FaTwitter />
            </li>
          </ul>
        </div>
        <div className="right">
          <div className="column">
            <ul>
              <li>
                <p>Registrati</p>
              </li>
              <li>
                <p>Accedi</p>
              </li>
              <li>
                <p></p>
              </li>
              <li>
                <p></p>
              </li>
            </ul>
          </div>
          <div className="column">
            <ul>
              <li>
                <p>Termini di Utilizzo</p>
              </li>
              <li>
                <p>Privacy Policy</p>
              </li>
              <li>
                <p>Rimborsi</p>
              </li>
              <li>
                <p></p>
              </li>
            </ul>
          </div>
          <div className="column">
            <ul>
              <li>
                <p></p>
              </li>
              <li>
                <p></p>
              </li>
              <li>
                <p></p>
              </li>
              <li>
                <p></p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
