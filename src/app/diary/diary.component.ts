import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GlucoseDiaryComponent } from '../glucose-diary/glucose-diary.component';
import { DiaryService } from '../_services/diary.service';
import { DiaryModel } from 'src/app/_models/diary.model';

import * as moment from 'moment'; 
import { InsulinModel } from '../_models/insulin.model';
import { GlucoseModel } from '../_models/glucose.model';
import { MealDiaryModel } from '../_models/meal-diary.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.sass']
})
export class DiaryComponent implements OnInit{
	_types: any = { insulin: 1, glucose: 2, meal: 3};

	date: Date = new Date();
	entries: DiaryModel[] = [];

	constructor(
		public diaryService: DiaryService,
		private cdr: ChangeDetectorRef, 
		private router: Router
	) { }
	
	ngOnInit() {
		this.loadDiary(this.date);
	}

	loadDiary(newDate:Date) {
		let date = moment(newDate).format("YYYY-MM-DD");
		this.entries = [];

		this.diaryService.getInsulinDiary(date)
			.subscribe((insulinDiaryResponse) => {
				if(insulinDiaryResponse){
					insulinDiaryResponse.forEach((iDiary) => {
						this.entries.push(new DiaryModel().deserialize({
							type: this._types.insulin,
							date: iDiary.createdAt,
							value: new InsulinModel().deserialize(iDiary)
						}));
					});
				}

				this.diaryService.getGlucoseDiary(date)
					.subscribe((glucoseDiaryResponse) => {
						if(glucoseDiaryResponse){
							glucoseDiaryResponse.forEach((gDiary) => {
								this.entries.push(new DiaryModel().deserialize({
									type: this._types.glucose,
									date: gDiary.createdAt,
									value: new GlucoseModel().deserialize(gDiary)
								}));
							});
						}

						this.diaryService.getMealDiary(date)
							.subscribe((mealDiaryResponse) => {
								if(mealDiaryResponse) {
									mealDiaryResponse.forEach((mDiary) => {
										this.entries.push(new DiaryModel().deserialize({
											type: this._types.meal,
											date: mDiary.createdAt,
											value: new MealDiaryModel().deserialize(mDiary)
										}));
									});
								}

							this.entries = this.entries.sort((a, b) => { return moment(a.date).diff(moment(b.date)); })
							this.cdr.detectChanges();
						});
					});
			});
	}

	goHome() {
		this.router.navigate(['home']);
	}

}
