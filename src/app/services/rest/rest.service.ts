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
  private qrCode:any;
  authToken: any;
  private _data: any;
  private deviceDetail: any;
  appStoreUrl = suburl.APP_STORE_URL;
  playStoreUrl = suburl.PLAY_STORE_URL;
  tcUrl = suburl.TNC_URL;
  baseUrl = environment.baseUrl;
  userDetail:any={};
  constructor(private httpClient: HttpClient, private popoverCtrl: PopoverController) { }
  public setQrCode(qrCode:any) {
    this.qrCode=qrCode;
  }
  public getQrCode() {
    return this.qrCode;
  }
  public setData(data: any) {
    this._data = data;
  }
  public getData() {
    return this._data;
  }
  public getDeviceDetail() {
    return this.deviceDetail;
  }
  public setDeviceDetail(data: any) {
    this.deviceDetail = data;
  }
  getTermsAndCondition() {
    return suburl.TNC_URL;
  }
  async closeLoader() {
    try {
      this.popoverCtrl.dismiss().catch(err => {
        console.log('Cannot close loading popover')
      });
    } catch (err) {
      console.log('Loading Already closed');
      console.log(err);
    }
  }
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
    const loading = await this.loading();
    const options = {
      url: this.baseUrl + suburl.ATM_LIST,
      headers: { 'Content-Type': 'application/json' },
      data: {}
    };
    console.log("Request Data: " + JSON.stringify(options));
    const response: HttpResponse = await CapacitorHttp.post(options);
    console.log("Response Data: " + JSON.stringify(response));
    loading.dismiss();
    return response?.data;
  }
  async fetchExchangeRate() {
    const loading = await this.loading();
    const options = {
      url: 'https://starmpayservices.biclaos.com/StarMPayServices/exchangeRates',
      // url: this.baseUrl+ 'exchangeRates',
      headers: { 'Content-Type': 'application/json' },
      data: {}
    };
    console.log("Request Data: " + JSON.stringify(options));
    const response: HttpResponse = await CapacitorHttp.post(options);
    console.log("Response Data: " + JSON.stringify(response));
    loading.dismiss();
    return response?.data;
  }
  async fetchInterestRate() {
    const loading = await this.loading();
    const options = {
      url: this.baseUrl + suburl.INTEREST_RATE,
      headers: { 'Content-Type': 'application/json' },
      data: {}
    };
    console.log("Request Data: " + JSON.stringify(options));
    const response: HttpResponse = await CapacitorHttp.post(options);
    console.log("Response Data: " + JSON.stringify(response));
    loading.dismiss();
    return response?.data;
  }
  async fetchTxnFee() {
    const loading = await this.loading();
    const options = {
      url: this.baseUrl + suburl.TXN_FEE,
      headers: { 'Content-Type': 'application/json' },
      data: {}
    };
    console.log("Request Data: " + JSON.stringify(options));
    const response: HttpResponse = await CapacitorHttp.post(options);
    console.log("Response Data: " + JSON.stringify(response));
    loading.dismiss();
    return response?.data;
  }
  async deviceInfoStartTime(postData: any) {
    const options = {
      url: this.baseUrl + suburl.DEVICE_INFO,
      headers: { 'Content-Type': 'application/json' },
      data: postData
    };
    console.log("Request Data: " + JSON.stringify(options));
    const response: HttpResponse = await CapacitorHttp.post(options);
    console.log("Response Data: " + JSON.stringify(response));
    return response?.data;
  }
  async appRelease(postData: any) {
    const options = {
      url: this.baseUrl + suburl.APP_RELEASE,
      headers: { 'Content-Type': 'application/json' },
      data: postData
    };
    console.log("Request Data: " + JSON.stringify(options));
    const response: HttpResponse = await CapacitorHttp.post(options);
    console.log("Response Data: " + JSON.stringify(response));
    return response?.data;
  }
  async deviceInfo(postData: any) {
    const loading = await this.loading();
    const options = {
      url: this.baseUrl + suburl.DEVICE_INFO,
      headers: { 'Content-Type': 'application/json' },
      data: postData
    };
    console.log("Request Data: " + JSON.stringify(options));
    const response: HttpResponse = await CapacitorHttp.post(options);
    console.log("Response Data: " + JSON.stringify(response));
    loading.dismiss();
    return response?.data;
  }
  async validateMobile(postData: any) {
    const loading = await this.loading();
    const options = {
      url: this.baseUrl + suburl.VALIDATE_MOBILE,
      headers: { 'Content-Type': 'application/json' },
      data: postData
    };
    console.log("Request Data: " + JSON.stringify(options));
    const response: HttpResponse = await CapacitorHttp.post(options);
    console.log("Response Data: " + JSON.stringify(response?.data));
    loading.dismiss();
    return response?.data;
  }
  async verifyOtp(postData: any) {
    postData.TOKEN=this.authToken;
    const loading = await this.loading();
    const options = {
      url: this.baseUrl + suburl.VERIFY_OTP,
      headers: { 'Content-Type': 'application/json' },
      data: postData
    };
    console.log("Request Data: " + JSON.stringify(options));
    const response: HttpResponse = await CapacitorHttp.post(options);
    console.log("Response Data: " + JSON.stringify(response.data));
    loading.dismiss();
    return response?.data;
  }
  async checkUserName(postData: any) {
    const loading = await this.loading();
    const options = {
      url: this.baseUrl + suburl.CHECK_USER_NAME,
      headers: { 'Content-Type': 'application/json' },
      data: postData
    };
    console.log("Request Data: " + JSON.stringify(options));
    const response: HttpResponse = await CapacitorHttp.post(options);
    console.log("Response Data: " + JSON.stringify(response.data));
    loading.dismiss();
    return response?.data;
  }

  async registerUser(postData: any) {
    postData.SUBURL = suburl.REGISTER_USER;
    const loading = await this.loading();
    const options = {
      url: this.baseUrl + suburl.POST_SERVICE_WITH_DATA,
      headers: { 'Content-Type': 'application/json' },
      data: postData
    };
    console.log("Request Data: " + JSON.stringify(options));
    const response: HttpResponse = await CapacitorHttp.post(options);
    console.log("Response Data: " + JSON.stringify(response.data));
    loading.dismiss();
    return response?.data;
  }
  // Login User
  async loginUser(postData: any) {
    const loading = await this.loading();
    const options = {
      url: this.baseUrl + suburl.LOGIN_USER,
      headers: { 'Content-Type': 'application/json' },
      data: postData
    };
    console.log("Request Data: " + JSON.stringify(options));
    const response: HttpResponse = await CapacitorHttp.post(options);
    console.log("Response Data: " + JSON.stringify(response.data));
    loading.dismiss();
    return response?.data;
  }
  async forgotMpin(postData: any) {
    const loading = await this.loading();
    const options = {
      url: this.baseUrl + suburl.FORGOT_PIN,
      headers: { 'Content-Type': 'application/json' },
      data: postData
    };
    console.log("Request Data: " + JSON.stringify(options));
    const response: HttpResponse = await CapacitorHttp.post(options);
    console.log("Response Data: " + JSON.stringify(response.data));
    loading.dismiss();
    return response?.data;
  }
  async resetMpin(postData: any) {
    const loading = await this.loading();
    const options = {
      url: this.baseUrl + suburl.RESET_PIN,
      headers: { 'Content-Type': 'application/json' },
      data: postData
    };
    console.log("Request Data: " + JSON.stringify(options));
    const response: HttpResponse = await CapacitorHttp.post(options);
    console.log("Response Data: " + JSON.stringify(response.data));
    loading.dismiss();
    return response?.data;
  }

  // Post Login Services, Need token in each Service
  async getUserInfo(postData: any) {
    postData.TOKEN=this.authToken;
    const loading = await this.loading();
    const options = {
      url: this.baseUrl + suburl.USER_INFO,
      headers: { 'Content-Type': 'application/json' },
      data: postData
    };
    console.log("Request Data: " + JSON.stringify(options));
    const response: HttpResponse = await CapacitorHttp.post(options);
    console.log("Response Data: " + JSON.stringify(response.data));
    loading.dismiss();
    return response?.data;
  }

  async walletInfo(postData: any) {
    postData.TOKEN=this.authToken;
    postData.SUBURL= suburl.WALLET_INFO;
    // const loading = await this.loading();
    const options = {
      url: this.baseUrl + suburl.POST_SERVICE_WITH_DATA,
      headers: { 'Content-Type': 'application/json' },
      data: postData
    };
    console.log("Request Data: " + JSON.stringify(options));
    const response: HttpResponse = await CapacitorHttp.post(options);
    console.log("Response Data: " + JSON.stringify(response.data));
    // loading.dismiss();
    return response?.data;
  }
  async generateQr(postData: any) {
    postData.TOKEN=this.authToken;
    postData.SUBURL= suburl.GENERATE_QR;
    // const loading = await this.loading();
    const options = {
      url: this.baseUrl + suburl.POST_SERVICE_WITH_DATA,
      headers: { 'Content-Type': 'application/json' },
      data: postData
    };
    console.log("Request Data: " + JSON.stringify(options));
    const response: HttpResponse = await CapacitorHttp.post(options);
    console.log("Response Data: " + JSON.stringify(response.data));
    // loading.dismiss();
    return response?.data;
  }

  async ekycRegister(postData: any) {
    postData.SESSIONID=this.authToken;
    postData.SUBURL= suburl.EKYC_REGISTER;
    const options = {
      url: this.baseUrl + suburl.ULOAD_EKYC_DOC,
      headers: { 'Content-Type': 'application/json' },
      data: postData
    };
    console.log("Request Data: " + JSON.stringify(options));
    const response: HttpResponse = await CapacitorHttp.post(options);
    console.log("Response Data: " + JSON.stringify(response.data));
    return response?.data;
  }
  async verifyCredentials(postData: any) {
    const loading = await this.loading();
    postData.TOKEN=this.authToken;
    postData.SUBURL= suburl.VERIFY_CREDENTIALS;
    const options = {
      url: this.baseUrl + suburl.POST_SERVICE_WITH_DATA,
      headers: { 'Content-Type': 'application/json' },
      data: postData
    };
    console.log("Request Data: " + JSON.stringify(options));
    const response: HttpResponse = await CapacitorHttp.post(options);
    console.log("Response Data: " + JSON.stringify(response.data));
    loading.dismiss();
    return response?.data;
  }
  async fetchLinkedAccount() {
    const postData:any= {
      TOKEN:this.authToken
    };
    const loading = await this.loading();
    const options = {
      url: this.baseUrl + suburl.LINKED_ACCOUNT_LIST,
      headers: { 'Content-Type': 'application/json' },
      data: postData
    };
    console.log("Request Data: " + JSON.stringify(options));
    const response: HttpResponse = await CapacitorHttp.post(options);
    console.log("Response Data: " + JSON.stringify(response.data));
    loading.dismiss();
    return response?.data;
  }
  async getAccountDetails(postData:any) {
    const loading = await this.loading();
    postData.TOKEN=this.authToken
    const options = {
      url: this.baseUrl + suburl.ACCOUNT_DETAILS,
      headers: { 'Content-Type': 'application/json' },
      data: postData
    };
    console.log("Request Data: " + JSON.stringify(options));
    const response: HttpResponse = await CapacitorHttp.post(options);
    console.log("Response Data: " + JSON.stringify(response.data));
    loading.dismiss();
    return response?.data;
  }
  async getAccountBalance(accNum: string) {
    const loading = await this.loading();
    const postData:any = {
      defacc: accNum,
      TOKEN:this.authToken
    };
    const options = {
      url: this.baseUrl + suburl.BALANCE_ENQUIRY,
      headers: { 'Content-Type': 'application/json' },
      data: postData
    };
    console.log("Request Data: " + JSON.stringify(options));
    const response: HttpResponse = await CapacitorHttp.post(options);
    console.log("Response Data: " + JSON.stringify(response.data));
    loading.dismiss();
    return response?.data;
  }
  async fetchMiniStatement(accNum: string) {
    const loading = await this.loading();
    const postData:any = {
      accountNO: accNum,
      TOKEN:this.authToken
    };
    const options = {
      url: this.baseUrl + suburl.MINI_STATEMENT,
      headers: { 'Content-Type': 'application/json' },
      data: postData
    };
    console.log("Request Data: " + JSON.stringify(options));
    const response: HttpResponse = await CapacitorHttp.post(options);
    console.log("Response Data: " + JSON.stringify(response.data));
    loading.dismiss();
    return response?.data;
  }

  async fetchProvinceList(deviceId:string) {
    const loading = await this.loading();
    const postData:any = {
      getUrl: suburl.PROVINCE_LIST,
			postData: {
        TOKEN:this.authToken,
        deviceId: deviceId
			}
    };
    const options = {
      url: this.baseUrl + suburl.GET_SERVICE,
      headers: { 'Content-Type': 'application/json' },
      data: postData
    };
    console.log("Request Data: " + JSON.stringify(options));
    const response: HttpResponse = await CapacitorHttp.post(options);
    console.log("Response Data: " + JSON.stringify(response.data));
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
