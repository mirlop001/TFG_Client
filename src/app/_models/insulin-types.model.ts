import { Deserializable } from "../_heplers/deseriabizable";

export class InsulinTypeModel implements Deserializable {
    public _id: string;
    public name: string;

    deserialize(data: any) {
        Object.assign(this, data);

        return this;
    }
}
