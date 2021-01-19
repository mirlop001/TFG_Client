import { Deserializable } from "../_heplers/deseriabizable";

export class GlucoseModel implements Deserializable {
    id: number;
    glucose: number;
    comments: string;
    createdAt: Date;

    deserialize(data: any) {
        Object.assign(this, data);
        this.id = data._id;

        return this;
    }
}