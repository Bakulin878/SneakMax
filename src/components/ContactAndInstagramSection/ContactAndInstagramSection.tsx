import styles from "./ContactAndInstagramSection.module.css";
import { useState } from "react";
import img1 from "@assets/images/ContactAndInstagramSection/Rectangle 37.jpeg";
import img2 from "@assets/images/ContactAndInstagramSection/Rectangle 39.jpeg";
import img3 from "@assets/images/ContactAndInstagramSection/Rectangle_central.jpeg";
import img4 from "@assets/images/ContactAndInstagramSection/Rectangle 40.jpeg";
import img5 from "@assets/images/ContactAndInstagramSection/Rectangle 41.jpeg";
import instagram from "@assets/images/ContactAndInstagramSection/1024px-Instagram_logo 1.png";

function ContactAndInstagramSection() {
  const [formData, setFormData] = useState({ name: "", phone: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log("Отправлено:", formData);
    setFormData({ name: "", phone: "" });
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Блок с формой */}
        <div className={styles.contactForm}>
          <h2 className={styles.formTitle}>Есть вопросы?</h2>
          <p className={styles.formDescription}>
            Заполните форму, и наш <br /> менеджер свяжется с вами.
          </p>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              className={styles.input}
              placeholder="Ваше имя"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              className={styles.input}
              placeholder="Номер телефона"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <button type="submit" className={styles.submitButton}>
              Отправить
            </button>
          </form>
        </div>

        {/* Блок Instagram */}
        <div className={styles.instagramFeed}>
          <img className={styles.instagramTitle} src={instagram} alt="" />
          {/* <h2 className={styles.instagramTitle}>Instagram</h2> */}
          <div className={styles.images}>
            <div className={styles.block_img1}>
              <img src={img1} alt="Image 1" className={styles.image} />
              <img src={img2} alt="Image 2" className={styles.image} />
            </div>
            <div>
              <img src={img3} alt="Image 3" className={styles.image_center} />
            </div>
            <div className={styles.block_img2}>
              <img src={img4} alt="Image 4" className={styles.image} />
              <img src={img5} alt="Image 5" className={styles.image} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactAndInstagramSection;
