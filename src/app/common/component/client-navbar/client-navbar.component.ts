import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../../page/common/common.service';

@Component({
  selector: 'app-client-navbar',
  standalone: true,
  imports: [],
  templateUrl: './client-navbar.component.html',
  styleUrl: './client-navbar.component.scss'
})
export class ClientNavbarComponent {

  constructor(private router: Router, private commonService: CommonService) {

  }

  logout () {
    this.commonService.clear();
    this.router.navigate(['/login']);
  }

}
