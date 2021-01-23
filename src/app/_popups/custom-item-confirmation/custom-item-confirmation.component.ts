import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-custom-item-confirmation',
  templateUrl: './custom-item-confirmation.component.html',
  styleUrls: ['./custom-item-confirmation.component.sass']
})
export class CustomItemConfirmationComponent {
	constructor(
		public dialogRef: MatDialogRef<CustomItemConfirmationComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  
	onNoClick(): void {
		this.dialogRef.close();
	}
}
