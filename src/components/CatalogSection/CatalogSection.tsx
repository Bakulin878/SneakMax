import { useEffect, useState } from "react";
import styles from "./CatalogSection.module.css";
// import { fetchSneakers } from '../../api/sneakersApi';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Sneaker, SneakerCart } from "../../types/bean";
import eye from "../../assets/icons/Show.svg";
import basket from "../../assets/icons/Basket.svg";
import Nouislider from "nouislider-react";
// import noUiSlider from "nouislider";
import "nouislider/dist/nouislider.css";

const CART_API_URL = "https://70fd489b13cfbfb8.mokky.dev/cart";

function CatalogSection() {
  const [visibleProducts, setVisibleProducts] = useState<number>(6);
  const [data, setData] = useState<Sneaker[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Sneaker | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  // значения для Цены
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(30000);
  // значения для Пола
  const [man, setMan] = useState<boolean>(true);
  const [woman, setWoman] = useState<boolean>(true);
  // значения для Размера
  const [sizes, setSizes] = useState<number[]>([]);

  const navigate = useNavigate();

  async function fetchData(url: string) {
    try {
      const response = await axios.get<Sneaker[]>(url);
      setData(response.data);
    } catch (error) {
      console.error("Ошибка загрузки данных:", (error as Error).message);
    }
  }

  useEffect(() => {
    const url = "https://70fd489b13cfbfb8.mokky.dev/sneakers";
    fetchData(url);
  }, []);

  // Фильтрация товаров
  const filter = () => {
    let genderQuery = "";
    let sizeQuery = sizes.map((size) => `&sizes[]=${size}`).join("");

    if (man && !woman) genderQuery = "&gender=Мужской";
    else if (!man && woman) genderQuery = "&gender=Женский";

    const url = `https://70fd489b13cfbfb8.mokky.dev/sneakers?price[from]=${min}&price[to]=${max}${genderQuery}${sizeQuery}`;
    fetchData(url);
  };

  const loadMore = () => {
    setVisibleProducts((prev) => prev + 6);
  };

  const handleViewProduct = (id: number) => {
    navigate(`/product/${id}`);
  };

  const handleOpenModal = (product: Sneaker) => {
    setSelectedProduct(product);
    setSelectedSize(null);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setSelectedSize(null);
  };
  const handleSizeSelect = (size: number) => {
    setSelectedSize(size);
  };

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert("Выберите размер перед добавлением в корзину!");
      return;
    }

    const itemToCart: SneakerCart = {
      ...selectedProduct,
      size: selectedSize,
    };

    setLoading(true);
    try {
      await axios.post(CART_API_URL, itemToCart);
      alert(
        `Товар "${selectedProduct.title}" (${selectedSize}) добавлен в корзину!`
      );
    } catch (error) {
      console.error("Ошибка при добавлении в корзину:", error);
      alert("Ошибка при добавлении в корзину!");
    } finally {
      setLoading(false);
      handleCloseModal();
    }
  };

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  return (
    <section id="catalog" className={styles.catalog}>
      <div className={styles.container}>
        {/* Кнопка открытия фильтра для мобильных устройств */}
        <button
          className={styles.filterToggle}
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          {isFilterOpen ? "Скрыть фильтр" : "Показать фильтр"}
        </button>
        {/* Фильтр */}
        <aside
          className={`${styles.filter} ${isFilterOpen ? styles.open : ""}`}
        >
          <h3>
            Подбор <br /> по параметрам
          </h3>
          <form>
            <div className={styles.filterBlock1}>
              <div className={styles.priceFilter}>
                <label>Цена, руб:</label>
                <div className={styles.inputWrapper}>
                  <input
                    className={styles.input}
                    type="number"
                    value={min}
                    // onChange={(e) => handleInputChange(0, e.target.value)}
                    min="0"
                    // max={priceRange[1]}
                  />
                  <span className={styles.separator}></span>
                  <input
                    className={styles.input}
                    type="number"
                    value={max}
                    // onChange={(e) => handleInputChange(0, e.target.value)}
                    min="0"
                    // max={priceRange[1]}
                  />
                </div>
                <div className={styles.sliderWrapper}>
                  <Nouislider
                    range={{ min: 0, max: 30000 }}
                    start={[1000, 25000]}
                    connect
                    onUpdate={(slider) => {
                      setMin(Number(slider[0]));
                      setMax(Number(slider[1]));
                    }}
                    step={10}
                  />
                </div>
              </div>
            </div>

            <label>Пол</label>
            <div className={styles.filterBlock2}>
              <label className={styles.genderOption}>
                <input
                  type="checkbox"
                  checked={man}
                  onChange={() => setMan(!man)}
                />
                Мужской
              </label>
              <label className={styles.genderOption}>
                <input
                  type="checkbox"
                  checked={woman}
                  onChange={() => setWoman(!woman)}
                />
                Женский
              </label>
            </div>

            <label>Размер:</label>
            <div className={styles.sizes}>
              {[35, 36, 37, 38, 39, 40, 41, 42, 43].map((size) => (
                <button
                  type="button"
                  key={size}
                  className={`${styles.sizeButton} ${
                    sizes.includes(size) ? styles.selected : ""
                  }`}
                  onClick={() =>
                    setSizes((prev) =>
                      prev.includes(size)
                        ? prev.filter((s) => s !== size)
                        : [...prev, size]
                    )
                  }
                >
                  {size}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={filter}
              className={styles.applyButton}
            >
              Применить
            </button>
            <button
              type="reset"
              className={styles.resetButton}
              onClick={() => {
                setMan(true);
                setWoman(true);
                setSizes([]);
                setMin(1000);
                setMax(25000);
                // Загружаем все товары без фильтров
                fetchData("https://70fd489b13cfbfb8.mokky.dev/sneakers");
              }}
            >
              Сбросить
            </button>
          </form>
        </aside>

        {/* Товары */}
        <div className={styles.products}>
          {data.slice(0, visibleProducts).map((product) => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.productImageContainer}>
                <img
                  src={product.imgUrl}
                  alt={product.title}
                  className={styles.productImage}
                />
                <div className={styles.overlay}>
                  <button
                    className={styles.viewButton}
                    onClick={() => handleViewProduct(product.id)}
                  >
                    <img src={eye} alt="eye" />
                  </button>
                  <button
                    className={styles.addButton}
                    onClick={() => handleOpenModal(product)}
                  >
                    <img src={basket} alt="basket" />
                  </button>
                </div>
              </div>
              <h4 className={styles.productName}>{product.title}</h4>
              <p className={styles.productPrice}>{product.price} р</p>
            </div>
          ))}
        </div>
      </div>

      {/* Кнопка "Показать ещё" */}
      {visibleProducts < data.length && (
        <button onClick={loadMore} className={styles.loadMoreButton}>
          Показать ещё
        </button>
      )}

      {/* Модальное окно */}
      {selectedProduct && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={handleCloseModal}>
              ✖
            </button>
            <img
              src={selectedProduct.imgUrl}
              alt={selectedProduct.title}
              className={styles.modalImage}
            />
            <h3>{selectedProduct.title}</h3>
            <p>{selectedProduct.price} ₽</p>
            <p>Выберите размер:</p>
            <div className={styles.sizeOptions}>
              {selectedProduct.sizes.map((size) => (
                <button
                  key={size}
                  className={`${styles.sizeButton} ${
                    selectedSize === size ? styles.selected : ""
                  }`}
                  onClick={() => handleSizeSelect(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            <button className={styles.confirmButton} onClick={handleAddToCart}>
              Добавить в корзину
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default CatalogSection;
