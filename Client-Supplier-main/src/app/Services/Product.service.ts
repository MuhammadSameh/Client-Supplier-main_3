import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct } from 'src/Models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
httpOption;
constructor(private httpClient: HttpClient) {
  this.httpOption = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      Authorization: `Bearer ${localStorage.getItem('Auth')}` ?? ""
    })
  }
 }

getProducts(supplierInfoId:number){

}
addProduct(product: IProduct): Observable<{id: number}>{
return this.httpClient.post<{id:number}>(`${environment.APIBase}/Inventory/addProduct`,
JSON.stringify(product), this.httpOption).pipe(
  catchError(err => {
    console.log(err)
    throw 'error in source. Details: ' + err;
  })
);
}
updateProduct(productId:number, product: IProduct): Observable<any>{
  return this.httpClient.post(`${environment.APIBase}/Inventory/UpdateProduct`,JSON.stringify(product), this.httpOption)
}
deleteProduct(productId:number){
  return this.httpClient.delete(`${environment.APIBase}/Inventory/DeleteProduct/${productId}`, this.httpOption)
}
}
