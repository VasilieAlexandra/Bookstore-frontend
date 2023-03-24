import ICategoryData from "./Category";

export default interface IBookData {
  id?: any | null,
  name: string,
  author: string,
  image?: any | null,
  price: number,
  quantity: number,
  categories: Array<ICategoryData>,
  idOwner?: any | null,
}