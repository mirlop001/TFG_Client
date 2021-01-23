import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomItemTypeModel } from '../_models/custom-item.model';
import { CustomItemModel } from '../_models/custom-item.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomItemService {
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
  getCustomItemTypes() {
	return this.http.get<CustomItemTypeModel[]>(`${environment.apiUrl}/items/types`, { headers: this.headers });
  }

  getCustomItems() {
	return this.http.get<CustomItemModel[]>(`${environment.apiUrl}/items`, { headers: this.headers });
  }

  buyItems(customItems) {
    return this.http.post<CustomItemModel[]>(`${environment.apiUrl}/items`, customItems, { headers: this.headers });
  }
  
}
