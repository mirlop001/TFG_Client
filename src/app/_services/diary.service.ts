import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActionResultModel } from '../_models/action-result.model';

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
		return this.http.post(`http://localhost:8080/api/meal-diary`, meal );
	}

	//Glucose diary
	saveGlucose(glucose) {
		return this.http.post<ActionResultModel>(`http://localhost:8080/api/glucose-diary`, glucose, { headers: this.headers });
	}

	getInsulinDiary(date) {
		return this.http.post(`http://localhost:8080/api/diary/insulin`, {date: date}, { headers: this.headers });
	}

	//Insulin diary
	getInsulinTypes() {
		return this.http.get(`http://localhost:8080/api/insulin`);
	}

	saveInsulin(insulin) {
		return this.http.post(`http://localhost:8080/api/insulin-diary`, insulin, { headers: this.headers });
	}
}