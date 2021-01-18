import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FoodModel } from '../_models/food.model';
import { MealModel } from '../_models/meal.model';
import { FoodCategoryModel } from '../_models/food-category.model';
import { FoodService } from '../_services/food.service';
import { FoodSelectorComponent } from './food-selector/food-selector.component';
import { identifierModuleUrl } from '@angular/compiler';
import { MealConfirmationComponent } from '../_popups/meal-confirmation/meal-confirmation.component';

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

	constructor(
		public dialogRef: MatDialogRef<FoodDiaryComponent>,
		public dialog: MatDialog,
		private foodService: FoodService,
		private cdr: ChangeDetectorRef,
	) {}

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
		if(this.meals.findIndex((item) => { return item.foodItem._id == favItem._id; }) < 0){
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
		const dialogRef = this.dialog.open(MealConfirmationComponent, {
			hasBackdrop: true,
			data: {
				meals: this.meals
			}
		});
	
		dialogRef.afterClosed().subscribe(result => {
			if(result) {
				this.saveMeal();
				this.dialogRef.close(true);
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
						console.log(res);
					});
                this.cdr.detectChanges();
			}
			console.log('The dialog was closed');
		});
	}

	saveMeal() {
		this.foodService.saveMeal({ meals: this.meals, mealType: this.selectedMealType })
			.subscribe(res => {
				console.log(res);
			});
	}
}
