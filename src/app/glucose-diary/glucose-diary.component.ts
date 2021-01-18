import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DiaryService } from '../_services/diary.service';
import { MealConfirmationComponent } from '../_popups/meal-confirmation/meal-confirmation.component';
import { ActionResultModel } from '../_models/action-result.model';

@Component({
  selector: 'app-glucose-diary',
  templateUrl: './glucose-diary.component.html',
  styleUrls: ['./glucose-diary.component.sass']
})
export class GlucoseDiaryComponent {
	glucoseValue: number;
	comments: string;

	constructor(
		public dialogRef: MatDialogRef<GlucoseDiaryComponent>,
		public dialog: MatDialog,
		public diaryService: DiaryService
	) { }

	onNoClick(): void {
		this.dialogRef.close();
	}

	openConfirmation() {
		const dialogRef = this.dialog.open(MealConfirmationComponent, {
			hasBackdrop: true,
			data: {
				glucose: this.glucoseValue,
				comments: this.comments
			}
		});
	
		dialogRef.afterClosed().subscribe(result => {
			if(result) {
				this.diaryService.saveGlucose({ glucose: this.glucoseValue, comments: this.comments })
					.subscribe(res => {
						this.dialogRef.close(new ActionResultModel().deserialize(res));
					});
			}
		});
	}
}
