import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { CartState, Cart, AddCartItem, SubtractCartItem, RemoveCartItem } from '../../store/cart.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Select(CartState) it: Observable<Cart>;
  constructor(private store: Store) { }

  ngOnInit() {
  }

  addToCart(item) {
    this.store.dispatch(new AddCartItem(item));
  }

  removeFromCart(item) {
    this.store.dispatch(new SubtractCartItem(item));
  }

  deleteCartItem(item) {
    this.store.dispatch(new RemoveCartItem(item));
  }
}
