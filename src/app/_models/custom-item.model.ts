import { FoodModel } from './food.model';
import { Deserializable } from "../_heplers/deseriabizable";

export class CustomItemModel implements Deserializable {
	public _id: string;
    public name: String;
    public price: number;
    public acquired: boolean;
	public inUse: boolean;
	public type: CustomItemTypeModel;
	public imageSrc: string;
	public value: string;
	public order: number;

    deserialize(data: any) {
		Object.assign(this, data);
		this.imageSrc = "../../assets/items/" + data.imageSrc;
        return this;
    }
}

export class CustomItemTypeModel implements Deserializable {
	public _id: string;
	public name: string;

	deserialize(data: any) {
		Object.assign(this, data);
		return this;
	}
}