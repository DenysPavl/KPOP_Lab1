import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';
import { UserCardComponent } from '../user-card.component';
import { ModalController } from '@ionic/angular';

export interface User {
  uuid:string;
  firstName: string;
  lastName: string;
  username: string;
  gender: string;
  phone: string;
  email: string;
  password:string;
  imageUrl: string;
  address: string;
  age:number;
  birthday:string;
  isDisabled:boolean
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
/////////////////////////////////////
export class Tab2Page implements OnInit {
  wishlist: User[] = [];

  constructor(private storage: Storage, private modalController: ModalController) {}

  async ngOnInit() {
    // Ініціалізуємо storage перед використанням
    await this.storage.create();
    this.loadWishlist();
  }

  ionViewWillEnter() {
    this.loadWishlist();
  }

  async loadWishlist() {
    const savedWishlist = await this.storage.get('wishlist');
    this.wishlist = savedWishlist ? savedWishlist : [];
  }

  async clearWishlist() {
    this.wishlist = [];
    await this.storage.remove('wishlist');
  }

  async openUserCard(user: User) {
    const modal = await this.modalController.create({
      component: UserCardComponent,
      componentProps: { user: user },
    });
    await modal.present();
  }
  
}
