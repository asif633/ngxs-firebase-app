// Models
export interface Item {
    id?: string;
    name?: string;
    price?: number;
    imageUrl?: string;
    maximum?: number;
    subcategoryId?: string;
    categoryId?: string;
}
export interface ItemStateModel {
    items?: Item[];
    message?: any;
}
// Actions
export class LoadItems {
    static type = '[Item] Laod Items';
    constructor(public catid: string){}
}

export class RemoveItems {
    static type = '[Item] Remove Items';
    constructor(public catid: string){}
}

export class LoadItemsSuccess {
    static type = '[Item] Laod Items Success';
    constructor(public items: Item[]) { }
}

export class RemoveItemsSuccess {
    static type = '[Item] Remove Items Success';
    constructor(public items: Item[]) { }
}

export class LoadItemsFailure {
    static type = '[Item] Laod Items Failure';
    constructor(public error: any) { }
}
export class AddItem {
    static type = '[Item] Add item';
    constructor(public item: Item) { }
}
export class AddItemSuccess {
    static type = '[Item] Add Item Success';
    constructor(public success: any) { }
}
export class AddItemFailure {
    static type = '[Item] Add Item Failure';
    constructor(public error: any) { }
}
// State

import { ApplicationRef } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase';

import { Action, Selector, State, StateContext, Store, NgxsOnInit } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

import { take, tap, map, switchMap } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subcategory } from './subcategory.state';

@State<ItemStateModel>({
    name: 'item',
    defaults: {
        items: [],
        message: null
    }
})
export class ItemState implements NgxsOnInit {
    constructor(private store: Store, private afStore: AngularFirestore, private ref: ApplicationRef) { }

    @Selector()
    static getItems(state: ItemStateModel) {
        return state.items;
    }

    @Selector()
    static getItem(state: ItemStateModel, itemId: string) {
        return state.items;
    }

    ngxsOnInit(sc: StateContext<ItemStateModel>) {
        //sc.dispatch(new LoadCatgories());
    }

    @Action(LoadItems)
    loadItems(sc: StateContext<ItemStateModel>, action: LoadItems) {
        console.log('load items');
        this.afStore.collection('item', ref => ref.where('subcategoryId', '==', action.catid)).snapshotChanges()
            .pipe(
                map(actions => actions.map((a: any) => {
                    const data = a.payload.doc.data() as Item;
                    const id = a.payload.doc.id;
                    return { id, ...data };
                }))
                )
            .subscribe(res => {
                console.log('res', res);
                sc.dispatch(new LoadItemsSuccess(res));
            });
    }

    @Action(AddItem)
    addItem(sc: StateContext<ItemStateModel>, action: AddItem) {
        this.afStore.collection('item').add(action.item)
            .then(fulfil => sc.dispatch(new AddItemSuccess(sc)))
            .catch(reject => sc.dispatch(new AddItemFailure(reject)));
    }

    @Action(AddItemSuccess)
    addItemSuccess(sc: StateContext<ItemStateModel>, event: AddItemSuccess) {
        sc.setState({
            items: sc.getState().items,
            message: event.success
        })
    }

    @Action(AddItemFailure)
    addItemFailure(sc: StateContext<ItemStateModel>, event: AddItemFailure) {
        sc.setState({
            items: sc.getState().items,
            message: event.error
        })
    }

    @Action(LoadItemsSuccess)
    setUserStateOnSuccess(sc: StateContext<ItemStateModel>, event: LoadItemsSuccess) {
        console.log('setUserStateOnSuccess');
        sc.setState({
            items: event.items
        });
    }

    // @Action(RemoveItems) 
    // removeItems(sc: StateContext<ItemStateModel>, event: RemoveItems) {
    //     const items = sc.getState().items.filter(item => item.subcategoryIds.forEach(cc => cc !== event.catid) );     
    //     sc.setState({
    //         items
    //     });
    // }

}