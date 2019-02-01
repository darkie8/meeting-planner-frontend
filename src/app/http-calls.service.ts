import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';

import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/zip';
import 'rxjs/add/operator/toPromise';
import { Cookie } from '../../node_modules/ng2-cookies/ng2-cookies';
@Injectable({
  providedIn: 'root'
})
export class HttpCallsService {
  private url = 'http://localhost:3000';

  constructor(public httpCall: HttpClient) { }

/**
 * getCountryName
 */
public getCountryName() {
  return this.httpCall.get(`${this.url}/api/v1/users/allcountry`);
}

/**
 * getCountryCode
 */
public getCountryCode(data) {
  return this.httpCall.post(`${this.url}/api/v1/users/countrycode`, {code: data});
}
  /**
  * setdatatoLocalStorage
 */
  public setdatatoLocalStorage = (data: any) => {
    localStorage.setItem('user_details', JSON.stringify(data));
  }

  public getdataLocalStorage = (data: string): any => {
    return localStorage.getItem(data);
  }
  /**
  * setdatatoSessionalStorage
 */
  public setdatatoSessionalStorage = (data: any) => {
    sessionStorage.setItem('user_details', JSON.stringify(data));
  }
  // registering
  // tslint:disable-next-line:max-line-length
  public registeringMethod(data: { firstName: any; lastName: any; countryCode: any; mobile: any; email: any; password: any; }): Observable<any> {
    const Body = {
      firstName: data.firstName,
      lastName: data.lastName,
      countryCode: data.countryCode,
      mobile: data.mobile,
      email: data.email,
      password: data.password
    };
    return this.httpCall.post(`${this.url}/api/v1/users/signup`, Body);
  }
  /**
   * verificationemail
   * */
  public verificationemail(data: any) {
    return this.httpCall.put(`${this.url}/api/v1/users/${data}/verify`, {});
  }

  /**
   * loginMethod
   */
  public loginmethod(data: any): Observable<any> {
    return this.httpCall.post(`${this.url}/api/v1/users/login`, data);
  }

  public logout(): Observable<any> {

    return this.httpCall.post(`${this.url}/api/v1/users/logout`, { 'authToken': Cookie.get('authToken') });

  } // end logout function
}
