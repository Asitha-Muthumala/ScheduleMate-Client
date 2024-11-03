import { Component } from '@angular/core';
import { InsideFooterComponent } from '../../../common/component/inside-footer/inside-footer.component';
import { BusinessNavbarComponent } from '../../../common/component/business-navbar/business-navbar.component';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbNavModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

const INCOMING: any[] = [
	{
		id: 'sbno1',
		sName: 'Lagoonria Adventure',
		package: 'Couple Package',
		cName: "kalana Mihiranga",
		scDateTime: "2024-12-1 09:00:00",
		status: true
	},
	{
		id: 'sbno5',
		sName: 'Lagoonria Evening',
		package: 'Family Package',
		cName: "Asiri Mihiranga",
		scDateTime: "2024-12-5 09:00:00",
		status: true
	},
	{
		id: 'sbno10',
		sName: 'Weekend Adventure',
		package: 'Combo Pack',
		cName: "Kasun Perera",
		scDateTime: "2024-12-12 09:00:00",
		status: false
	}
];

@Component({
  selector: 'app-business-tour',
  standalone: true,
  imports: [InsideFooterComponent, BusinessNavbarComponent, CommonModule, DecimalPipe, FormsModule, NgbTypeaheadModule, NgbPaginationModule, NgbNavModule],
  templateUrl: './business-tour.component.html',
  styleUrl: './business-tour.component.scss'
})
export class BusinessTourComponent {

	active = 1;

	page = 1;
	pageSize = 4;
	collectionSize = 5;
	incomingList: any[] = INCOMING;

	constructor() {
		this.refreshTours();
	}

	refreshTours() {
		console.log("Refresh Business Tours")
	}

}
