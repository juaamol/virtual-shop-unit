import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { ResultsModule } from './results/results.module';
import { ProductModule } from './product/product.module';
import { LoginModule } from './login/login.module';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './shared/shared.module';
import { CategoriesModule } from './categories/categories.module';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    ResultsModule,
    ProductModule,
    LoginModule,
    CategoriesModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
