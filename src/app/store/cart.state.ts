// Models
export interface CartItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
}

export interface Cart {
    id?: string;
    items?: CartItem[];
    total?: number;
}
export interface CartStateModel {
    cart?: Cart;
    message?: any;
}
// Actions
export class LoadCarts {
    static type = '[Cart] Laod Carts';
}

export class RemoveCartItem {
    static type = '[Cart] Remove Cart Item';
    constructor(public cartitem: CartItem) { }
}

export class SubtractCartItem {
    static type = '[Cart] Subtract Cart Item';
    constructor(public cartitem: CartItem) { }
}

export class AddCartItem {
    static type = '[Cart] Add Cart Item';
    constructor(public cartitem: CartItem) { }
}

export class LoadCartsSuccess {
    static type = '[Cart] Laod Carts Success';
    constructor(public cart: Cart) { }
}

export class RemoveCartsSuccess {
    static type = '[Cart] Remove Carts Success';
    constructor(public carts: Cart[]) { }
}

export class LoadCartsFailure {
    static type = '[Cart] Laod Carts Failure';
    constructor(public error: any) { }
}
export class AddCart {
    static type = '[Cart] Add cart';
    constructor(public cart: Cart) { }
}
export class AddCartSuccess {
    static type = '[Cart] Add Cart Success';
    constructor(public success: any) { }
}
export class AddCartFailure {
    static type = '[Cart] Add Cart Failure';
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

@State<CartStateModel>({
    name: 'cart',
    defaults: {
        cart: null,
        message: null
    }
})
export class CartState implements NgxsOnInit {
    constructor(private store: Store, private afStore: AngularFirestore, private ref: ApplicationRef) { }

    @Selector()
    static getCart(state: CartStateModel) {
        return state.cart;
    }

    ngxsOnInit(sc: StateContext<CartStateModel>) {
        sc.dispatch(new LoadCarts());
    }

    @Action(LoadCarts)
    loadCarts(sc: StateContext<CartStateModel>, action: LoadCarts) {
        console.log('load carts');
        const cart = JSON.parse(localStorage.getItem('cart'));
        sc.dispatch(new LoadCartsSuccess(cart));
    }

    @Action(AddCart)
    addCart(sc: StateContext<CartStateModel>, action: AddCart) {
        localStorage.setItem('cart', JSON.stringify(action.cart));
    }

    @Action(AddCartSuccess)
    addCartSuccess(sc: StateContext<CartStateModel>, event: AddCartSuccess) {
        sc.setState({
            cart: sc.getState().cart,
            message: event.success
        })
    }

    @Action(AddCartFailure)
    addCartFailure(sc: StateContext<CartStateModel>, event: AddCartFailure) {
        sc.setState({
            cart: sc.getState().cart,
            message: event.error
        })
    }

    @Action(LoadCartsSuccess)
    setUserStateOnSuccess(sc: StateContext<CartStateModel>, event: LoadCartsSuccess) {
        console.log('setUserStateOnSuccess');
        sc.setState({
            cart: event.cart
        });
    }

    @Action(RemoveCartItem)
    removeFromCart(sc: StateContext<CartStateModel>, event: RemoveCartItem) {
        let cart = JSON.parse(localStorage.getItem('cart'));

        cart.items.splice(cart.items.findIndex(it => it.id === event.cartitem.id), 1);
        sc.setState({
            cart
        });
        localStorage.setItem('cart', JSON.stringify(cart));
        if (cart.items.length === 0) localStorage.removeItem('cart');
    }

    @Action(SubtractCartItem)
    removeItemFromCart(sc: StateContext<CartStateModel>, event: SubtractCartItem) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        cart.items.map(it => {
            if (it.id === event.cartitem.id) {
                it.quantity -= 1;
                if (it.quantity === 0) {
                    cart.items.splice(cart.items.findIndex(it => it.id === event.cartitem.id), 1);
                }
            }
        });

        sc.setState({
            cart
        });
        localStorage.setItem('cart', JSON.stringify(cart));
        if (cart.items.length === 0) localStorage.removeItem('cart');
    }

    @Action(AddCartItem)
    addToCart(sc: StateContext<CartStateModel>, event: AddCartItem) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (!cart) {
            console.log('sss');
            cart = { items: [], total: 0 };
            cart.items.push(event.cartitem);
        } 
        else if (cart.items.findIndex(it => it.id === event.cartitem.id) === -1) {
            cart.items.push(event.cartitem);
        }
        else { cart.items.map(it => {
            console.log('sss', it.id, event.cartitem.id);
            if (it.id === event.cartitem.id) {
                it.quantity += 1;
            }
        })};
        cart.total += event.cartitem.price;
        sc.setState({
            cart
        });
        localStorage.setItem('cart', JSON.stringify(cart));
    }

}