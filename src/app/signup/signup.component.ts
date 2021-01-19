import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.sass']
})
export class SignupComponent {
	private title = "Sokery - Registro";

	public signupForm = new FormGroup({
		name: new FormControl('', [
			Validators.required
		]),

		email: new FormControl('', [
			Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
		]),

		password: new FormControl('', [
			Validators.required,
			Validators.minLength(6)
		]),

		confirmPassword: new FormControl('', [
			Validators.required

		])
	}, {
		updateOn: 'blur',
		validators: this.checkPasswords
	});

	public signupErrMsg: string = "";
	public passErr: boolean = false;

	constructor(private authenticationService: AuthenticationService, private router: Router, private titleService: Title) {
		this.titleService.setTitle(this.title);
	};


	get email() { return this.signupForm.get('email'); }

	get password() { return this.signupForm.get('password'); }
	get confirmPassword() { return this.signupForm.get('confirmPassword'); }

	submit() {
		this.authenticationService.signUp(this.signupForm.value)
			.subscribe((loginResponse) => {
				this.router.navigate(['home']);
			}, error => {
				this.signupErrMsg = error.error.message;
			});
	}

	checkPasswords(group: FormGroup) { // here we have the 'passwords' group
		let pass = group.get('password').value;
		let confirmPassword = group.get('confirmPassword').value;

		return (!pass || !confirmPassword || pass === confirmPassword) ? null : { notSame: true };
	}

	clearEmailMessage() {
		this.signupErrMsg = "";
	}
}
