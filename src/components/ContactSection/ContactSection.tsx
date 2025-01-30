import styles from "./ContactSection.module.css";
import vk from "@assets/icons/VK.svg";
import instagram from "@assets/icons/Instagram.svg";
import Tooltip from "@assets/icons/Tooltip.svg";

function ContactSection() {
  return (
    <section id="contacts" className={styles.contactSection}>
      <div className={styles.container}>
        <div className={styles.info}>
          <h2 className={styles.title}>Контакты</h2>
          <div className={styles.office}>
            <h3 className={styles.subtitle}>
              Главный офис
              <div className={styles.hint}>
                <img className={styles.tooltip} src={Tooltip} alt="" />
                <span className={styles.tooltipText}>
                  Адрес и телефоны для корреспонденции, инженерного вопроса и
                  доставки. Для вопросов по обслуживанию и товарам, пожалуйста,
                  задавайте в отделе продаж.
                </span>
              </div>
            </h3>
            <p className={styles.phone}>+7 800 789 89 89</p>
            <p className={styles.address}>
              г. Санкт-Петербург, Комсомольская, 43 к1
            </p>
          </div>
          <div className={styles.sales}>
            <h3 className={styles.subtitle}>Отдел продаж</h3>
            <p className={styles.phone}>+7 800 789 89 89</p>
            <p className={styles.address}>
              г. Санкт-Петербург, Комсомольская, 43 к1
            </p>
          </div>
          <div className={styles.socials}>
            <a
              href="https://vk.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <img src={vk} alt="VK" />
            </a>
            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <img src={instagram} alt="WhatsApp" />
            </a>
          </div>
        </div>
        <div className={styles.map}>
          <iframe
            title="Карта"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1998.5007068576166!2d30.315635315994788!3d59.9390418818754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x469631bfb5bd133d%3A0x69e8e2e0b6ab41ed!2z0JHQsNC60LDRgNCw0Y8g0JvQtdC90YLRgNC-0LMsIDQzINCc0L7RgdC60LLQsCwg0LrRgNCw0LksIDM5MDAwMw!5e0!3m2!1sru!2sru!4v1630915224653!5m2!1sru!2sru"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
