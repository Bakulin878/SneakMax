import { ReactNode } from "react"; // ✅ Теперь TypeScript распознает `ReactNode`

// Типизация данных для команды
export interface TeamMember {
    id: number;
    imgUrl: string;
    name: string;
    role: string;
  }
  
  // Типизация данных для товара (кроссовки)
  export interface Sneaker {
    [x: string]: ReactNode;
    id: number;
    vendorCode: string;
    inStock: number;
    title: string;
    description: string;
    imgUrl: string;
    stars: number;
    sizes: number[];
    price: number;
    oldPrice: number;
    gender: string;
    color: string;
    compound: string;
    country: string;
  }
  // Типизация данных для товара в корзине
  export interface SneakerCart {
    id: number;
    vendorCode: string;
    inStock: number;
    title: string;
    description: string;
    imgUrl: string;
    stars: number;
    sizes: number[];
    price: number;
    oldPrice: number;
    gender: string;
    color: string;
    compound: string;
    country: string;
    size: number;
  }
  // Тип для товара в заказе (Sneaker в заказе)
export interface OrderItem {
  id: number;
  vendorСode: string;
  inStock: number;
  title: string;
  description: string;
  imgUrl: string;
  stars: number;
  sizes: number[];
  price: number;
  oldPrice: number;
  gender: string;
  color: string;
  compound: string;
  country: string;
  size: number; // Размер выбранный при заказе
}

// Тип для покупателя (Customer)
export interface Customer {
  name: string;
  phone: string;
  email: string;
}

// Тип для заказа (Order)
export interface Order {
  id?: number; // ✅ Делаем `id` необязательным, так как сервер его создаёт
  orderNumber: number;
  items: OrderItem[];
  totalPrice: number;
  customer: {
    name: string;
    phone: string;
    email: string;
  };
}
  