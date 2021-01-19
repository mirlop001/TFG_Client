import { Component, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FoodDiaryComponent } from 'src/app/food-diary/food-diary.component';
import { ConfirmationModel } from '../../_models/confirmation.model';

@Component({
  selector: 'app-meal-confirmation',
  templateUrl: './meal-confirmation.component.html',
  styleUrls: ['./meal-confirmation.component.sass']
})
export class MealConfirmationComponent implements AfterViewInit {

	constructor(
		public dialogRef: MatDialogRef<FoodDiaryComponent>,
		@Inject(MAT_DIALOG_DATA) public data: ConfirmationModel
	) { }

	ngAfterViewInit(): void {
	}

	onNoClick(): void {
		this.dialogRef.close();
	}
}
