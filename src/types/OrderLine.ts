import IBookData from "./Book";

export default interface IOrderLineData {
    idBook?: number | null,
    orderId?: number | null,
    quantity: number,
    book?: IBookData | null,
    userid?: string | null,
}