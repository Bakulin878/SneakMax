import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import styles from "./Footer.module.css";

const navLinks = [
  { to: "catalog", text: "Каталог" },
  { to: "about", text: "О нас" },
  { to: "picker", text: "Подбор товара" },
  { to: "team", text: "Наша команда" },
  { to: "delivery", text: "Доставка и оплата" },
  { to: "contacts", text: "Контакты" },
];

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.container}>
      <Link to="/" className={styles.logo}>SneakMax</Link>
      <nav className={styles.nav}>
        {navLinks.map(({ to, text }) => (
          <ScrollLink key={to} to={to} smooth={true} duration={500} offset={-50}>
            {text}
          </ScrollLink>
        ))}
      </nav>
    </div>
  </footer>
);

export default Footer;
