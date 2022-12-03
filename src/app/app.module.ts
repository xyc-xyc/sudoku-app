import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BoardComponent } from './board/board.component';
import { CellComponent } from './cell/cell.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { LifeComponent } from './life/life.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    CellComponent,
    LifeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
