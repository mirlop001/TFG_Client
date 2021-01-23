import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserModel } from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
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

	getUserInformation() {
        return this.http.get<UserModel>(`${environment.apiUrl}/user`, { headers: this.headers });
	}

	saveCustomItems(customItems) {
        return this.http.post<UserModel>(`${environment.apiUrl}/user/items`, { customItems: customItems }, { headers: this.headers });
	}
}
