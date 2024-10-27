import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [`./style.css`]
})
export class AppComponent { 
  arr:number[]=[];
  str:string = "";

  getArray():void {
    const numbers = this.str.match(/-?\d+\.?\d*/g);
    this.arr = numbers ? numbers.map(num => parseFloat(num)) : [];
  }
}
