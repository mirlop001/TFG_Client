import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MealConfirmationComponent } from '../_popups/meal-confirmation/meal-confirmation.component';
import { DiaryService } from '../_services/diary.service';
import { InsulinTypeModel } from '../_models/insulin-types.model';
import { ActionResultModel } from '../_models/action-result.model';
import { ConfirmationModel } from '../_models/confirmation.model';

import * as moment from 'moment'; 

@Component({
  selector: 'app-insulin-diary',
  templateUrl: './insulin-diary.component.html',
  styleUrls: ['./insulin-diary.component.sass']
})
export class InsulinDiaryComponent implements OnInit {
	insulinTypes:InsulinTypeModel[];
	type: string ="option1";
	quantity: number;
  
	constructor(
		public dialogRef: MatDialogRef<InsulinDiaryComponent>,
		public dialog: MatDialog,
		public diaryService: DiaryService
  ) { }
  
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
		let newValue =  {
			type: this.type,
			quantity: this.quantity
		};

		let type = this.insulinTypes.find((ins) => { return ins._id == this.type; });

		let confInfo = new ConfirmationModel().deserialize({
			icon: 'colorize',
			time: moment().format("hh:mm"),
			title: "Insulina",
			values: [`${this.quantity}u. de insulina ${type.name}`]
		});

		const dialogRef = this.dialog.open(MealConfirmationComponent, {
			hasBackdrop: true,
			data: confInfo
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
