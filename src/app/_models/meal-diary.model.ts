import { Deserializable } from "../_heplers/deseriabizable";
import { MealModel } from './meal.model';

export class MealDiaryModel implements Deserializable {
    public _id: string;
    public mealType: string;
    public mealList: MealModel[];
    public totalHC: number = 0;

    deserialize(data: any) {
        Object.assign(this, data);
        this.mealList = data.mealList.map((meal) => {
            this.totalHC += meal.foodItem? (meal.foodItem.gramsPerCarbRatio * meal.grams)/100 : meal.grams;

            return new MealModel().deserialize(meal);
        });
        
        return this;
    }
}