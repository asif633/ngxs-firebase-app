import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { CategoryState, Category, LoadCatgories, AddCategory } from '../../store/category.state';
import { SubcategoryState, Subcategory, AddSubcategory, LoadSubcategories } from '../../store/subcategory.state';
import { AddItem, LoadItems, RemoveItems } from '../../store/item.state';
import { CartState, Cart } from '../../store/cart.state';

@Component({
  selector: 'app-category-toolbar',
  templateUrl: './category-toolbar.component.html',
  styleUrls: ['./category-toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryToolbarComponent implements OnInit {

  @Select(CategoryState) items: Observable<Category[]>;
  @Select(SubcategoryState) subcategory: Observable<Subcategory[]>;
  @Select(CartState) it: Observable<Cart>;

  constructor(private store: Store) {
    // this.store.dispatch(
    //   [
    //     new AddCategory({name: 'Tools and safety'}),
    //     new AddCategory({name: 'Lights and fans'}),
    //     new AddCategory({name: 'Solar'}),
    //     new AddCategory({name: 'Test and measure'}),
    //     new AddCategory({name: 'Electrical'}),
    //     new AddCategory({name: 'Industrial'})
    //   ]
    // );
    // this.store.dispatch(
    //   [
    //     new AddSubcategory({name: 'Power Tools', categoryId: 'pQnHISygWbQgNJeLJ6RZ'}),
    //     new AddSubcategory({name: 'Hand Tools', categoryId: 'pQnHISygWbQgNJeLJ6RZ'}),
    //     new AddSubcategory({name: 'Light Bulbs', categoryId: '2TqnQAG6lWuo3XfS4zms'}),
    //     new AddSubcategory({name: 'Indore Bulbs', categoryId: '2TqnQAG6lWuo3XfS4zms'}),
    //     new AddSubcategory({name: 'Solar Panels', categoryId: 'u3mbKHb00huqoNVF6FMK'}),
    //     new AddSubcategory({name: 'Solar Components', categoryId: 'u3mbKHb00huqoNVF6FMK'}),
    //     new AddSubcategory({name: 'Electrical Testing', categoryId: 'Jrar9luVMLtFjYNxvgiv'}),
    //     new AddSubcategory({name: 'Non Electrical Testing', categoryId: 'Jrar9luVMLtFjYNxvgiv'}),
    //     new AddSubcategory({name: 'Appliances', categoryId: 'kM7vd1qgyrW7ARpQBg4j'}),
    //     new AddSubcategory({name: 'Switches and Boxes', categoryId: 'kM7vd1qgyrW7ARpQBg4j'}),
    //     new AddSubcategory({name: 'Welding', categoryId: '2EGAovC6VJS6gAwsToHJ'}),
    //     new AddSubcategory({name: 'Soldering', categoryId: '2EGAovC6VJS6gAwsToHJ'}),
    //     new AddSubcategory({name: 'Lubrication', categoryId: '2EGAovC6VJS6gAwsToHJ'}),
    //   ]
    // );

    // this.store.dispatch(
    //   [
    //     new AddItem({name: 'Aeronox an20 Air Blower', price: 1086, imageUrl: 'https://img1.urjacart.in/image/upload/catalog/product/cache/small_image/190x190/beff4985b56e3afdbeabfc89641a4582/t/3/t35-041.jpg', maximum: 5, categoryId: 'pQnHISygWbQgNJeLJ6RZ', subcategoryId: 'I98c6iKbzIRlZNi3TXP8'}),
    //     new AddItem({name: 'Stanley STPT600 600W Variable Speed Blower', price: 2152, imageUrl: 'https://img1.urjacart.in/image/upload/catalog/product/cache/small_image/190x190/beff4985b56e3afdbeabfc89641a4582/T/0/T03-316.jpg', maximum: 5, categoryId: 'pQnHISygWbQgNJeLJ6RZ', subcategoryId: 'I98c6iKbzIRlZNi3TXP8'}),
    //     new AddItem({name: 'Makita UB1102 600W Blower', price: 5226, imageUrl: 'https://img1.urjacart.in/image/upload/catalog/product/cache/small_image/190x190/beff4985b56e3afdbeabfc89641a4582/T/2/T21-066.jpg', maximum: 5, categoryId: 'pQnHISygWbQgNJeLJ6RZ', subcategoryId: 'I98c6iKbzIRlZNi3TXP8'}),
    //     new AddItem({name: 'Taparia 101 125x9mm Octagonal Chisel (Pack of 10)', price: 3470, imageUrl: 'https://img1.urjacart.in/image/upload/catalog/product/cache/small_image/190x190/beff4985b56e3afdbeabfc89641a4582/T/0/T02-082.jpg', maximum: 5, categoryId: 'pQnHISygWbQgNJeLJ6RZ', subcategoryId: 'I98c6iKbzIRlZNi3TXP8'}),
    //     new AddItem({name: 'Sukam 100 Watt Solar Panel', price: 4225, imageUrl: 'https://img1.urjacart.in/image/upload/catalog/product/cache/small_image/190x190/beff4985b56e3afdbeabfc89641a4582/S/P/SP09-001_2.jpg', maximum: 5, categoryId: 'u3mbKHb00huqoNVF6FMK', subcategoryId: 'EQRqxyVVRNcr7bkmtdVY'}),
    //     new AddItem({name: 'Sukam 150 Watt Solar Panel', price: 6641, imageUrl: 'https://img1.urjacart.in/image/upload/catalog/product/cache/small_image/190x190/beff4985b56e3afdbeabfc89641a4582/S/P/SP09-001_3.jpg', maximum: 5, categoryId: 'u3mbKHb00huqoNVF6FMK', subcategoryId: 'EQRqxyVVRNcr7bkmtdVY'}),
    //     new AddItem({name: 'Sukam 100 Watt Solar Panel', price: 4225, imageUrl: 'https://img1.urjacart.in/image/upload/catalog/product/cache/small_image/190x190/beff4985b56e3afdbeabfc89641a4582/S/P/SP09-001_2.jpg', maximum: 5, categoryId: 'u3mbKHb00huqoNVF6FMK', subcategoryId: 'EQRqxyVVRNcr7bkmtdVY'}),
    //     new AddItem({name: 'Phocos CIS20 12/24V PWM Industrial Solar Charge Controller', price: 2174, imageUrl: 'https://img1.urjacart.in/image/upload/catalog/product/cache/small_image/190x190/beff4985b56e3afdbeabfc89641a4582/S/C/SC01-SCC08.jpg', maximum: 5, categoryId: 'u3mbKHb00huqoNVF6FMK', subcategoryId: 'oycQ6nX99pwixTblMNWc'}),
    //     new AddItem({name: 'Phocos CML 5A 12/24V PWM Solar Charge Controller', price: 756, imageUrl: 'https://img1.urjacart.in/image/upload/catalog/product/cache/small_image/190x190/beff4985b56e3afdbeabfc89641a4582/S/C/SC01-SCC10.jpg', maximum: 5, categoryId: 'u3mbKHb00huqoNVF6FMK', subcategoryId: 'oycQ6nX99pwixTblMNWc'}),
        
    //   ]);
    this.store.dispatch(new LoadCatgories());
  }

  ngOnInit() {
    // this.items.subscribe(res => console.log('items', res))
  }

  showInfo(catid) {
    console.log('catid', catid);
    this.store.dispatch(new LoadSubcategories(catid));
  }

  selectSubCat(subcatId) {
    this.store.dispatch(new LoadItems(subcatId));
  }

  // subcats: string[];
  // subcatslength: number = 0;
  // subcatstemp: string[] = [];
  
  // selSubCats(event: string[]) {
  //   if (this.subcatslength > event.length) {
  //     const catid = this.subcatstemp.filter(cd => event.includes(cd))[0];
  //     this.store.dispatch(new RemoveItems(catid));
  //     this.subcatslength = event.length;
  //     this.subcatstemp = event;
  //   } else {
  //     this.store.dispatch(new LoadItems(event[event.length -1]));
  //     this.subcatslength = event.length;
  //     this.subcatstemp = event;
  //   }
  // }
  openDrawer = false;
  openRightDrawer = false;
  openCat() {
    this.openDrawer = !this.openDrawer;
  }

  openCart() {
    this.openRightDrawer = !this.openRightDrawer;
  }

}
