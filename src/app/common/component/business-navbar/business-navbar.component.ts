import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../../page/common/common.service';

@Component({
  selector: 'app-business-navbar',
  standalone: true,
  imports: [],
  templateUrl: './business-navbar.component.html',
  styleUrl: './business-navbar.component.scss'
})
export class BusinessNavbarComponent {

  constructor(private router: Router, private commonService: CommonService) {

  }

  logout () {
    this.commonService.clear();
    this.router.navigate(['/login']);
  }

}
