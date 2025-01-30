import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import axios from "axios";
import styles from "./Header.module.css";
import basket from "../../assets/icons/Basket.svg";
import { useClickOutside } from "../../hooks/useClickOutside";

const CART_API_URL = "https://70fd489b13cfbfb8.mokky.dev/cart";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const menuRef = useRef(null);

  useClickOutside(menuRef, () => isMenuOpen && setTimeout(() => setIsMenuOpen(false), 50));

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const { data } = await axios.get(CART_API_URL);
        setCartCount(data.length);
      } catch (error) {
        console.error("Ошибка загрузки корзины:", error);
      }
    };
    fetchCartItems();
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/">SneakMax</Link>
        </div>
        <div className={styles.navCart}>
          <button className={styles.menuButton} onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</button>
          <nav className={`${styles.nav} ${isMenuOpen ? styles.navActive : ""}`} ref={menuRef}>
            {["catalog", "about", "picker", "team", "delivery", "contacts"].map((section) => (
              <ScrollLink key={section} to={section} smooth={true} duration={500} offset={-50}>
                {section === "catalog" ? "Каталог" :
                 section === "about" ? "О нас" :
                 section === "picker" ? "Подбор товара" :
                 section === "team" ? "Наша команда" :
                 section === "delivery" ? "Доставка и оплата" :
                 "Контакты"}
              </ScrollLink>
            ))}
          </nav>
          <Link to="/cart" className={styles.cart}>
            Корзина
            <img src={basket} alt="Cart" className={styles.cartIcon} />
            {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
