import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationModel } from 'src/app/_models/confirmation.model';
import { GlucoseModel } from 'src/app/_models/glucose.model';
import { InsulinModel } from 'src/app/_models/insulin.model';
import { MealDiaryModel } from 'src/app/_models/meal-diary.model';
import * as moment from 'moment'; 

@Component({
  selector: 'app-diary-timeline',
  templateUrl: './diary-timeline.component.html',
  styleUrls: ['./diary-timeline.component.sass']
})
export class DiaryTimelineComponent implements OnInit {
	@Input() data: any;
	info: ConfirmationModel;
	
	constructor() { }

	ngOnInit(): void {

		if(this.data instanceof GlucoseModel){
			this.info = new ConfirmationModel().deserialize({
				icon: 'opacity',
				time: moment(this.data.createdAt).format("hh:mm"),
				title: "Resultados glucemia",
				values: [`${this.data.glucose}mg/dL`, this.data.comments]
			});

		} else if(this.data instanceof InsulinModel){
			this.info = new ConfirmationModel().deserialize({
				icon: 'colorize',
				time: moment(this.data.createdAt).format("hh:mm"),
				title: "Insulina",
				values: [`${this.data.quantity}u. de insulina`]
			});

		} else if (this.data instanceof MealDiaryModel){
			let totalHC = 0;
			let messages = [];

			this.data.mealList.forEach((meal) => {
				totalHC += meal.HCGrams;
				let mealName = meal.foodItem? `${meal.foodItem.name} -`: '';

				messages.push(`${mealName} ${meal.HCGrams}g HC`);
			});
			
			this.info = new ConfirmationModel().deserialize({
				icon: 'local_dining',
				time: moment(this.data.mealList[0]?.createdAt).format("hh:mm"),
				title: `${this.data.mealType} - ${totalHC} de HC`,
				values: messages
			});
		}
	}

}
