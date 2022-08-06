import { IProduct } from "./IProduct";

export interface ISupplierInfo {
    id: number;
    userId: string;
    products: IProduct[];
}
