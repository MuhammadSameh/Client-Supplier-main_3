import { IProduct } from "./IProduct";

export interface InventoryDto {
    inventoryId: number;
    productId: number;
    size: string;
    color: string;
    quantity: number;
    price: number;
    product: IProduct;
    medias: string[];
}
