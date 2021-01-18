import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FoodModel } from 'src/app/_models/food.model';

@Component({
	selector: 'app-food-selector',
	templateUrl: './food-selector.component.html',
	styleUrls: ['./food-selector.component.sass']
})
export class FoodSelectorComponent {
	nameFilter = "";
	options: string[] = ['One', 'Two', 'Three'];
	foodList: FoodModel[] = [];

	justFavourites: boolean;

	constructor(
		public dialogRef: MatDialogRef<FoodSelectorComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		data.foodList.forEach((cat) => {
			this.foodList = this.foodList.concat(cat.foodList);
		});

		this.justFavourites = data.justFavourites != null;
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	setFavourite(food) {
		food.isFavourite = !food.isFavourite;
	}

	selectFood(food) {
		if(!this.justFavourites)
			food.isSelected = !food.isSelected? true : false;
	}
}
