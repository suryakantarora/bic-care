import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  authToken: any;
  constructor(private httpClient: HttpClient,) { }

  getService() {
    const url='https://hub.dummyapis.com/delay?seconds=10';
    return this.httpClient.get<any>(url).pipe(
      retry(0), // retry a failed request up to 1 times
      map(this.extractData),
      catchError(this.handleError) // then handle the error
    );
  }
  private extractData(res: Response) {
    console.log('Service Result : ' + JSON.stringify(res));
    let body = res;
    return body || {};
  }
  private handleError(error: HttpErrorResponse) {
    let msg:any;
     msg = {
      msg: error.error.message,
      code: error.status,
      respCode: error.error.respCode
    };
    console.log('Error Occured: ' + JSON.stringify(msg));
    return throwError(msg);
  }
  showToast(msg:string) {
    console.log('Error: ' + msg)
  }
}
