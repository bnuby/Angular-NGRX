import { Product } from './../../pages/product/product.model';
import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input() product: Product = {
    name: 'Test',
    type: 'Hello',
    price: 100
  };

  @Input() clickable = false;

  @Output() clickFn: EventEmitter<Product> = new EventEmitter();

  @HostListener('click')
  onClick(): void {
    this.clickFn.emit(this.product);
  }

  get styles(): {} {
    return {
      cursor: this.clickable ? 'pointer' : 'inherit',
    };
  }

}
