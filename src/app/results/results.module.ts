import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsComponent } from './results/results.component';
import { FiltersComponent } from './filters/filters.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ResultsRoutingModule } from './results-routing.module';

@NgModule({
  declarations: [ResultsComponent, FiltersComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ResultsRoutingModule,
    SharedModule,
  ],
})
export class ResultsModule {}
