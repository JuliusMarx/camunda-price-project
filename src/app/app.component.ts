import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {RestService} from './Service/rest.service';
import {CustomerModel} from './Model/customer.model';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'coffee-project';
  restService = inject(RestService);
  data: CustomerModel = {
    customer: 0,
    applicationNumber: '',
    payload: ''
  };
  getData: string = '';

  getCustomerData() {
    this.restService.getCustomer().subscribe({
      next: value => {
        value = this.getData;
      }
    })
  }

  postCustomerData() {
    const customer = {
      customer: Math.floor(Math.random() * 5),
      applicationNumber: '123',
      payload: '{}'
    }
    this.data = customer;

    this.restService.addCustomer(customer).subscribe({
      next: (response) => {
        console.log('Response ', response)
        this.data = response;
      },
      error: (err) => {
        console.log('Error ', err)
      }
    })
  }
}
