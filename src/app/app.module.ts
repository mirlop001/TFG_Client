import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MobxAngularModule } from 'node_modules/mobx-angular';

import { FilterPipe } from './_pipes/filter.pipe';

import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';

import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';

import { FoodDiaryComponent } from './food-diary/food-diary.component';

import { NgbModule } from 'node_modules/@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FoodSelectorComponent } from './food-diary/food-selector/food-selector.component';
import { MealConfirmationComponent } from './_popups/meal-confirmation/meal-confirmation.component';
import { NotificationComponent } from './_popups/notification/notification.component';
import { GlucoseDiaryComponent } from './glucose-diary/glucose-diary.component';
import { ActionMessageComponent } from './_popups/action-message/action-message.component';


@NgModule({
	declarations: [
		AppComponent,
		FilterPipe,
		FoodDiaryComponent,
		FoodSelectorComponent,
		MealConfirmationComponent,
		NotificationComponent,
		GlucoseDiaryComponent,
		ActionMessageComponent,
	],
	imports: [
		MobxAngularModule,
		HttpClientModule,
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatButtonToggleModule,
		MatCardModule,
		MatDialogModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		MatDividerModule,
		NgbModule
	],
	providers: [
		{
			provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {
				hasBackdrop: false
			}
		}],
	bootstrap: [AppComponent]
})
export class AppModule { }
