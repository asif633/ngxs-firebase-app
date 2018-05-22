import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Item, ItemState } from '../../store/item.state';
import { AddCartItem } from '../../store/cart.state';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ItemlistComponent implements OnInit {
  @Select(ItemState) it: Observable<Item[]>;

  constructor(private store: Store) { }

  ngOnInit() {
  }

  addCart(item: Item) {
    this.store.dispatch(new AddCartItem({id: item.id, name: item.name, price: item.price, quantity: 1}));
  }

}
