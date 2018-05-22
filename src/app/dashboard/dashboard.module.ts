import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { CategoryToolbarComponent } from './category-toolbar/category-toolbar.component';
import { MatButtonModule, MatCardModule, MATERIAL_SANITY_CHECKS, MatIconModule, MatMenuModule, MatToolbarModule, MatExpansionModule, MatListModule, MatDividerModule, MatProgressBarModule, MatOptionModule, MatSelectModule, MatSidenavModule, MatChipsModule } from '@angular/material';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { CommonModule } from "@angular/common";
import { NgxsModule } from '@ngxs/store';
import { CategoryState } from '../store/category.state';
import { SubcategoryState } from '../store/subcategory.state';
import { FormsModule } from '@angular/forms';
import { ItemlistComponent } from './itemlist/itemlist.component';
import { ItemState } from '../store/item.state';
import { CartComponent } from './cart/cart.component';
import { CartState } from '../store/cart.state';
import { FlexLayoutModule } from '@angular/flex-layout';

export const DASHBOARD_ROUTES: Routes = [
  { path: '', component: DashboardComponent },
];

@NgModule({
  imports: [
    FormsModule,
    SharedModule,
    CommonModule,
    CdkAccordionModule,
    MatCardModule,
    MatExpansionModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatChipsModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatSidenavModule,
    FlexLayoutModule,
    NgxsModule.forFeature([
      CategoryState,
      SubcategoryState,
      ItemState,
      CartState
    ]),
    RouterModule.forChild(DASHBOARD_ROUTES),
    AngularFirestoreModule
  ],
  declarations: [
    DashboardComponent,
    CategoryToolbarComponent,
    ItemlistComponent,
    CartComponent
  ]
})
export class DashboardModule { }