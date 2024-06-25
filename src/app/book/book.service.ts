import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  url:string="http://localhost:3000/books/"
  constructor(private http:HttpClient) { }

  public getBooks():Observable<any>{
    return this.http.get<any>(this.url);
  }

  public getAuthors():Observable<any>
  {
    return this.http.get<any>("http://localhost:3000/authors/");
  }

  public saveBooks(book:any):Observable<any>{
   return this.http.post<any>(this.url,book).pipe(
    catchError(this.errorHandler)
   );
  }
  public updateBooks(id:number,book:any):Observable<any>{
    return this.http.put<any>(this.url+id,book).pipe(
     catchError(this.errorHandler)
    );
   }
   public deleteBooks(id:any):Observable<any>{
    return this.http.delete<any>(this.url+id).pipe(
     catchError(this.errorHandler)
    );
   }


  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => new Error(errorMessage));
 }
}




