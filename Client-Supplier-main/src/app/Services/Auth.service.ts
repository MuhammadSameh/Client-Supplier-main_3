import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILogin } from 'src/Models/ILogin';
import { IRegister } from 'src/Models/IRegister';
import { ISupplier } from 'src/Models/ISupplier';
import { IToken } from 'src/Models/IToken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOption;
  constructor(private httpClient: HttpClient) {
    
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        Authorization: `Bearer ${localStorage.getItem('Auth')}` ?? ""
      })
    }
   }

   register(registerInfo: IRegister): Observable<number>{
    return this.httpClient.post<number>(`${environment.APIBase}/Supplier/Register`,JSON.stringify(registerInfo), this.httpOption).pipe(
      retry(2),
       catchError((err)=>{
        return throwError(() => new Error(err))
       })
    )
   }

   login(loginInfo:ILogin): Observable<IToken>{
    return this.httpClient.post<IToken>(`${environment.APIBase}/Supplier/Login`,JSON.stringify(loginInfo),
     this.httpOption)
   }

   isLogged():boolean{
    if(localStorage.getItem('Auth') == null){
      return false;
    }
    return true
   }

   logout(){
    localStorage.clear();
   }
}
