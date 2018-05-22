// Models
export interface Subcategory {
    id?: string;
    categoryId?: string;
    name?: string;
}
export interface SubcategoryStateModel {
    subcategories?: Subcategory[];
    subcategoriesByCategory?: Subcategory[];
    message?: any;
}
// Actions
export class LoadSubcategories {
    static type = '[Subcategory] Laod Subcategories';
    constructor(public categoryId: string) {}
}
export class LoadSubcategoriesSuccess {
    static type = '[Subcategory] Laod Subcategories Success';
    constructor(public subcategories: Subcategory[]) {}
}
export class LoadSubcategoriesFailure {
    static type = '[Subcategory] Laod Subcategories Failure';
    constructor(public error: any) {}
}
export class AddSubcategory {
    static type = '[Subcategory] Add subcategory';
    constructor(public subcategory: Subcategory) {}
}
export class AddSubcategorySuccess {
    static type = '[Subcategory] Add Subcategory Success';
    constructor(public success: any) {}
}
export class AddSubcategoryFailure {
    static type = '[Subcategory] Add Subcategory Failure';
    constructor(public error: any) {}
}
// State

import { ApplicationRef } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase';

import { Action, Selector, State, StateContext, Store, NgxsOnInit } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

import { take, tap, map } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { CategoryStateModel } from './category.state';

@State<SubcategoryStateModel>({
    name: 'subcategory',
    defaults: {
      subcategories: [],
      subcategoriesByCategory: [],
      message: null
    }
  })
export class SubcategoryState implements NgxsOnInit { 
    constructor(private store: Store, private afStore: AngularFirestore, private ref: ApplicationRef) {}
    
    @Selector()
    static getSubcategories(state: SubcategoryStateModel) {
      return state.subcategories;
    }
    
    ngxsOnInit(sc: StateContext<SubcategoryStateModel>) {
        //sc.dispatch(new LoadCatgories());
    }

    @Action(LoadSubcategories)
    loadSubcategories(sc: StateContext<SubcategoryStateModel>, event: LoadSubcategories) {
        // console.log('load categories');
        this.afStore.collection('subcategory', ref => ref.where('categoryId', '==', event.categoryId)).snapshotChanges()
        .pipe(
            map(actions => actions.map((a:any) => {
              const data = a.payload.doc.data() as Subcategory;
              const id = a.payload.doc.id;
              return { id, ...data };
            }))
          )        
          .subscribe(res => {
                //console.log('res', res);
                sc.dispatch(new LoadSubcategoriesSuccess(res));
        });
    }

    @Action(AddSubcategory)
    addSubcategory(sc: StateContext<SubcategoryStateModel>, action: AddSubcategory) {
        this.afStore.collection('subcategory').add(action.subcategory)
        .then(fulfil => sc.dispatch(new AddSubcategorySuccess(sc)))
        .catch(reject => sc.dispatch(new AddSubcategoryFailure(reject)));
    }

    @Action(AddSubcategorySuccess)
    addSubcategorySuccess(sc: StateContext<SubcategoryStateModel>, event: AddSubcategorySuccess) {
        sc.setState({
            subcategories: sc.getState().subcategories,
            message: event.success
        })
    }

    @Action(AddSubcategoryFailure)
    addSubcategoryFailure(sc: StateContext<SubcategoryStateModel>, event: AddSubcategoryFailure) {
        sc.setState({
            subcategories: sc.getState().subcategories,
            message: event.error
        })
    }

    @Action(LoadSubcategoriesSuccess)
    setUserStateOnSuccess(sc: StateContext<SubcategoryStateModel>, event: LoadSubcategoriesSuccess) {
      //console.log('setUserStateOnSuccess');
      sc.setState({
        subcategories: event.subcategories
      });
    }
}