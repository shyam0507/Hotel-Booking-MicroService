import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { ManagePropertyService } from '../../manage-product.service';
import { Property } from '../../models/property';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  products = new Array<Property>();
  productsDisplyaArray = new Array();
  GridCount: number = 3;

  checkInDate: String = "2020-02-25";
  checkOutDate: String = "2020-02-26";

  constructor(private managePropertyService: ManagePropertyService) { }

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

  bookProperty = (propertyId: String) => {
    this.managePropertyService.bookProperty(this.checkInDate, this.checkOutDate, propertyId).subscribe(response => {
      this.getAllAvailableProperty();
    },
      // Error => { alert("failed while getting product details") }
    )
  }
}
