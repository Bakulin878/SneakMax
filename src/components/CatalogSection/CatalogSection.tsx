import { useEffect, useState } from "react";
import styles from "./CatalogSection.module.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getSneakers, filterSneakers } from "../../redux/slices/sneakersSlice";
import eye from "../../assets/icons/Show.svg";
import basket from "../../assets/icons/Basket.svg";
import Nouislider from "nouislider-react";
import "nouislider/dist/nouislider.css";
import { addToCart } from "../../redux/slices/cartSlice";
import { Sneaker } from "../../types/bean";

// const CART_API_URL = "https://70fd489b13cfbfb8.mokky.dev/cart";

const CatalogSection = () => {
  const dispatch = useAppDispatch();
  const { sneakers, status } = useAppSelector((state) => state.sneakers);
  const [visibleProducts, setVisibleProducts] = useState<number>(6);
  // const [data, setData] = useState<Sneaker[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Sneaker | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  // const [loading, setLoading] = useState<boolean>(false);

  // **Фильтры**
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(30000);
  const [man, setMan] = useState<boolean>(true);
  const [woman, setWoman] = useState<boolean>(true);
  const [sizes, setSizes] = useState<number[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (status === "idle") {
      dispatch(getSneakers());
    }
  }, [status, dispatch]);

  // **Фильтрация товаров через Redux**
  const filter = () => {
    dispatch(filterSneakers({ min, max, man, woman, sizes }));
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

  const handleAddToCart = () => {
    if (!selectedSize || !selectedProduct) {
      alert("Выберите размер перед добавлением в корзину!");
      return;
    }

    // ✅ Явно указываем тип Sneaker & { size: number }
  const itemToCart: Sneaker & { size: number } = {
    id: selectedProduct.id, // 🔹 Теперь `id` точно есть
    vendorCode: selectedProduct.vendorCode,
    inStock: selectedProduct.inStock,
    title: selectedProduct.title,
    description: selectedProduct.description,
    imgUrl: selectedProduct.imgUrl,
    stars: selectedProduct.stars,
    sizes: selectedProduct.sizes,
    price: selectedProduct.price,
    oldPrice: selectedProduct.oldPrice,
    gender: selectedProduct.gender,
    color: selectedProduct.color,
    compound: selectedProduct.compound,
    country: selectedProduct.country,
    size: selectedSize, // 🔹 Размер добавляется как поле size
  };

    dispatch(addToCart(itemToCart));
  alert(`Товар "${selectedProduct?.title}" (${selectedSize}) добавлен в корзину!`);
  handleCloseModal();
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
                    onChange={(e) => setMin(Number(e.target.value))} // ✅ Исправлено
                    min="0"
                    // max={priceRange[1]}
                  />
                  <span className={styles.separator}></span>
                  <input
                    className={styles.input}
                    type="number"
                    value={max}
                    onChange={(e) => setMax(Number(e.target.value))} // ✅ Исправлено
                    min="0"
                    // max={priceRange[1]}
                  />
                </div>
                <div className={styles.sliderWrapper}>
                  <Nouislider
                    range={{ min: 0, max: 30000 }}
                    start={[1000, 25000]}
                    connect={true}
                    step={10}
                    onUpdate={(slider) => {
                      setMin(Number(slider[0]));
                      setMax(Number(slider[1]));
                    }}
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
                dispatch(filterSneakers({ min: 0, max: 30000, man: true, woman: true, sizes: [] }));
              }}
            >
              Сбросить
            </button>
          </form>
        </aside>

        {/* Товары */}
        <div className={styles.products}>
          {sneakers.slice(0, visibleProducts).map((product) => (
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
      {visibleProducts < sneakers.length && (
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
};

export default CatalogSection;
