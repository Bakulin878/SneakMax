// Типизация данных для команды
export interface TeamMember {
    id: number;
    imgUrl: string;
    name: string;
    role: string;
  }
  
  // Типизация данных для товара (кроссовки)
  export interface Sneaker {
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
  