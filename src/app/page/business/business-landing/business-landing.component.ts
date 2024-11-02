import { Component } from '@angular/core';
import { InsideFooterComponent } from '../../../common/component/inside-footer/inside-footer.component';
import { BusinessNavbarComponent } from '../../../common/component/business-navbar/business-navbar.component';
import { CommonService } from '../../common/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-business-landing',
  standalone: true,
  imports: [InsideFooterComponent, BusinessNavbarComponent],
  templateUrl: './business-landing.component.html',
  styleUrl: './business-landing.component.scss'
})

export class BusinessLandingComponent {

  constructor(private commonService: CommonService, private router: Router) {}

  businessName: string = "";

  ngOnInit() {
    this.loadLocalStorageData();
  }

  loadLocalStorageData() {
    const idFromStorage = this.commonService.getItem("NAME");
    if (idFromStorage) {
      this.businessName = idFromStorage;
    }
  }

  logout () {
    this.commonService.clear();
    this.router.navigate(['/login']);
  }

}
