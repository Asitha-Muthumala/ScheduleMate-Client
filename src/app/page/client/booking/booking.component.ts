import { Component } from '@angular/core';
import { ClientNavbarComponent } from '../../../common/component/client-navbar/client-navbar.component';
import { InsideFooterComponent } from '../../../common/component/inside-footer/inside-footer.component';
import { NgbNavModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [ClientNavbarComponent, InsideFooterComponent, NgbPaginationModule, FormsModule, CommonModule, NgbNavModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent {

  active = 1;
  page = 1;
  pageSize = 4;
  collectionSize = 0;
  serviceList: any = [];

  refreshCountries() {
    console.log("Hii")
  }

}
