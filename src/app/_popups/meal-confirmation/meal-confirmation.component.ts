import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FoodDiaryComponent } from 'src/app/food-diary/food-diary.component';

@Component({
  selector: 'app-meal-confirmation',
  templateUrl: './meal-confirmation.component.html',
  styleUrls: ['./meal-confirmation.component.sass']
})
export class MealConfirmationComponent implements OnInit {

	constructor(
		public dialogRef: MatDialogRef<FoodDiaryComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { }

	ngOnInit(): void {
	}

	onNoClick(): void {
		this.dialogRef.close();
	}
}
