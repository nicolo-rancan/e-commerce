import Image from "next/image";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
const Footer = () => {
  return (
    <footer>
      <div className="wrapper">
        <div className="social">
          <Image src="/next.svg" width={214} height={15} alt="" />
          <p>
            Li Europan lingues es membres del sam familie. Lor separat existentie es un myth.
            Por scientie, musica, sport etc, litot Europa usa li sam vocabular.
          </p>
          <div className="links">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>

            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
        <div className="information">
          <h2>Informazioni</h2>
        </div>
        <div className="privacy">
          <h2>Termini & Condizioni</h2>
        </div>
        <div className="feedback">
          <h2>FeedBack</h2>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
