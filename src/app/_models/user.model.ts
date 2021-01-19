import { ActionResultModel } from "./action-result.model";
import { computed } from 'mobx-angular';

export class UserModel {
    public name: string;
    public email: string;
    public password: string;
    public token: string;
	public coins: number;
	public currentActionResult: ActionResultModel;

    deserialize(data: any) {
        Object.assign(this, data);
        return this;
	}
	
    @computed get avatarStatus () {
        return this.currentActionResult && this.currentActionResult.status? this.currentActionResult.status : 'neutro';
    }
}
