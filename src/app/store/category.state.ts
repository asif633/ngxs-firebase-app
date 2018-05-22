// Models
export interface Category {
    id?: string;
    name?: string;
    subcategories?: Subcategory[];
}
export interface CategoryStateModel {
    categories?: Category[];
    message?: any;
}
// Actions
export class LoadCatgories {
    static type = '[Category] Laod Categories';
}
export class LoadCategoriesSuccess {
    static type = '[Category] Laod Categories Success';
    constructor(public categories: Category[]) { }
}
export class LoadCategoriesFailure {
    static type = '[Category] Laod Categories Failure';
    constructor(public error: any) { }
}
export class AddCategory {
    static type = '[Category] Add category';
    constructor(public category: Category) { }
}
export class AddCategorySuccess {
    static type = '[Category] Add Category Success';
    constructor(public success: any) { }
}
export class AddCategoryFailure {
    static type = '[Category] Add Category Failure';
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

@State<CategoryStateModel>({
    name: 'category',
    defaults: {
        categories: [],
        message: null
    }
})
export class CategoryState implements NgxsOnInit {
    constructor(private store: Store, private afStore: AngularFirestore, private ref: ApplicationRef) { }

    @Selector()
    static getCategories(state: CategoryStateModel) {
        return state.categories;
    }

    @Selector()
    static getCategory(state: CategoryStateModel, categoryId: string) {
        return state.categories;
    }

    ngxsOnInit(sc: StateContext<CategoryStateModel>) {
        //sc.dispatch(new LoadCatgories());
    }

    @Action(LoadCatgories)
    loadCategories(sc: StateContext<CategoryStateModel>) {
        console.log('load categories');
        this.afStore.collection('category').snapshotChanges()
            .pipe(
                map(actions => actions.map((a: any) => {
                    const data = a.payload.doc.data() as Category;
                    const id = a.payload.doc.id;
                    return { id, ...data };
                }))
                )
            .subscribe(res => {
                console.log('res', res);
                sc.dispatch(new LoadCategoriesSuccess(res));
            });
    }

    @Action(AddCategory)
    addCategory(sc: StateContext<CategoryStateModel>, action: AddCategory) {
        this.afStore.collection('category').add(action.category)
            .then(fulfil => sc.dispatch(new AddCategorySuccess(sc)))
            .catch(reject => sc.dispatch(new AddCategoryFailure(reject)));
    }

    @Action(AddCategorySuccess)
    addCategorySuccess(sc: StateContext<CategoryStateModel>, event: AddCategorySuccess) {
        sc.setState({
            categories: sc.getState().categories,
            message: event.success
        })
    }

    @Action(AddCategoryFailure)
    addCategoryFailure(sc: StateContext<CategoryStateModel>, event: AddCategoryFailure) {
        sc.setState({
            categories: sc.getState().categories,
            message: event.error
        })
    }

    @Action(LoadCategoriesSuccess)
    setUserStateOnSuccess(sc: StateContext<CategoryStateModel>, event: LoadCategoriesSuccess) {
        console.log('setUserStateOnSuccess');
        sc.setState({
            categories: event.categories
        });
    }
}