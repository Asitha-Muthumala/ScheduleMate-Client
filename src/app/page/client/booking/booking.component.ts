import { Component } from '@angular/core';
import { ClientNavbarComponent } from '../../../common/component/client-navbar/client-navbar.component';
import { InsideFooterComponent } from '../../../common/component/inside-footer/inside-footer.component';
import { NgbNavModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientService } from '../client.service';
import { CommonService } from '../../common/common.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    ClientNavbarComponent,
    InsideFooterComponent,
    NgbPaginationModule,
    FormsModule,
    CommonModule,
    NgbNavModule,
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
})
export class BookingComponent {
  active = 1;
  page = 1;
  pageSize = 4;
  collectionSize = 0;

  refreshBooking() {
    console.log('test');
  }

  clientId: number | null = null;
  
  constructor(
    private clientService: ClientService,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.loadLocalStorageData();
  }

  loadLocalStorageData() {
    const idFromStorage = this.commonService.getItem('ID');
    if (idFromStorage) {
      this.clientId = parseInt(idFromStorage, 10);
      this.fetchIncomingBooking();
      this.fetchCompletedBooking();
      this.fetchCancelledBooking();
    }
  }

  incomingList: any[] = [];

  fetchIncomingBooking() {
    if (this.clientId !== null) {
      this.clientService
        .getInBooking(this.clientId)
        .subscribe(
          (response) => {
            this.incomingList = response.body;
          },
          (error) => {
            console.log('Error of fetching incoming booking : ', error);
          }
        );
    } else {
      console.error('clientId not found.');
    }
  }

  completedList: any[] = [];

  fetchCompletedBooking() {
    if (this.clientId !== null) {
      this.clientService
        .getCmBooking(this.clientId)
        .subscribe(
          (response) => {
            this.completedList = response.body;
          },
          (error) => {
            console.log('Error of fetching incoming booking : ', error);
          }
        );
    } else {
      console.error('clientId not found.');
    }
  }

  cancelledList: any[] = [];

  fetchCancelledBooking() {
    if (this.clientId !== null) {
      this.clientService
        .getCanBooking(this.clientId)
        .subscribe(
          (response) => {
            this.cancelledList = response.body;
          },
          (error) => {
            console.log('Error of fetching cancelled booking : ', error);
          }
        );
    } else {
      console.error('clientId not found.');
    }
  }
}
