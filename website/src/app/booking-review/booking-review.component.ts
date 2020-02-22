import { Component, OnInit } from '@angular/core';
import { ManagePropertyService } from '../manage-product.service';
import { Property } from '../models/property';
import { Router } from "@angular/router";

@Component({
  selector: 'app-booking-review',
  templateUrl: './booking-review.component.html',
  styleUrls: ['./booking-review.component.scss']
})

export class BookingReviewComponent implements OnInit {

  property: Property;
  checkInDate: String;
  checkOutDate: String;
  email: String;
  constructor(private router: Router, private managePropertyService: ManagePropertyService) { }

  ngOnInit() {
    this.property = this.managePropertyService.property;
    this.checkInDate = this.managePropertyService.checkInDate;
    this.checkOutDate = this.managePropertyService.checkOutDate;
  }

  bookProperty = (propertyId: String) => {

    if (this.email === undefined || this.email === "") {
      alert("Please enter your email id");
      return;
    }

    this.managePropertyService.bookProperty(this.checkInDate, this.checkOutDate, propertyId, this.property.name, this.email).subscribe(response => {
      this.router.navigateByUrl(`/dashboard`);
    },
      // Error => { alert("failed while getting product details") }
    )

  }

}
