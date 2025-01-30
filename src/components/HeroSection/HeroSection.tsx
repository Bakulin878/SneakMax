import styles from "./HeroSection.module.css";
import Button from "../Button/Button";
import { Link as ScrollLink } from "react-scroll";

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Кроссовки известных брендов с доставкой по России и СНГ
        </h1>
        <p className={styles.p}>
          Мы продаем кроссовки брендов Nike, Adidas, Puma, Reebok, Converse и
          многие другие по низким ценам.
        </p>
        <ScrollLink to="catalog" smooth duration={500} offset={-50}>
          <Button text="Перейти к покупкам" />
        </ScrollLink>
      </div>
    </section>
  );
}

export default HeroSection;
