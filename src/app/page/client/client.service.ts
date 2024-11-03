import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ADD_BOOKING, BASE_URL, GET_SERVICE } from '../../utils/const';
import { BOOKING_MODEL } from '../../utils/model/clientModel';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }
  
  public getServiceDetail(serviceId: number): Observable<any> {
    return this.http.get<any>(`${BASE_URL}${GET_SERVICE}${serviceId}`);
  }

  public addBooking(payload: BOOKING_MODEL): Observable<any> {
    return this.http.post<any>(`${BASE_URL}${ADD_BOOKING}`, payload);
  }

  public getInBooking(clientId: number): Observable<any> {
    return this.http.get<any>(`${BASE_URL}/booking/clients/incoming/${clientId}`);
  }

  public getCmBooking(clientId: number): Observable<any> {
    return this.http.get<any>(`${BASE_URL}/booking/clients/completed/${clientId}`);
  }

  public getCanBooking(clientId: number): Observable<any> {
    return this.http.get<any>(`${BASE_URL}/booking/clients/cancelled/${clientId}`);
  }

}
