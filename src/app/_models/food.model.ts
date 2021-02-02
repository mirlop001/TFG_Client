import { Deserializable } from "../_heplers/deseriabizable";

export class FoodModel implements Deserializable {
    public _id: string;
    public name: string;
    public imageSrc: string;
    public gramsPerCarbRatio: number;
    public createdBy: string;
    public createdAt: Date;
    public categoryId: string;
    public carbGrams: number;
    public isFavourite: boolean;
    public isSelected: boolean;

    deserialize(data: any) {
        Object.assign(this, data);
        this.isSelected = false;

        return this;
    }
}
