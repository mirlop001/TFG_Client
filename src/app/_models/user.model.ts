import { ActionResultModel } from "./action-result.model";
import { computed } from 'mobx-angular';
import { CustomItemModel } from "./custom-item.model";

export class UserModel {
    [x: string]: any;
    public _id: string;
    public name: string;
    public email: string;
    public password: string;
    public token: string;
	public coins: number;
	public currentAction: ActionResultModel;
	public customItems: CustomItemModel[];

    deserialize(data: UserModel) {
        Object.assign(this, data);
        
        if(data.customItems) {
            this.customItems = data.customItems.map((selectedCustomItem:any) => {
                let item = selectedCustomItem.item;
                item.inUse = selectedCustomItem.inUse;

                return new CustomItemModel().deserialize(item);
            });    

        } else {
            data.customItems = [];
        }

        return this;
	}
	
    @computed get avatarStatus () {
        return this.currentAction && this.currentAction.status? this.currentAction.status : 'neutro';
    }
}
