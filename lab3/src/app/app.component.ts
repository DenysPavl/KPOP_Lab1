import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<label>Введіть текст:</label>
    <input [(ngModel)]="name" (ngModelChange)="reverseText()" placeholder="Текст">
    <h1>Текст: {{name}}</h1>
    <h1>Перевернутий текст: {{reversedName}}</h1>`
    //templateUrl: './app.component.html'
})
export class AppComponent { 
  name: string = '';
  reversedName: string = '';

  reverseText(): void {
    this.reversedName = this.name.split("").reverse().join("");
  }
}