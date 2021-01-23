import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';
import { Router, RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.sass'],
	animations: [
		trigger('routeAnimations', [
			transition('HomePage => *', [
			  style({ position: 'relative' }),
			  query(':enter, :leave', [
				style({
				  position: 'absolute',
				  top: 0,
				  right: 0,
				  width: '100%'
				})
			  ], { optional: true }),
			  query(':enter', [
				style({ right: '-100%' })
			  ], { optional: true }),
			  query(':leave', animateChild(), { optional: true }), 
			  group([
				query(':leave', [
				  animate('300ms ease-out', style({ right: '100%' }))
				], { optional: true }),
				query(':enter', [
				  animate('300ms ease-out', style({ right: '0%' }))
				], { optional: true })
			  ]),
			  query(':enter', animateChild(), { optional: true }),
			]),
			transition('* => HomePage', [
			  style({ position: 'relative' }),
			  query(':enter, :leave', [
				style({
				  position: 'absolute',
				  top: 0,
				  left: 0,
				  width: '100%'
				})
			  ], { optional: true }),
			  query(':enter', [
				style({ left: '-100%' })
			  ], { optional: true }),
			  query(':leave', animateChild(), { optional: true }),
			  group([
				query(':leave', [
				  animate('300ms ease-out', style({ left: '100%' }))
				], { optional: true }),
				query(':enter', [
				  animate('300ms ease-out', style({ left: '0%' }))
				], { optional: true })
			  ]),
			  query(':enter', animateChild(), { optional: true }),
			])
		])
	]
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

	prepareRoute(outlet: RouterOutlet) {
		return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
	}
}
