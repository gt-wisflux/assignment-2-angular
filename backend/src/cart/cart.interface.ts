export interface Ingredient {
  id: number;
  name: string;
  price: number;
}

export interface ICartItem {
  size: string;
  sizePrice: number;
  price: number;
  ingredients: Ingredient[];
}

export interface IAddToCartRequest {
  userId: number;
  totalPrice: number;
  items: ICartItem[];
}
