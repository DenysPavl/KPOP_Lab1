import { Component, Input } from '@angular/core';
import { User } from './tab2/tab2.page'; // або коректний шлях до вашого User інтерфейсу
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-user-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>User Details</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="close()">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <img [src]="user.imageUrl" alt="User Image" />
      <h2>{{ user.firstName }} {{ user.lastName }}</h2>
      <p>Email: {{ user.email }}</p>
      <p>Username: {{ user.username }}</p>
      <p>Phone: {{ user.phone }}</p>
      <p>Gender: {{ user.gender }}</p>
      <p>Birthday: {{ user.birthday }}</p>
    </ion-content>
  `,
})
export class UserCardComponent {
  @Input() user!: User;

  constructor(private modalController: ModalController) {} // Додайте ModalController

  close() {
    this.modalController.dismiss(); // Закрити модальне вікно
  }
}
