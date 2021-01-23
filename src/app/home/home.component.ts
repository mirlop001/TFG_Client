import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DiaryComponent } from '../diary/diary.component';
import { FoodDiaryComponent } from '../food-diary/food-diary.component';
import { GlucoseDiaryComponent } from '../glucose-diary/glucose-diary.component';
import { InsulinDiaryComponent } from '../insulin-diary/insulin-diary.component';
import { ActionResultModel } from '../_models/action-result.model';
import { ActionMessageComponent } from '../_popups/action-message/action-message.component';
import { AuthenticationService } from '../_services/authentication.service';
import { NotificationComponent } from '../_popups/notification/notification.component';
import { UserModel } from '../_models/user.model';
import { ShopComponent } from '../shop/shop.component';
import { Router } from '@angular/router';

@Component({
selector: 'app-home',
templateUrl: './home.component.html',
styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit{
	title = 'Mirlop01tfg';

	avatarStatus = "neutral";
	avatarStatuses = ["neutral","sad", "happy"];

	currentAction: ActionResultModel;
	menuType = null;
	
	coins = 0;

	constructor(private authenticationService: AuthenticationService, public dialog: MatDialog, private router: Router){};

	ngOnInit() {
		this.authenticationService.getUserInformation()
		.subscribe((userInfoResponse) => {
			let userInfo = new UserModel().deserialize(userInfoResponse);
			this.coins = userInfo.coins;
			this.currentAction = userInfo.currentAction;
			this.avatarStatus = userInfo.avatarStatus;
		});
	}

	openDialog(type:string): void {
		let component; 
		this.menuType = type;

		switch(this.menuType){
			case 'food':
				component = FoodDiaryComponent;
				break;

			case 'glucose':
				component = GlucoseDiaryComponent;
				break;

			case 'insulin':
				component = InsulinDiaryComponent;
				break;
			
			case 'diary':
				component = DiaryComponent;
				break;
				
		}

		if(component) {
			const dialogRef = this.openNotification(component);
		
			dialogRef.afterClosed().subscribe(result => {
				this.menuType = null;

				if(result) {
					if(result instanceof ActionResultModel) {
						this.openNotification(ActionMessageComponent, result);
						this.coins += result.prize;
						this.avatarStatus = result.status;

					} else {
						this.openNotification(NotificationComponent, {
							message: "¡Guardado con éxito!"
						});
					}
				}
			});
		}
	}
	
	openNotification(component, message?) {
		return this.dialog.open(component, {
			hasBackdrop: true,
			data: message
		});
	}	

	openNewPage(pageName) {
		this.router.navigate(['shop']);

	}
}
