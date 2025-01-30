import { useState, useEffect } from "react";
import styles from "./Cart.module.css";
import axios from "axios";

const CART_API_URL = "https://70fd489b13cfbfb8.mokky.dev";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderNumber, setOrderNumber] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await axios.get(`${CART_API_URL}/cart`);
        setCartItems(response.data);
        calculateTotal(response.data);
      } catch (error) {
        console.error("Ошибка загрузки корзины:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCart();
    generateOrderNumber();
  }, []);

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.price, 0);
    setTotalPrice(total);
  };

  const generateOrderNumber = () => {
    setOrderNumber(Math.floor(1000 + Math.random() * 9000));
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`${CART_API_URL}/cart/${id}`);
      const updatedCart = cartItems.filter((item) => item.id !== id);
      setCartItems(updatedCart);
      calculateTotal(updatedCart);
    } catch (error) {
      console.error("Ошибка удаления товара:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOrder = async () => {
    if (!formData.name || !formData.phone || !formData.email) {
      alert("Заполните все поля для оформления заказа!");
      return;
    }

    try {
      await axios.post(`${CART_API_URL}/orders`, {
        orderNumber,
        items: cartItems,
        totalPrice,
        customer: formData,
      });
      
      // Очистка корзины (удаление всех товаров)
      await axios.patch(`${CART_API_URL}/cart`, []);

      alert(`Заказ №${orderNumber} успешно оформлен!`);
      setCartItems([]);
      setTotalPrice(0);
      setFormData({ name: "", phone: "", email: "" });
      generateOrderNumber();
    } catch (error) {
      console.error("Ошибка оформления заказа:", error);
      alert("Ошибка оформления заказа!");
    }
  };

  if (loading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

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
