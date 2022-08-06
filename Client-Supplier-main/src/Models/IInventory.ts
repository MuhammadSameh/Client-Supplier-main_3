import { IMedia } from "./IMedia";

export interface IInventory {
    inventoryId: number;
    size: string;
    color: string;
    quantity: number;
    price: number;
    createdDate: string;
    productId: number;
    medias: IMedia[];
}
