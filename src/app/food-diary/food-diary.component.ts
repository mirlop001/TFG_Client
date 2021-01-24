import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FoodModel } from '../_models/food.model';
import { MealModel } from '../_models/meal.model';
import { FoodCategoryModel } from '../_models/food-category.model';
import { FoodService } from '../_services/food.service';
import { FoodSelectorComponent } from './food-selector/food-selector.component';
import { MealConfirmationComponent } from '../_popups/meal-confirmation/meal-confirmation.component';
import { MealDiaryModel } from '../_models/meal-diary.model';
import { DiaryService } from '../_services/diary.service';
import { ActionResultModel } from '../_models/action-result.model';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-food-diary',
	templateUrl: './food-diary.component.html',
	  styleUrls: ['./food-diary.component.sass']
})
export class FoodDiaryComponent implements OnInit {
	foodList: FoodCategoryModel[];
	selectedMealType: string = "Desayuno";

	favourites: FoodModel[];
	meals: MealModel[] = [];

	requiredAction: ActionResultModel;

	constructor(
		public dialogRef: MatDialogRef<FoodDiaryComponent>,
		public dialog: MatDialog,
		private foodService: FoodService,
		private diaryService: DiaryService,
		private cdr: ChangeDetectorRef,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		this.requiredAction = data.requiredAction;
	}

	ngOnInit() {
		this.favourites = [];

		this.foodService.getFavourites()
		.subscribe((res) => {
			if(res) {
				res.forEach((fav) => {
					this.favourites.push(new FoodModel().deserialize(fav));
				});
				
                this.cdr.detectChanges();
			}
		});
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	addNewMeal(favItem){
		if(this.meals.findIndex((item) => { return item.foodItem && item.foodItem._id == favItem._id; }) < 0){
			this.meals.unshift(new MealModel().deserialize({ foodItem: favItem, grams: 0 }));
			this.meals = [...this.meals];
		}
	}

	removeMeal(meal) {
		let idx = this.meals.findIndex((m) => {
			return meal.id === m.id;
		});

		if(idx >= 0) {
			this.meals.splice(idx, 1);
			if(meal.foodItem)
				meal.foodItem.isSelected = false;
			
			this.meals = [...this.meals];
		}
	}

	addHC() {
		this.meals.unshift(new MealModel().deserialize({ grams: 0 }));
	}

	openConfirmation() {
		let newValue = new MealDiaryModel().deserialize({ mealList: this.meals, mealType: this.selectedMealType });

		const dialogRef = this.dialog.open(MealConfirmationComponent, {
			hasBackdrop: true,
			data: newValue
		});
	
		dialogRef.afterClosed().subscribe(result => {
			if(result) {
				this.diaryService.saveMeal({ meals: this.meals, mealType: this.selectedMealType, requiredAction: this.requiredAction })
					.subscribe(res => {
						this.dialogRef.close(new ActionResultModel().deserialize(res));
					});
			}
		});
	}
	
	openFoodList(justFav?): void {
			if(!this.foodList) {
				this.foodService.getFoodList()
					.subscribe((res) => {
						this.foodList = res.map((food) => {
							return new FoodCategoryModel().deserialize(food);
						});

						this.openModal(justFav);
					});

			} else {
				this.openModal(justFav);
			}
	}

	openModal(justFav): void {
		const dialogRef = this.dialog.open(FoodSelectorComponent, {
			hasBackdrop: true,
			data: {
				foodList: this.foodList,
				justFavourites: justFav
			},
			minWidth: '70vw',
			maxWidth: '60rem'
		});
	
		dialogRef.afterClosed().subscribe(result => {
			if(result) {
				this.favourites = result.filter((res) => { return res.isFavourite; });
				this.meals = result.filter((res) => { return res.isSelected; }).map((selected) => {
					return new MealModel().deserialize({foodItem: selected});
				});
				
				this.foodService.saveFavourites(this.favourites)
					.subscribe((res) => {
					});
                this.cdr.detectChanges();
			}
		});
	}
}
