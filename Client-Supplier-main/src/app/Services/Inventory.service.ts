import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IInventory } from 'src/Models/IInventory';
import { InventoryDto } from 'src/Models/InventoryDto';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  productsListSubject: BehaviorSubject<InventoryDto[]>;
  httpOption;
  constructor(private httpClient: HttpClient) {
    this.productsListSubject = new BehaviorSubject<InventoryDto[]>([]);
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        Authorization: `Bearer ${localStorage.getItem('Auth')}` ?? ""
      })
    }
   }


   getInventory(inventoryId: number){

   }

   addInventory(inventory: IInventory): Observable<InventoryDto>{
    return this.httpClient.post<InventoryDto>(`${environment.APIBase}/inventory/addInventory`,JSON.stringify(inventory), this.httpOption).pipe(
      catchError(err => {
        console.log(err)
        throw 'error in source. Details: ' + err.message;
      })
    )
   }

   getInventoriesForSupplier(supplierInfoId:number): Observable<InventoryDto[]>{
    return this.httpClient.get<InventoryDto[]>(`${environment.APIBase}/inventory/productsForSupplier/${supplierInfoId}`)
   }

   fetchInventoriesForSupplier(supplierInfoId:number): Observable<InventoryDto[]>{
    this.getInventoriesForSupplier(supplierInfoId).subscribe((list)=>{
      this.productsListSubject.next(list)
      return this.productsListSubject.asObservable()
    })
    return this.productsListSubject.asObservable();
   }

   deleteInventory(id:number): Observable<Object>{
    return this.httpClient.delete(`${environment.APIBase}/inventory/delete/${id}`, this.httpOption);
   }

   updateInventory(id:number, inventory:IInventory): Observable<InventoryDto>{
    return this.httpClient.post<InventoryDto>(`${environment.APIBase}/inventory/${id}`,JSON.stringify(inventory), this.httpOption)
   }

   search(name:string):Observable<InventoryDto[]>{
    return this.httpClient
    .get<InventoryDto[]>(`${environment.APIBase}/inventory/Search/${name}`,this.httpOption);
   }

   getInventoriesForProduct(productId:number):Observable<InventoryDto[]>{
    return this.httpClient
    .get<InventoryDto[]>(`${environment.APIBase}/inventory/GetInventoriesByProduct/${productId}`,this.httpOption)
   }

   updateSubjectList(list:InventoryDto[]){
    this.productsListSubject.next(list);
   }

  getItemsSoldForSupplier(supplierInfoId:number):Observable<InventoryDto[]>{
    return this.httpClient.get<InventoryDto[]>(`${environment.APIBase}/Order/OrdersForSupplier/${supplierInfoId}`,this.httpOption);
  }

  totalRevenueForSupplier(supplierInfoId:number):Observable<number>{
    return this.httpClient.get<number>(`${environment.APIBase}/Order/${supplierInfoId}`,this.httpOption);
  }

}
