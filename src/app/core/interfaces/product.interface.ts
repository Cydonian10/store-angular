import { ICategory } from "./category.interface";

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: ICategory;
  images: Array<string>;
}

export interface ICartItem extends IProduct {
  quantity: number;
  total: number;
}
