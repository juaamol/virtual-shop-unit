import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { ResultsComponent } from './results/results/results.component';
import { LoginComponent } from './login/login/login.component';
import { RegistrationComponent } from './login/registration/registration.component';
import { LoggedInGuard } from './shared/guards/logged-in/logged-in.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: ResultsComponent },
  {
    path: 'product/:id',
    loadChildren: () =>
      import('./product/product.module').then((m) => m.ProductModule),
  },
  { path: 'login', component: LoginComponent, canActivate: [LoggedInGuard] },
  { path: 'registration', component: RegistrationComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
