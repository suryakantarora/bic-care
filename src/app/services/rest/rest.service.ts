import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, retry, throwError } from 'rxjs';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { environment } from '../../../environments/environment';
import { suburl } from './url-config';
import { LoadingPage } from 'src/app/shared/popovers/loading/loading.page';
import { PopoverController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class RestService {
  authToken: any;
  baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient, private popoverCtrl: PopoverController) { }

  // Capacitor http request starts here.
  async loading() {
    const popover = await this.popoverCtrl.create({
      component: LoadingPage,
      cssClass: 'custom-loading',
      backdropDismiss: false,
      showBackdrop: true
    });
    popover.present();
    return popover;
  }
  async fetchAtmList() { 
    const loading=await this.loading();
    const options = {
      url: this.baseUrl + suburl.ATM_LIST,
      data: {}
    };
    console.log("Request Data: " + JSON.stringify(options));
    const response: HttpResponse = await CapacitorHttp.post(options);
    console.log("Response Data: " + JSON.stringify(response));
    loading.dismiss();
    return response?.data;
  }
  async fetchExchangeRate() {
    const loading=await this.loading();
    const options = {
      url: 'https://starmpayservices.biclaos.com/StarMPayServices/exchangeRates',
      // url: this.baseUrl+ 'exchangeRates',
      data: { }
    };
    console.log("Request Data: " + JSON.stringify(options));
    const response: HttpResponse = await CapacitorHttp.post(options);
    console.log("Response Data: " + JSON.stringify(response));
    loading.dismiss();
    return response?.data;
  }
  async fetchInterestRate() {
    const loading=await this.loading();
    const options = {
      // url: this.baseUrl+ 'https://starmpayservices.biclaos.com/StarMPayServices/exchangeRates',
      url: this.baseUrl+ suburl.INTEREST_RATE,
      data: { }
    };
    console.log("Request Data: " + JSON.stringify(options));
    const response: HttpResponse = await CapacitorHttp.post(options);
    console.log("Response Data: " + JSON.stringify(response));
    loading.dismiss();
    return response?.data;
  }
  async fetchTxnFee() {
    const loading=await this.loading();
    const options = {
      // url: this.baseUrl+ 'https://starmpayservices.biclaos.com/StarMPayServices/exchangeRates',
      url: this.baseUrl+ suburl.TXN_FEE,
      data: { }
    };
    console.log("Request Data: " + JSON.stringify(options));
    const response: HttpResponse = await CapacitorHttp.post(options);
    console.log("Response Data: " + JSON.stringify(response));
    loading.dismiss();
    return response?.data;
  }

  async postTest(postData: any) {
    const options = {
      url: this.baseUrl + suburl.ATM_LIST,
      headers: { 'Authorization': this.authToken },
      data: postData,
    };

    const response: HttpResponse = await CapacitorHttp.post(options);
    return response;
  }
  // Capacitor http request ends here


  // angular mode httpClient
  getService() {
    const url = 'https://hub.dummyapis.com/delay?seconds=10';
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
    let msg: any;
    msg = {
      msg: error.error.message,
      code: error.status,
      respCode: error.error.respCode
    };
    console.log('Error Occured: ' + JSON.stringify(msg));
    return throwError(msg);
  }
  showToast(msg: string) {
    console.log('Error: ' + msg)
  }
}
