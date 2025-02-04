import { useState, useEffect } from "react";
import styles from "./Cart.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getCartItems, removeFromCart, clearCart } from "../../redux/slices/cartSlice";
import { placeOrder } from "../../redux/slices/ordersSlice";
import { Order } from "../../types/bean";

function Cart() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cart);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  const [orderNumber, setOrderNumber] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });

  useEffect(() => {
    dispatch(getCartItems()); // ✅ Загружаем товары из Redux
    generateOrderNumber();
  }, [dispatch]);

  const generateOrderNumber = () => {
    setOrderNumber(Math.floor(1000 + Math.random() * 9000));
  };

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id)); // ✅ Удаление товара из Redux
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOrder = async () => {
    if (!formData.name || !formData.phone || !formData.email) {
      alert("Заполните все поля для оформления заказа!");
      return;
    }

    // ✅ Гарантируем, что orderNumber — число
  const validOrderNumber = orderNumber ?? Math.floor(1000 + Math.random() * 9000);

  // Преобразуем Sneaker[] в OrderItem[]
  const orderItems = cartItems.map((item) => ({
    id: item.id,
    title: item.title,
    price: item.price,
    size: item.sizes[0],
    sizes: [item.sizes[0]],
    vendorСode: item.vendorCode,
    inStock: item.inStock,
    imgUrl: item.imgUrl,
    description: item.description,
    stars: item.stars,
    oldPrice: item.oldPrice,
    gender: item.gender,
    color: item.color,
    compound: item.compound,
    country: item.country,
  }));

  const orderData: Order = {
    id: undefined, // ✅ Теперь TypeScript не будет ругаться
    orderNumber: validOrderNumber, 
    items: orderItems,
    totalPrice,
    customer: formData,
  };

    try {
      await dispatch(placeOrder(orderData));
      await dispatch(clearCart()); // ✅ Очистка корзины через Redux
      alert(`Заказ №${orderNumber} успешно оформлен!`);

      setFormData({ name: "", phone: "", email: "" });
      generateOrderNumber();
    } catch (error) {
      console.error("Ошибка оформления заказа:", error);
      alert("Ошибка оформления заказа!");
    }
  };

  return (
    <div className={styles.cartPage}>
      <h2 className={styles.title}>Оформление заказа</h2>
      <p className={styles.orderNumber}>Заказ № {orderNumber}</p>

      <div className={styles.cartContainer}>
        <p>
          Товаров в заказе: <b>{cartItems.length} шт</b>
        </p>
        <p>
          Общая сумма заказа: <b>{totalPrice} ₽</b>
        </p>

        <div className={styles.cartItems}>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img src={item.imgUrl} alt={item.title} className={styles.cartImage} />
                <div className={styles.cartDetails}>
                  <p className={styles.cartTitle}>{item.title}</p>
                  <p className={styles.cartPrice}>{item.price} ₽</p>
                </div>
                <button className={styles.removeButton} onClick={() => handleRemove(item.id)}>
                  Удалить
                </button>
              </div>
            ))
          ) : (
            <p className={styles.emptyCart}>Корзина пуста</p>
          )}
        </div>

        {/* Форма оформления заказа */}
        <div className={styles.orderForm}>
          <input
            type="text"
            name="name"
            placeholder="Ваше имя"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Номер телефона"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleInputChange}
          />
          <button className={styles.orderButton} onClick={handleOrder}>
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
