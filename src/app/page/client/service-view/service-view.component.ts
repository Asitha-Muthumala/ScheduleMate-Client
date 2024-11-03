import { Component } from '@angular/core';
import { ClientNavbarComponent } from '../../../common/component/client-navbar/client-navbar.component';
import { InsideFooterComponent } from '../../../common/component/inside-footer/inside-footer.component';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from '../client.service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../common/common.service';
import { ToastService } from '../../../shared/toast.service';
import { BOOKING_MODEL } from '../../../utils/model/clientModel';

@Component({
  selector: 'app-service-view',
  standalone: true,
  imports: [
    InsideFooterComponent,
    ClientNavbarComponent,
    NgbTimepickerModule,
    FormsModule,
    JsonPipe,
    CommonModule,
  ],
  templateUrl: './service-view.component.html',
  styleUrl: './service-view.component.scss',
})
export class ServiceViewComponent {
  description: string = '';
  conditions: string = '';
  sStartTime: string = '';
  sEndTime: string = '';
  serviceDays: any[] = [];
  packageList: any[] = [];

  selectedPackage: number | null = null;
  selectedDate: string = '';
  startTime = { hour: 9, minute: 0 };
  sTime: string = '';
  note: string = '';
  isPaid: boolean = false;

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private toastService: ToastService
  ) {}

  sID: number | null = null;
  clientId: number | null = null;

  ngOnInit() {
    const idFromStorage = this.commonService.getItem('ID');
    if (idFromStorage) {
      this.clientId = parseInt(idFromStorage, 10);
    }

    this.route.paramMap.subscribe((params) => {
      let id = params.get('id');
      if (id != null) {
        this.sID = parseInt(id, 10);
        this.getSDetail();
      }
    });
  }

  getSDetail() {
    if (this.sID === null) return;

    this.clientService.getServiceDetail(this.sID).subscribe(
      (response) => {
        this.description = response.body.description;
        this.conditions = response.body.conditions;
        this.sStartTime = response.body.serviceFrom;
        this.sEndTime = response.body.serviceTo;
        this.serviceDays = response.body.availability;
        this.packageList = response.body.packageList;
      },
      (error) => {
        console.log('Error of getting service detail : ', error);
      }
    );
  }

  cBooking: BOOKING_MODEL = {
    clientNote: '',
    businessNote: '',
    isPaid: null,
    startingTime: '',
    bookingDate: '',
    clientId: null,
    serviceId: null,
    packageId: null,
  };

  createClientBooking() {
    if (this.startTime.hour < 10 && this.startTime.minute < 10) {
      this.sTime =
        '0' + this.startTime.hour + ':' + '0' + this.startTime.minute;
    } else if (this.startTime.hour < 10) {
      this.sTime = '0' + this.startTime.hour + ':' + this.startTime.minute;
    } else if (this.startTime.minute < 10) {
      this.sTime = this.startTime.hour + ':' + '0' + this.startTime.minute;
    } else {
      this.sTime = this.startTime.hour + ':' + this.startTime.minute;
    }

    this.cBooking = {
      clientNote: this.note,
      businessNote: '',
      isPaid: this.isPaid,
      startingTime: this.sTime,
      bookingDate: this.selectedDate,
      clientId: this.clientId,
      serviceId: this.sID,
      packageId: this.selectedPackage,
    };

    this.clientService.addBooking(this.cBooking).subscribe(
      (response) => {
        console.log(response);
        this.showToastMessage(
          'Success!',
          ['Booking Success.'],
          'White',
          '#21db21',
          'bi bi-check-circle-fill'
        );

        this.clearForm();
      },
      (error) => {
        this.showToastMessage(
          'Warning!',
          [error.error.message],
          'White',
          '#FCC200',
          'bi bi-exclamation-triangle-fill'
        );
        console.log('Error of creating Booking : ', error);
      }
    );
  }

  clearForm() {
    this.selectedPackage = null;
    this.selectedDate = '';
    this.startTime = { hour: 9, minute: 0 };
    this.sTime = '';
    this.note = '';
  }

  showToastMessage(
    header: string,
    body: string[],
    color: string,
    backgroundColor: string,
    icon: string
  ) {
    this.toastService.show(header, body, color, backgroundColor, icon);
  }
}
