import React, { useState } from "react";
import styles from "./PairSelection.module.css";
import img1 from "../../assets/images/PairSelection/фото кроссовка.jpeg";
import img2 from "../../assets/images/PairSelection/Rectangle 45.png";

function PairSelection() {
  const [step, setStep] = useState(1);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prevTypes) =>
      prevTypes.includes(type)
        ? prevTypes.filter((t) => t !== type)
        : [...prevTypes, type]
    );
  };

  const handleSizeChange = (size: string) => {
    setSelectedSizes((prevSizes) =>
      prevSizes.includes(size)
        ? prevSizes.filter((s) => s !== size)
        : [...prevSizes, size]
    );
  };

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Отправлено:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="picker" className={styles.pairSelection}>
      <div className={styles.container}>
        {step === 1 && (
          <div className={styles.card}>
            <h2 className={styles.h2}>Мы подберем идеальную пару для вас</h2>
            <p className={styles.p}>
              Ответьте на три вопроса и мы вышлем каталог с самыми подходящими
              для вас моделями{" "}
            </p>
            <h3 className={styles.h3}>Какой тип кроссовок рассматриваете?</h3>
            <div className={styles.options}>
              {[
                "Кеды",
                "Кроссовки",
                "Беговые",
                "Баскетбольные",
                "Летние",
                "Зимние",
              ].map((type, index) => (
                <label key={index} className={styles.option}>
                  <input type="checkbox" />
                  <img src={img1} alt="Тип кроссовок" />

                  <div
                    key={index}
                    className={`${styles.genderOption} ${
                      selectedTypes.includes(type) ? styles.selected : ""
                    }`}
                    onClick={() => handleTypeChange(type)}
                  >
                    <span className={styles.checkbox}>
                      {selectedTypes.includes(type) && "✔"}
                    </span>
                    {type}
                  </div>
                </label>
              ))}
            </div>
            <div className={styles.navigation}>
              <span className="">{step}/3</span>
              <button onClick={handleNextStep} className={styles.nextButton}>
                Следующий шаг
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className={styles.card}>
            <h2 className={styles.h2}>Мы подберем идеальную пару для вас</h2>
            <p className={styles.p}>
              Ответьте на три вопроса, и мы вышлем каталог с самыми подходящими
              для вас моделями.
            </p>
            <h3 className={styles.h3}>Какой размер вам подойдет?</h3>
            <div className={styles.sizes}>
              {["менее 36", "36-38", "39-41", "42-44", "45 и больше"].map(
                (size, index) => (
                  <label key={index} className={styles.sizeOption}>
                    <input type="checkbox" />
                    <div
                      key={index}
                      className={`${styles.genderOption} ${
                        selectedSizes.includes(size) ? styles.selected : ""
                      }`}
                      onClick={() => handleSizeChange(size)}
                    >
                      <span className={styles.checkbox}>
                        {selectedSizes.includes(size) && "✔"}
                      </span>
                      {size}
                    </div>
                  </label>
                )
              )}
              <img src={img2} alt="" />
            </div>
            <div className={styles.navigation}>
              <span className="">{step}/3</span>
              <button onClick={handleNextStep} className={styles.nextButton}>
                Следующий шаг
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className={styles.card}>
            <h2 className={styles.h2}>Мы подберем идеальную пару для вас</h2>
            <p className={styles.p}>
              Ответьте на три вопроса, и мы вышлем каталог с самыми подходящими
              для вас моделями.
            </p>
            <h3 className={styles.h3}>Уточните какие-либо моменты</h3>
            <div className={styles.comments}>
              <textarea
                className={styles.textArea}
                placeholder="Введите сообщение"
              ></textarea>
            </div>
            <div className={styles.navigation}>
              <span className="">{step}/3</span>
              <button onClick={handleNextStep} className={styles.nextButton}>
                Следующий шаг
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className={styles.card}>
            <h2 className={styles.h2}>Ваша подборка готова!</h2>
            <p className={styles.p}>
              Оставьте свои контактные данные, чтобы мы могли отправить
              подготовленный для вас каталог.
            </p>
            <div className={styles.sending}>
              <p className={styles.heading}>Получить предложение</p>
              <p className={styles.text}>
                Получите подборку подходящих для вас моделей на почту
              </p>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Ваше имя"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <input
                  type="email"
                  className={styles.input}
                  placeholder="E-mail"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <button type="submit" className={styles.submitButton}>
                  Получить
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default PairSelection;
