import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationModel } from 'src/app/_models/confirmation.model';

@Component({
  selector: 'app-diary-timeline',
  templateUrl: './diary-timeline.component.html',
  styleUrls: ['./diary-timeline.component.sass']
})
export class DiaryTimelineComponent implements OnInit {
	@Input() data: ConfirmationModel;
	
	constructor() { }

	ngOnInit(): void {
	}

}
