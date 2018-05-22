import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { MatButtonModule, MatCardModule, MATERIAL_SANITY_CHECKS, MatIconModule, MatMenuModule, MatToolbarModule, MatExpansionModule, MatListModule, MatDividerModule } from '@angular/material';

const SHARED_MODULES = [
  CommonModule,
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  CdkAccordionModule,
  MatExpansionModule,
  MatListModule,
  MatDividerModule,
];

@NgModule({
  imports: [...SHARED_MODULES],
  providers: [
    { provide: MATERIAL_SANITY_CHECKS, useValue: false }
  ],
  exports: [...SHARED_MODULES]
})
export class MaterialModule { }