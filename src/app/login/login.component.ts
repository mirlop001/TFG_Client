import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
	private title = 'Login';

	public loginForm;
	public loginErrMsg: string = "";

	constructor(private authenticationService: AuthenticationService, private router: Router, private titleService: Title) {
		this.titleService.setTitle(this.title);
	};

	ngOnInit(): void {
		this.loginForm = new FormGroup({
			email: new FormControl('', [
				Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
			]),

			password: new FormControl('', [
				Validators.required
			])
		});

	}

	get email() { return this.loginForm.get('email'); }

	get password() { return this.loginForm.get('password'); }

	submitLogin() {
		this.authenticationService.login(this.loginForm.value)
			.subscribe(() => {
				this.router.navigate(['home']);

			}, error => {
				this.loginErrMsg = error.error.message;
			});
	}

}
