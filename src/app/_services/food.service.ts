import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { FoodCategoryModel } from '../_models/food-category.model';
import { FoodModel } from '../_models/food.model';
import { MealModel } from '../_models/meal.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
	private headers;
	private user = null;

  constructor(private http: HttpClient) {
		  this.user = JSON.parse(localStorage.getItem("user-logged"))?.user;
		  this.headers = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
			'Content-Type': 'application/json',
			'user': this.user
		  }
  }

  /* FOOD TYPE */
  getFoodList() {
	return this.http.get<FoodCategoryModel[]>(`${environment.apiUrl}/food`, { headers: this.headers });
  }

  getFavourites() {
	return this.http.get<FoodModel[]>(`${environment.apiUrl}/food/favourites`, { headers: this.headers });

  }

  saveMeal(food) {
    return this.http.post<MealModel>(`${environment.apiUrl}/food/meal`, food, { headers: this.headers });
  }

  saveFavourites(foodIdList) {
    return this.http.post<Boolean>(`${environment.apiUrl}/food/favourites`,{ foodList: foodIdList }, { headers: this.headers });
  }
  
}
