import { Component, inject, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../common/component/footer/footer.component';
import { NavbarComponent } from '../../../common/component/navbar/navbar.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../common.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [FooterComponent, NavbarComponent, CommonModule, FormsModule, RouterModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})

export class LandingComponent {

  private modalService = inject(NgbModal);

  constructor(private commonService: CommonService) {}

  ngOnInit() {
    this.getSFeed();
  }

  searchKey: string = "";
  serviceFeedList: any[] = [];
  isEmptyBlockEnabled: boolean = false;

  getSFeed() {
    this.commonService.getServiceFeed(this.searchKey).subscribe(
      (response) => {

        this.serviceFeedList = response.body;

        if (this.serviceFeedList.length == 0) {
          this.isEmptyBlockEnabled = true;
        } else {
          this.isEmptyBlockEnabled = false;
        }

      },
      (error) => {
        console.log('Error of getting business feed : ', error);
      }
    );
  }

  openFilterFeedModal(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true });
  }
}
