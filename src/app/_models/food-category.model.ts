import { FoodModel } from './food.model';
import { Deserializable } from "../_heplers/deseriabizable";

export class FoodCategoryModel implements Deserializable {
    public id: String;
    public name: string;
    public foodList: FoodModel[];

    deserialize(data: any) {
        Object.assign(this, data);
        this.id = data._id;
        
        this.foodList.map((food) => {
            return new FoodModel().deserialize(food);
        });

        return this;
    }
}
