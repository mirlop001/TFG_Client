import { Deserializable } from "../_heplers/deseriabizable";

export class ConfirmationModel implements Deserializable {
    public color: string;
    public icon: string;
	public time: string;
	public title: string;
	public values: string[]; 

    deserialize(data: any) {
        Object.assign(this, data);
        return this;
    }
}
