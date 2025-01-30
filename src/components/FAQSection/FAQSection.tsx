import { useState } from "react";
import styles from "./FAQSection.module.css";
import faqData from "../../data/faq.json";

function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Часто задаваемые вопросы</h2>
        <div className={styles.faqContainer}>
          {faqData.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <div className={styles.question} onClick={() => toggleFAQ(index)}>
                {faq.question}
                <span className={styles.icon}>
                  {activeIndex === index ? (
                    <span className={styles.cross}></span>
                  ) : (
                    <span className={styles.plus}></span>
                  )}
                </span>
              </div>
              {activeIndex === index && (
                <div className={styles.answer}>{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
