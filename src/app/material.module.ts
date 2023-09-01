import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';

/** Table */
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
/** ================== */

import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';
//show dialog
import {MatDialogModule} from "@angular/material/dialog"
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

/** Back-to-top + MatIconModule + MatButtonModule*/
import { ScrollingModule } from '@angular/cdk/scrolling';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
/** ================== */

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatMenuModule,
    MatExpansionModule,
    MatFormFieldModule,

    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatGridListModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule,
    ScrollingModule,
    MatProgressSpinnerModule,
    MatTabsModule
  ],
  exports: [
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatMenuModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatGridListModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule,
    ScrollingModule,
    MatProgressSpinnerModule,
    MatTabsModule
  ]
})
export class MaterialModule { }
