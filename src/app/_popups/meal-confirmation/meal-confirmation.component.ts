import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationModel } from '../../_models/confirmation.model';

@Component({
  selector: 'app-meal-confirmation',
  templateUrl: './meal-confirmation.component.html',
  styleUrls: ['./meal-confirmation.component.sass']
})
export class MealConfirmationComponent {

	constructor(
		public dialogRef: MatDialogRef<MealConfirmationComponent>,
		@Inject(MAT_DIALOG_DATA) public data: ConfirmationModel
	) { }
	onNoClick(): void {
		this.dialogRef.close();
	}
}
