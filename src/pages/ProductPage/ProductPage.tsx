import { useState, useEffect } from "react";
import styles from "./ProductPage.module.css";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getSneakerById } from "../../redux/slices/sneakersSlice";
import { addToCart, getCartItems } from "../../redux/slices/cartSlice"; // Redux-корзина
import star from "../../assets/icons/Star 5.svg";
import { Sneaker } from "../../types/bean";

function ProductPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.sneakers.selectedSneaker);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getSneakerById(Number(id))); // Загружаем товар из Redux
    }
  }, [id, dispatch]);

  const handleOrder = async () => {
    if (!selectedSize || !product) {
      alert("Выберите размер перед добавлением в корзину!");
      return;
    }

    const itemToCart: Sneaker & { size: number } = {
      id: product.id || 0, // ✅ Гарантируем, что id — число
      vendorCode: product.vendorCode || "",
      inStock: product.inStock || 0,
      title: product.title || "Без названия",
      description: product.description || "Описание отсутствует",
      imgUrl: product.imgUrl || "",
      stars: product.stars || 0,
      sizes: product.sizes || [],
      price: product.price || 0,
      oldPrice: product.oldPrice || 0,
      gender: product.gender || "Универсальный",
      color: product.color || "Не указан",
      compound: product.compound || "Не указан",
      country: product.country || "Не указано",
      size: selectedSize, // ✅ Добавляем выбранный размер
    };

    setLoading(true);
    try {
      dispatch(addToCart(itemToCart)); // ✅ Теперь добавление в Redux
      dispatch(getCartItems()); // Обновляем корзину
      alert(`Товар "${product?.title}" (${selectedSize}) добавлен в корзину!`);
    } catch (error) {
      console.error("Ошибка при добавлении в корзину:", error);
      alert("Ошибка при добавлении в корзину!");
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  return (
    <div className={styles.productPage}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img
            src={product.imgUrl}
            alt={product.title}
            className={styles.image}
          />
        </div>

        <div className={styles.infoContainer}>
          <p className={styles.article}>
            <span>Артикул: {product.vendorСode}</span>
            <span>
              В наличии:{" "}
              <span className={styles.articlePieces}>{product.inStock} шт</span>
            </span>
          </p>
          <h1 className={styles.title}>{product.title}</h1>

          {/* Динамический рейтинг */}
          <div className={styles.rating}>
            {Array.from({ length: product.stars }).map((_, index) => (
              <img key={index} src={star} alt="Рейтинг звезда" />
            ))}
          </div>

          {/* Выбор размера */}
          <p className={styles.selectSize}>Выберите размер</p>
          <div className={styles.sizeOptions}>
            {product.sizes.map((size, index) => (
              <button
                key={index}
                className={`${styles.sizeButton} ${
                  selectedSize === size ? styles.selected : ""
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Цена */}
          <div className={styles.priceContainer}>
            <span className={styles.discountedPrice}>{product.price} ₽</span>
            <span className={styles.originalPrice}>{product.oldPrice} ₽</span>
          </div>

          {/* Кнопка заказа */}
          <button
            className={styles.orderButton}
            onClick={handleOrder}
            disabled={loading}
          >
            {loading ? "Добавляется..." : "Заказать"}
          </button>

          {/* Информация о доставке */}
          <ul className={styles.features}>
            <li>✔ Бесплатная доставка до двери</li>
            <li>✔ Оплата заказа при получении</li>
            <li>✔ Обмен в течение двух недель</li>
          </ul>
        </div>
      </div>

      {/* Описание товара */}
      <div className={styles.details}>
        <div className={styles.description}>
          <h2>Описание</h2>
          <p>{product.description}</p>
        </div>

        {/* Характеристики */}
        <div className={styles.characteristics}>
          <h2>Характеристики</h2>
          <p>
            <b>Пол:</b> {product.gender}
          </p>
          <p>
            <b>Цвет:</b> {product.color}
          </p>
          <p>
            <b>Состав:</b> {product.compound}
          </p>
          <p>
            <b>Страна производства:</b> {product.country}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
