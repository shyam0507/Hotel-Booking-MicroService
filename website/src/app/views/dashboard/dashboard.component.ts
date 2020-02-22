import { Component, OnInit, ViewChild } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { ManagePropertyService } from '../../manage-product.service';
import { Property } from '../../models/property';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router } from "@angular/router";

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('myModal', { static: false }) public myModal: ModalDirective;

  products = new Array<Property>();
  productsDisplyaArray = new Array();
  GridCount: number = 3;

  checkInDate: String = "2020-06-28";
  checkOutDate: String = "2020-06-29";
  userId: String = "5e3af72ba4dac449ec112b2a";
  userEmail: String = "shyam432158@gmail.com"

  constructor(private router: Router, private managePropertyService: ManagePropertyService) {

  }

  ngOnInit(): void {
    this.getAllAvailableProperty();
  }

  getAllAvailableProperty = () => {
    this.products = [];
    this.productsDisplyaArray = [];

    this.managePropertyService.getAllProperties(this.checkInDate, this.checkOutDate).subscribe(response => {
      this.products = response.map(item => {
        return new Property(
          item['_source'].property_id,
          item['_source'].name,
          item['_source'].image,
          item['_source'].tagline
        );
      });

      // for (let i = 0; i < this.products.length; i = i + 3) {
      while (this.products.length > 0) {
        // this.productsDisplyaArray[0] = [this.products[i], this.products[i + 1], this.products[i + 2]]
        // console.log(this.products.splice(i, this.GridCount))
        this.productsDisplyaArray.push(this.products.splice(0, this.products.length > this.GridCount ? this.GridCount : this.products.length))
      }

      console.log(this.products.length)
      console.log(this.productsDisplyaArray)

    },
      // Error => { alert("failed while getting product details") }
    )
  }

  bookProperty = (propertyId: String, index1: number, index2: number) => {

    // this.managePropertyService.bookProperty(this.checkInDate, this.checkOutDate, propertyId, this.userId).subscribe(response => {
    //   this.getAllAvailableProperty();
    // },
    //   // Error => { alert("failed while getting product details") }
    // )
    console.log(index1)
    console.log(index2)
    console.log(this.products)
    this.managePropertyService.property = this.productsDisplyaArray[index1][index2];
    this.managePropertyService.checkInDate = this.checkInDate;
    this.managePropertyService.checkOutDate = this.checkOutDate;

    console.log(this.managePropertyService.property)

    this.router.navigateByUrl(`/booking-review`);

  }

  startBooking = () => {
    // if (this.userEmail === undefined || this.userEmail === "") {
    //   alert("Please enter your email id");
    //   return;
    // }

    alert("Inside start Booking")

    this.router.navigateByUrl(`/booking-review`);

    //get user id by calling the api
  }
}
