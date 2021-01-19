import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
	title = 'Home';

	constructor(private authenticationService: AuthenticationService, private router: Router, private titleService: Title) {

		this.titleService.setTitle(this.title);
	};

	ngOnInit() {
		this.authenticationService.userLogged.subscribe((value) => {
			if (!value)
				this.router.navigate(['login']);
		});
	}
}
