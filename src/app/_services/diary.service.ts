import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActionResultModel } from '../_models/action-result.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {
	private headers;
	private user = '5f7c06edeef17346d4552129';

  	constructor(private http: HttpClient) {
		// this.user = JSON.parse(localStorage.getItem("user-logged")).user;
		this.headers = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
			'Content-Type': 'application/json',
			'user': this.user
		}
	}

	//Food diary
	saveMeal(meal) {
		return this.http.post(`${environment.apiUrl}/meal-diary`, meal );
	}

	//Glucose diary
	saveGlucose(glucose) {
		return this.http.post<ActionResultModel>(`${environment.apiUrl}/glucose-diary`, glucose, { headers: this.headers });
	}

	getInsulinDiary(date) {
		return this.http.post(`${environment.apiUrl}/diary/insulin`, {date: date}, { headers: this.headers });
	}

	//Insulin diary
	getInsulinTypes() {
		return this.http.get(`${environment.apiUrl}/insulin`);
	}

	saveInsulin(insulin) {
		return this.http.post(`${environment.apiUrl}/insulin-diary`, insulin, { headers: this.headers });
	}
}