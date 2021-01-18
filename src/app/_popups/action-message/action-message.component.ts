import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FoodDiaryComponent } from 'src/app/food-diary/food-diary.component';

@Component({
  selector: 'app-action-message',
  templateUrl: './action-message.component.html',
  styleUrls: ['./action-message.component.sass']
})
export class ActionMessageComponent implements OnInit {
	currentSlide: string = "prize";
	title: string = "¡Muy bien!";

	constructor(
		public dialogRef: MatDialogRef<FoodDiaryComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { }

	ngOnInit(): void {
	}

	showNextSlide() {
		if(this.data.isAction)
			this.currentSlide = "action-response";

		else {
			this.dialogRef.close();
		}
	}

}
