import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MealConfirmationComponent } from '../_popups/meal-confirmation/meal-confirmation.component';
import { DiaryService } from '../_services/diary.service';
import { InsulinTypeModel } from '../_models/insulin-types.model';
import { ActionResultModel } from '../_models/action-result.model';
import { InsulinModel } from '../_models/insulin.model';

@Component({
  selector: 'app-insulin-diary',
  templateUrl: './insulin-diary.component.html',
  styleUrls: ['./insulin-diary.component.sass']
})
export class InsulinDiaryComponent implements OnInit {
	insulinTypes:InsulinTypeModel[];
	type: string ="option1";
	quantity: number;
  
	requiredAction: ActionResultModel;

	constructor(
		public dialogRef: MatDialogRef<InsulinDiaryComponent>,
		public dialog: MatDialog,
		public diaryService: DiaryService,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		this.requiredAction = data.requiredAction;
	 }
  
 	ngOnInit() {
		this.diaryService.getInsulinTypes()
			.subscribe((response) => {
				this.insulinTypes = response.map((type) => {
					return new InsulinTypeModel().deserialize(type);
				});

				this.type = this.insulinTypes[0]._id;
			});
  	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	openConfirmation() {
		let type = this.insulinTypes.find((ins) => { return ins._id == this.type; });

		let newValue =  new InsulinModel().deserialize({
			type: this.type,
			typeName: type.name,
			quantity: this.quantity,
			requiredAction: this.requiredAction
		});

		const dialogRef = this.dialog.open(MealConfirmationComponent, {
			hasBackdrop: true,
			data: newValue
		});
	
		dialogRef.afterClosed().subscribe(result => {
			if(result) {
				this.diaryService.saveInsulin(newValue)
					.subscribe(res => {
						this.dialogRef.close(new ActionResultModel().deserialize(res));
					});
			}
		});
	}
}
