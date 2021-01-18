import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { FoodCategoryModel } from '../_models/food-category.model';
import { FoodModel } from '../_models/food.model';
import { MealModel } from '../_models/meal.model';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
	private headers;
	private user = '5f7c06edeef17346d4552129';

  constructor(private http: HttpClient) {
		  // this.user = JSON.parse(localStorage.getItem("user-logged"))?.user;
		  this.headers = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
			'Content-Type': 'application/json',
			'user': this.user
		  }
  }

  /* FOOD TYPE */
  getFoodList() {
	return this.http.get<FoodCategoryModel[]>(`http://localhost:8080/api/food`, { headers: this.headers });
  }

  getFavourites() {
	return this.http.get<FoodModel[]>(`http://localhost:8080/api/food/favourites`, { headers: this.headers });

  }

  saveMeal(food) {
    return this.http.post<MealModel>(`http://localhost:8080/api/food/meal`, food, { headers: this.headers });
  }

  saveFavourites(foodIdList) {
    return this.http.post<Boolean>(`http://localhost:8080/api/food/favourites`,{ foodList: foodIdList }, { headers: this.headers });
  }

  getComplexHC() {
	  return this.http.get<FoodCategoryModel[]>(`http://localhost:8080/api/food/complex`, { headers: this.headers })
  }
}
