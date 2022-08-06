import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMedia } from 'src/Models/IMedia';
import { IUploadResponse } from 'src/Models/IUploadResponse';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  httpOption;
  constructor(private httpClient: HttpClient) {
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        Authorization: `Bearer ${localStorage.getItem('Auth')}` ?? ""
      })
    }
   }

   upload(files: File[]): Observable<IUploadResponse>{
    console.log(files)
    var formData = new FormData();
    files.forEach(element => {
      formData.append("File", element)
    });
    console.log(formData);
    return this.httpClient.post<IUploadResponse>(`${environment.APIBase}/Media`, formData);
   }

   addMedia(media:IMedia): Observable<number>{
    return this.httpClient.post<number>(`${environment.APIBase}/Media/add`,JSON.stringify(media), this.httpOption).pipe(
      catchError(err => {
        console.log(err)
        throw 'error in source. Details: ' + err;
      })
    )
   }

   deleteMedia(url:string):Observable<any>{
    return this.httpClient.post<any>(`${environment.APIBase}/Media/Delete`,JSON.stringify(url),this.httpOption)
   }

}
