import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FoodDiaryComponent } from './food-diary/food-diary.component';
import { GlucoseDiaryComponent } from './glucose-diary/glucose-diary.component';
import { ActionResultModel } from './_models/action-result.model';
import { GlucoseModel } from './_models/glucose.model';
import { ActionMessageComponent } from './_popups/action-message/action-message.component';
import { NotificationComponent } from './_popups/notification/notification.component';

@Component({
selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.sass']
})
export class AppComponent {
	title = 'Sokery!';

	avatarStatus = "neutral";
	avatarStatuses = ["neutral","sad", "happy"];

	menuType = null;
	
	coins = 10;

	constructor(public dialog: MatDialog){};

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
		}

		if(component) {
			const dialogRef = this.openNotification(component);
		
			dialogRef.afterClosed().subscribe(result => {
				this.menuType = null;

				if(result) {
					if(result instanceof ActionResultModel) {
						this.openNotification(ActionMessageComponent, result);

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
}
