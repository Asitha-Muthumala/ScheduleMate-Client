import { Component, inject, TemplateRef } from '@angular/core';
import {
  NgbModal,
  NgbPaginationModule,
  NgbTimepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { BusinessNavbarComponent } from '../../../common/component/business-navbar/business-navbar.component';
import { InsideFooterComponent } from '../../../common/component/inside-footer/inside-footer.component';
import { FormsModule } from '@angular/forms';
import {
  ADD_SERVICE_MODEL,
  PACKAGE_MODEL,
} from '../../../utils/model/businessModel';
import { BusinessService } from '../business.service';
import { ToastService } from '../../../shared/toast.service';
import { NgFor } from '@angular/common';
import { CommonService } from '../../common/common.service';

@Component({
  selector: 'app-business-service',
  standalone: true,
  imports: [
    InsideFooterComponent,
    BusinessNavbarComponent,
    FormsModule,
    NgbPaginationModule,
    NgbTimepickerModule,
    NgFor,
  ],
  templateUrl: './business-service.component.html',
  styleUrl: './business-service.component.scss',
})
export class BusinessServiceComponent {
  private modalService = inject(NgbModal);

  page = 1;
  pageSize = 4;
  collectionSize = 0;
  serviceList: any = [];

  constructor(
    private businessService: BusinessService,
    private toastService: ToastService,
    private commonService: CommonService
  ) {}

  businessId: number | null = null;

  ngOnInit() {
    this.loadLocalStorageData();
  }

  loadLocalStorageData() {
    const idFromStorage = this.commonService.getItem("ID");
    if (idFromStorage) {
      this.businessId = parseInt(idFromStorage, 10);
      this.fetchBusinessServices();
    }
  }

  refreshServices() {
    this.fetchBusinessServices();
  }

  fetchBusinessServices() {
    if (this.businessId !== null) {
      this.businessService.getBusinessServices(this.businessId, this.page-1, this.pageSize).subscribe(
        (response) => {
          this.serviceList = response.body.content;
          this.collectionSize = response.body.totalElements;
        },
        (error) => {
          console.log('Error of fetching business services : ', error);
        }
      );
    } else {
      console.error("businessId not found.")
    }
  }

  // fetchBusinessPackages() {
  //   this.businessService.getPackages(this.businessId).subscribe(
  //     (response) => {
  //       this.packageList = response.body;
  //       console.log(this.packageList);
  //     },
  //     (error) => {
  //       console.log("Error of fetching business packages : ", error);
  //     }
  //   );
  // }

  serviceName: string = '';
  discountRate: string = '';
  description: string = '';
  conditions: string = '';
  startingTime = { hour: 9, minute: 0 };
  endingTime = { hour: 17, minute: 0 };
  imageURL: string =
    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/73/f7/09/caption.jpg?w=500&h=400&s=1';
  monday: boolean = false;
  tuesday: boolean = false;
  wednesday: boolean = false;
  thursday: boolean = false;
  friday: boolean = false;
  saturday: boolean = false;
  sunday: boolean = false;

  comboPackSelected: boolean = false;
  familyPackSelected: boolean = false;
  couplePackSelected: boolean = false;
  wfamilyPackSelected: boolean = false;

  availabilityArray: any[] = [];
  packageListArray: any[] = [];
  startTime: string = '';
  endTime: string = '';

  servicePayload: ADD_SERVICE_MODEL = {
    businessId: null,
    name: '',
    discountRate: null,
    description: '',
    conditions: '',
    serviceFrom: '',
    serviceTo: '',
    availability: null,
    packageList: null,
    imageUrl: '',
  };

  onePackage: PACKAGE_MODEL = {
    packageId: null,
    PackageName: '',
  };

  addBusinessService() {
    if (this.monday) {
      this.availabilityArray.push('MONDAY');
    }
    if (this.tuesday) {
      this.availabilityArray.push('TUESDAY');
    }
    if (this.wednesday) {
      this.availabilityArray.push('WEDNESDAY');
    }
    if (this.thursday) {
      this.availabilityArray.push('THURSDAY');
    }
    if (this.friday) {
      this.availabilityArray.push('FRIDAY');
    }
    if (this.saturday) {
      this.availabilityArray.push('SATURDAY');
    }
    if (this.sunday) {
      this.availabilityArray.push('SUNDAY');
    }

    if (this.comboPackSelected) {
      this.packageListArray.push(
        (this.onePackage = {
          packageId: 1,
          PackageName: 'combo',
        })
      );
    }

    if (this.familyPackSelected) {
      this.packageListArray.push(
        (this.onePackage = {
          packageId: 2,
          PackageName: 'budget',
        })
      );
    }

    if (this.couplePackSelected) {
      this.packageListArray.push(
        (this.onePackage = {
          packageId: 3,
          PackageName: 'couple',
        })
      );
    }

    if (this.wfamilyPackSelected) {
      this.packageListArray.push(
        (this.onePackage = {
          packageId: 4,
          PackageName: 'w family',
        })
      );
    }

    if (this.startingTime.hour < 10 && this.startingTime.minute < 10) {
      this.startTime =
        '0' + this.startingTime.hour + ':' + '0' + this.startingTime.minute;
    } else if (this.startingTime.hour < 10) {
      this.startTime =
        '0' + this.startingTime.hour + ':' + this.startingTime.minute;
    } else if (this.startingTime.minute < 10) {
      this.startTime =
        this.startingTime.hour + ':' + '0' + this.startingTime.minute;
    } else {
      this.startTime = this.startingTime.hour + ':' + this.startingTime.minute;
    }

    if (this.endingTime.hour < 10 && this.endingTime.minute < 10) {
      this.endTime =
        '0' + this.endingTime.hour + ':' + '0' + this.endingTime.minute;
    } else if (this.endingTime.hour < 10) {
      this.endTime = '0' + this.endingTime.hour + ':' + this.endingTime.minute;
    } else if (this.endingTime.minute < 10) {
      this.endTime = this.endingTime.hour + ':' + '0' + this.endingTime.minute;
    } else {
      this.endTime = this.endingTime.hour + ':' + this.endingTime.minute;
    }

    this.servicePayload = {
      businessId: this.businessId,
      name: this.serviceName,
      discountRate: Number(this.discountRate),
      description: this.description,
      conditions: this.conditions,
      serviceFrom: this.startTime,
      serviceTo: this.endTime,
      availability: this.availabilityArray,
      packageList: this.packageListArray,
      imageUrl: this.imageURL,
    };

    this.businessService.createService(this.servicePayload).subscribe(
      (response) => {
        if (response.status == 200) {
          this.clearBusinessService();
          this.showToastMessage(
            'Success!',
            ['Successfully Added Service.'],
            'White',
            '#21db21',
            'bi bi-check-circle-fill'
          );
        } else {
          this.showToastMessage(
            'Warning!',
            ['Internal Server Error.'],
            'White',
            '#FCC200',
            'bi bi-exclamation-triangle-fill'
          );
        }
      },
      (error) => {
        this.showToastMessage(
          'Warning!',
          ['Internal Server Error.'],
          'White',
          '#FCC200',
          'bi bi-exclamation-triangle-fill'
        );
        console.log('error : ', error);
      }
    );
  }

  clearBusinessService() {
    this.serviceName = '';
    this.discountRate = '';
    this.description = '';
    this.conditions = '';
    this.startingTime = { hour: 9, minute: 0 };
    this.endingTime = { hour: 17, minute: 0 };

    this.monday = false;
    this.tuesday = false;
    this.wednesday = false;
    this.thursday = false;
    this.friday = false;
    this.saturday = false;
    this.sunday = false;

    this.comboPackSelected = false;
    this.familyPackSelected = false;
    this.couplePackSelected = false;
    this.wfamilyPackSelected = false;

    this.availabilityArray = [];
    this.packageListArray = [];
  }

  openAddService(addService: TemplateRef<any>) {
    this.modalService.open(addService, {
      centered: true,
      size: 'xl',
      scrollable: true,
    });
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
