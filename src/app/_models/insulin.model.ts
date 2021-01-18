import { Deserializable } from "../_heplers/deseriabizable";

export class InsulinModel implements Deserializable {
    public _id: string;
	public type: string;
	public quantity: number;

    deserialize(data: any) {
        Object.assign(this, data);
        return this;
    }
}
