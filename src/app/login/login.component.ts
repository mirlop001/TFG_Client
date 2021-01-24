import { Component } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.sass'],
	animations: [
	  trigger(
		'enterAnimation', [
		  transition(':enter', [
			style({opacity: 0}),
			animate('300ms', style({opacity: 1}))
		  ])
		]
	  )
	],
})
export class LoginComponent {
	private title = 'Login';
	isLogin: boolean = true;
	
	email: FormControl = new FormControl('', [Validators.required, Validators.email]);
	password: FormControl = new FormControl('', [Validators.required]);
	
	name: FormControl = new FormControl('', [Validators.required]);
	passwordConfirmation: FormControl = new FormControl('', [Validators.required]);

	hide = true;
	loginErrMsg: string = "";

	currentAvatarStatus= "neutro.gif";
	isAvatarSeeing:boolean = true; 

	constructor(private authenticationService: AuthenticationService, private router: Router, private titleService: Title) {
		this.titleService.setTitle(this.title);
	};

	submitLogin() {
		this.authenticationService.login({ email: this.email.value, password: this.password.value })
			.subscribe(() => {
				this.router.navigate(['home']);

			}, error => {
				this.loginErrMsg = error.error.message;
			});
	}

	getErrorMessage() {
	  if (this.email.hasError('required')) {
		return 'Este campo no puede estar vacío';
	  }
  
	  return this.email.hasError('email') ? 'Email no válido.' : '';
	}

	changePage() {
		this.isLogin = !this.isLogin;
	}

	changeAvatarStatus() {
		let self = this;

		if(this.isAvatarSeeing) {
			this.currentAvatarStatus = "oculto.gif";

			setTimeout(() => {
				self.currentAvatarStatus = "oculto.png";
				self.isAvatarSeeing = false;
			}, 800);
			
		} else {
			this.currentAvatarStatus = "visible.gif"
			
			setTimeout(() => {
				self.currentAvatarStatus = "neutro.gif";
				self.isAvatarSeeing = true;
			}, 800);
		}
	}
}
