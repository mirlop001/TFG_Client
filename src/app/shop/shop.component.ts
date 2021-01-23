import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CustomItemModel, CustomItemTypeModel } from '../_models/custom-item.model';
import { CustomItemConfirmationComponent } from '../_popups/custom-item-confirmation/custom-item-confirmation.component';
import { CustomItemService } from '../_services/custom-items.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.sass']
})
export class ShopComponent implements OnInit {
	items: CustomItemModel[] = [];
	total: number = 0;
	customItemTypes = [];
	customBackground:string = null;
	
	initialBackgroundValue: string ="";
	filter: string;

	selectedItems: CustomItemModel[] = []; 
	currentCoins: number = 15;

	constructor( public dialog: MatDialog, private elRef: ElementRef, private router: Router, private customItemService: CustomItemService
	) {
		this.initialBackgroundValue = this.elRef.nativeElement.style.getPropertyValue('--background-color');
		
	}

	ngOnInit() {
		let userLogged = JSON.parse(localStorage.getItem('user-logged'));
		if(!userLogged)
			this.router.navigate(['login']);

		let itemTypes = {};

		this.customItemService.getCustomItems()
			.subscribe((customItemsResult) => {

				if(customItemsResult){
					customItemsResult.forEach((customItem) => {
						let type = itemTypes[customItem.type._id];

						if(!type) {
							type = new CustomItemTypeModel().deserialize(customItem.type);
							itemTypes[type._id] = type;
						}

						customItem.type = type;
						customItem = new CustomItemModel().deserialize(customItem);
						this.items.push(customItem);

						if(customItem.acquired) {
							this.selectedItems.push(customItem);
							
							if(customItem.value)
								this.elRef.nativeElement.style.setProperty('--background-color', customItem.value);
						}
					});

					this.customItemTypes = Object.values(itemTypes);
				}
			});
	}

	onSelected(item: CustomItemModel) {
		if(item.acquired || item.inUse || item.price < (this.currentCoins - this.total)){
			let idx = this.selectedItems.findIndex((selectedItem) => {
				return selectedItem.inUse && (item._id == selectedItem._id || (item.order && selectedItem.order && item.order == selectedItem.order));
			});

			let itemToRemove = this.selectedItems[idx];

			if(item.acquired) {
				if(idx < 0 || this.selectedItems[idx]._id == item._id)
					item.inUse = idx < 0? true : false;
				else {
					item.inUse = true;
					itemToRemove.inUse = false;

					if(itemToRemove.acquired){
					} else {
						this.selectedItems.splice(idx, 1);
						this.total -= itemToRemove.price;
					}
				} 

			} else {
				if(idx < 0) {
					item.inUse = true;
					this.selectedItems.push(item);
					this.total += item.price;

				} else {
					if(itemToRemove._id != item._id){
						if(itemToRemove.acquired){
							item.inUse = true;
							itemToRemove.inUse = false;
							this.selectedItems.push(item);
							this.total += item.price;

						} else {
							item.inUse = false;
							this.selectedItems.splice(idx, 1);
							this.total -= item.price;
						}
					} else {
						item.inUse = false;
						this.selectedItems.splice(idx, 1);
						this.total -= item.price;
					}
				}
			}

			this.changeBg(item);
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

	buyCustomItems() {
		this.customItemService
			.buyItems(this.selectedItems)
			.subscribe((response) => {
				this.goHome();
			});
	}

	openConfirmation() {
		const dialogRef = this.dialog.open(CustomItemConfirmationComponent, {
			hasBackdrop: true,
			data: {
				selectedItems: this.selectedItems,
				coinsLeft: (this.currentCoins - this.total)
			}
		});
	
		dialogRef.afterClosed().subscribe(result => {
			if(result) {
				this.buyCustomItems();
			}
		});
	}
}

