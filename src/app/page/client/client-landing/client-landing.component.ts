import { Component } from '@angular/core';
import { BusinessNavbarComponent } from '../../../common/component/business-navbar/business-navbar.component';
import { InsideFooterComponent } from '../../../common/component/inside-footer/inside-footer.component';
import { ClientNavbarComponent } from '../../../common/component/client-navbar/client-navbar.component';
import { CommonService } from '../../common/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-landing',
  standalone: true,
  imports: [InsideFooterComponent, ClientNavbarComponent],
  templateUrl: './client-landing.component.html',
  styleUrl: './client-landing.component.scss'
})
export class ClientLandingComponent {

  constructor(private commonService: CommonService, private router: Router) {}

  clientName: string = "";

  ngOnInit() {
    this.loadLocalStorageData();
  }

  loadLocalStorageData() {
    const idFromStorage = this.commonService.getItem("NAME");
    if (idFromStorage) {
      this.clientName = idFromStorage;
    }
  }

  logout () {
    this.commonService.clear();
    this.router.navigate(['/login']);
  }

}
