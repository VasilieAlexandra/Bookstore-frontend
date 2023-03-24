import IOrderLineData from "./OrderLine";
import IAddressData from "./ShippingAddress";

export default interface IOrderData {
    id?: number | null,
    idAddress: number | null,
    date: string,
    userid?: string | null,
    shippingAddress?: IAddressData|null,
    orderLines?: Array<IOrderLineData> | null,
}