import styles from "./AboutSection.module.css";
import sneakers from "@assets/images/AboutSection/sneakers.png";
import img1 from "@assets/images/AboutSection/about-figure.svg";

function AboutSection() {
  return (
    <section id="about" className={styles.aboutSection}>
      <img src={img1} alt="" className={styles.backgroundImage} loading="lazy" />
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.h2}>Пара слов о нас</h2>
          <p className={styles.p}>
            Спорт держит нас в форме. Учит дисциплине. Объединяет нас. Через
            спорт мы можем менять жизни. В том числе с помощью воодушевляющих
            историй спортсменов. Чтобы помочь тебе подняться и двигаться вперед.
          </p>
          <span className={styles.signature}>SneakMax</span>
        </div>
        <div className={styles.imageWrapper}>
          <img
            src={sneakers}
            alt="Мужчина в кроссовках"
            className={styles.image}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
