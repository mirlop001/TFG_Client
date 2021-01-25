import { Deserializable } from "../_heplers/deseriabizable";

export class ActionResultModel implements Deserializable {
    public _id: string;
    public name: string;
    public prize: number;
    public title: string;
	public message: string;
	public problem: string;
	public solution: string;
	public examples: string[];
	public status: string;
	public isAction: boolean;

    deserialize(data: any) {
        if(data.updatedAt)
            data = data.type;
            
        Object.assign(this, data)
        return this;
    }
}
