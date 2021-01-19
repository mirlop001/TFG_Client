import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActionResultModel } from '../_models/action-result.model';
import { environment } from '../../environments/environment';
import { InsulinTypeModel } from '../_models/insulin-types.model';
import { InsulinModel } from '../_models/insulin.model';
import { GlucoseModel } from '../_models/glucose.model';
import { MealModel } from '../_models/meal.model';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {
	private headers;
	private user = null;

  	constructor(private http: HttpClient) {
		this.user = JSON.parse(localStorage.getItem("user-logged")).user;
		this.headers = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
			'Content-Type': 'application/json',
			'user': this.user
		}
	}

	//Food diary
	getMealDiary(date) {
		return this.http.post<MealModel[]>(`${environment.apiUrl}/meal-diary`, { date: date }, { headers: this.headers });
	}

	saveMeal(meal) {
		return this.http.post(`${environment.apiUrl}/meal`, meal );
	}

	//Glucose diary
	getGlucoseDiary(date) {
		return this.http.post<GlucoseModel[]>(`${environment.apiUrl}/glucose-diary`, { date: date }, { headers: this.headers });
	}

	saveGlucose(glucose) {
		return this.http.post<ActionResultModel>(`${environment.apiUrl}/glucose`, glucose, { headers: this.headers });
	}

	//Insulin diary
	getInsulinDiary(date) {
		return this.http.post<InsulinModel[]>(`${environment.apiUrl}/insulin-diary`, { date: date }, { headers: this.headers });
	}

	getInsulinTypes() {
		return this.http.get<InsulinTypeModel[]>(`${environment.apiUrl}/insulin/types`);
	}

	saveInsulin(insulin) {
		return this.http.post(`${environment.apiUrl}/insulin`, insulin, { headers: this.headers });
	}
}