import { Deserializable } from "../_heplers/deseriabizable";

export class DiaryModel implements Deserializable {
    public type: string;
    public date: string;
	public value: any[]; 

    deserialize(data: any) {
        Object.assign(this, data);
        return this;
    }
}
