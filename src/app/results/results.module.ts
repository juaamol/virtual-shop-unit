import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsComponent } from './results/results.component';
import { FiltersComponent } from './filters/filters.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ResultsComponent, FiltersComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class ResultsModule {}
