import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsComponent } from './results/results.component';
import { FiltersComponent } from './filters/filters.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ResultsComponent, FiltersComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class ResultsModule {}
