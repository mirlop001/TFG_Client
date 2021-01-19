import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserModel } from '../_models/user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubj: BehaviorSubject<UserModel>;
    public userLogged: Observable<UserModel>;
	private headers;
	private user = null;

	constructor(private http: HttpClient, private router: Router) {
        this.userSubj = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('user-logged')));
        this.userLogged = this.userSubj.asObservable();
		this.user = JSON.parse(localStorage.getItem("user-logged")).user;

		this.headers = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
			'Content-Type': 'application/json',
			'user': this.user
		}
    }

    public get userLoggedValue(): UserModel {
        return this.userSubj.value;
    }

    login(UserCredentials) {
        return this.http.post<any>(`${environment.apiUrl}/login`, UserCredentials)
            .pipe(
                map(userInfo => {

                    localStorage.setItem('user-logged', JSON.stringify(userInfo));
                    this.userSubj.next(userInfo);

                    return userInfo;
                })
            );
    }

    logout() {
        localStorage.removeItem('user-logged');
        this.userSubj.next(null);

        this.router.navigate(['login']);
    }

    signUp(UserCredentials) {
        return this.http.post<any>(`${environment.apiUrl}/signup`, UserCredentials)
            .pipe(
                map(userInfo => {

                    localStorage.setItem('user-logged', JSON.stringify(userInfo));
                    this.userSubj.next(userInfo);

                    return userInfo;
                })
            );
	}

	getUserInformation() {
        return this.http.get<UserModel>(`${environment.apiUrl}/user`, { headers: this.headers });
	}
}