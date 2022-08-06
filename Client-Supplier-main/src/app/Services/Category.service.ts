import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBrand } from 'src/Models/IBrand';
import { ICategory } from 'src/Models/ICategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
httpOption
constructor(private httpCliet: HttpClient) {
  this.httpOption = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      Authorization: `Bearer ${localStorage.getItem('Auth')}` ?? ""
    })
  }
 }

getParentCategories(): Observable<ICategory[]>{
  return this.httpCliet.get<ICategory[]>(`${environment.APIBase}/Category/parentCategories`,this.httpOption)
}

getSubCategories(parentId: number): Observable<ICategory[]>{
  return this.httpCliet.get<ICategory[]>(`${environment.APIBase}/Category/subcategoriesByparent/${parentId}`,this.httpOption)
}

getTopBrands(categoryId:number): Observable<IBrand[]>{
  return this.httpCliet.get<IBrand[]>(`${environment.APIBase}/Category/topbrands/${categoryId}`,this.httpOption)
}

}