import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoriesModule } from '../categories/categories.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, ReactiveFormsModule, CategoriesModule],
})
export class HomeModule {}
