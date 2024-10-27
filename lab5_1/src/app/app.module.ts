import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }   from './app.component';
import { ChildComponent } from './components/child.component';
import {MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports:      [ BrowserModule, FormsModule, MatTableModule, BrowserAnimationsModule ],
    declarations: [ AppComponent, ChildComponent ],
    bootstrap:    [ AppComponent ],
})
export class AppModule { }
