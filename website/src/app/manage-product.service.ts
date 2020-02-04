import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Property } from './models/property';

@Injectable({
  providedIn: 'root'
})
export class ManagePropertyService {
  constructor(private httpClient: HttpClient) { }

  getAllProperties(checkInDate: String, checkOutDate: String): Observable<Property[]> {
    return this.httpClient.post<Property[]>(`${environment.url}${environment.search_service}/`, {
      "check_in_date": checkInDate,
      "check_out_date": checkOutDate
    })
  }


  bookProperty(checkInDate: String, checkOutDate: String, propertyId: String): Observable<Property[]> {
    return this.httpClient.post<Property[]>(`${environment.url}${environment.booking_service}/`, {
      "check_in_date": checkInDate,
      "check_out_date": checkOutDate,
      "property_id": propertyId
    })
  }
}
