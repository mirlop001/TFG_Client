import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CustomItemModel, CustomItemTypeModel } from '../_models/custom-item.model';
import { CustomItemConfirmationComponent } from '../_popups/custom-item-confirmation/custom-item-confirmation.component';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.sass']
})
export class InventoryComponent implements OnInit {
	items: CustomItemModel[] = [];
	total: number = 0;
	customItemTypes = [];
	customBackground:string = null;
	
	initialBackgroundValue: string ="";
	filter: string;
	currentCoins: number = 15;

	constructor( public dialog: MatDialog, private elRef: ElementRef, private router: Router, private userService: UserService
	) {}

	ngOnInit() {
		let userLogged = JSON.parse(localStorage.getItem('user-logged'));

		if(!userLogged)
			this.router.navigate(['login']);

		let itemTypes = {};

		this.userService
			.getUserInformation()
			.subscribe((userInfo) => {
				if(userInfo.customItems){
					userInfo.customItems.forEach((item:any) => {
						let selectedItem = item.item;
						selectedItem.inUse = item.inUse;
						let type = itemTypes[selectedItem.type._id];

						if(!type) {
							type = new CustomItemTypeModel().deserialize(selectedItem.type);
							itemTypes[selectedItem.type._id] = type;
						}

						selectedItem.type = type;
						this.items.push(new CustomItemModel().deserialize(selectedItem));
					});

					this.customItemTypes = Object.values(itemTypes);
				}
			});
		
	}

	onSelected(item: CustomItemModel) {
		if(!item.inUse) {
			let repeatedItem = this.items.find((selectedItem) => {
				return selectedItem.inUse && selectedItem.order == item.order;
			});

			if(repeatedItem) {
				repeatedItem.inUse = false;
			}
			
			item.inUse = true;

		} else {
			item.inUse = false;
		}

	}

	changeBg(item) {
		if(item.value) {
			let background = item.inUse? item.value : this.initialBackgroundValue;
			this.elRef.nativeElement.style.setProperty('--background-color', background );
		}
	}

	goHome() {
		this.router.navigate(['home']);
	}

	goShopping() {
		this.router.navigate(['shop']);
	}

	saveCustomItems() {
		this.userService
			.saveCustomItems(this.items)
			.subscribe((response) => {
				this.goHome();
			});
	}

	openConfirmation() {
		const dialogRef = this.dialog.open(CustomItemConfirmationComponent, {
			hasBackdrop: true,
			data: {
				selectedItems: this.items,
			}
		});
	
		dialogRef.afterClosed().subscribe(result => {
			if(result) {
				this.saveCustomItems();
			}
		});
	}

}
