import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  id$!: Observable<string | null>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.id$ = this.idFromUrl();
  }

  idFromUrl() {
    return this.route.paramMap.pipe(map((paramMap) => paramMap.get('id')));
  }
}
