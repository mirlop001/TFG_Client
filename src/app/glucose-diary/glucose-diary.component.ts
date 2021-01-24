import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DiaryService } from '../_services/diary.service';
import { MealConfirmationComponent } from '../_popups/meal-confirmation/meal-confirmation.component';
import { ActionResultModel } from '../_models/action-result.model';
import { GlucoseModel } from '../_models/glucose.model';

@Component({
  selector: 'app-glucose-diary',
  templateUrl: './glucose-diary.component.html',
  styleUrls: ['./glucose-diary.component.sass']
})
export class GlucoseDiaryComponent {
	glucoseValue: number;
	comments: string;

	requiredAction: ActionResultModel;

	constructor(
		public dialogRef: MatDialogRef<GlucoseDiaryComponent>,
		public dialog: MatDialog,
		public diaryService: DiaryService,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		this.requiredAction = data.requiredAction;
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	openConfirmation() {
		let newValue = new GlucoseModel().deserialize({ glucose: this.glucoseValue, comments: this.comments });

		const dialogRef = this.dialog.open(MealConfirmationComponent, {
			hasBackdrop: true,
			data: newValue
		});
	
		dialogRef.afterClosed().subscribe(result => {
			if(result) {
				this.diaryService.saveGlucose({ glucoseData: newValue, requiredAction: this.requiredAction })
					.subscribe(res => {
						this.dialogRef.close(new ActionResultModel().deserialize(res));
					});
			}
		});
	}
}
