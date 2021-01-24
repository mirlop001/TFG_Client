import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AppComponent } from './app.component';
import { ShopComponent } from './shop/shop.component';
import { InventoryComponent } from './inventory/inventory.component';
import { DiaryComponent } from './diary/diary.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, data: { animation: 'HomePage' } },
  { path: 'shop', component: ShopComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'diary', component: DiaryComponent },
  { path: '', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
