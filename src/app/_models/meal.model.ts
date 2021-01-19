import { FoodModel } from './food.model';
import { Deserializable } from "../_heplers/deseriabizable";
import { computed } from 'mobx-angular';
import * as uuid from 'uuid';

export class MealModel implements Deserializable {
    public _id: string;
    public id: string;
    public foodItem: FoodModel;
    public grams:number = 0;
    public createdAt: Date;

    deserialize(data: any) {
        Object.assign(this, data);

        this.id = uuid.v4();
        this._id = data._id;
        return this;
    }

    @computed get HCGrams () {
        return this.foodItem? (this.foodItem.gramsPerCarbRatio * this.grams)/100 : this.grams;
    }
}