import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FoodDiaryComponent } from 'src/app/food-diary/food-diary.component';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.sass']
})
export class NotificationComponent {
  
  constructor(
		public dialogRef: MatDialogRef<FoodDiaryComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { }

	onNoClick(): void {
		this.dialogRef.close();
	}
}
