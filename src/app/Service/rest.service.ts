import {CustomerModel} from '../Model/customer.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  constructor(private http: HttpClient) {}

  private url: string = 'http://localhost:8080';
  private headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

  addCustomer(customer: CustomerModel){
    return this.http.post<CustomerModel>(this.url, customer, {headers: this.headers})
  }

  getCustomer() {
    return this.http.get(this.url+'/ping')
  }
}
