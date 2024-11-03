import { Component } from '@angular/core';
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

export interface Response {
  results: any[];
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
/////////////////////////////////////
export class Tab1Page {
  dataSource: User[] = [];
  wishlist: User[] = [];

  constructor(private http: HttpClient,private storage: Storage, public modalController: ModalController) {
    this.fetchRandomUser();
  }

  getUsers(size: number = 10): Observable<Response> {
    return this.http.get<Response>(`https://randomuser.me/api/?results=${size}`).pipe(
      map(response => this.processResponse(response))
    );
  }

  fetchRandomUser(): void {
    this.getUsers(15).subscribe(
      (response: Response) => {
        this.dataSource = response.results;
      },
      error => console.error('Error fetching random users:', error)
    );
  }

  processResponse(response: Response): Response {
    return {
      results: response.results.map((user: any)=> (<User>{
        uuid:user.login.uuid,
        firstName: user.name.first,
        lastName: user.name.last,
        username: user.login.username,
        gender: user.gender,
        phone: user.phone,
        email: user.email,
        password: user.login.password,
        imageUrl: user.picture.medium,
        birthday: user.dob.date,
        age: user.dob.age,
        address: `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}`,
        isDisabled:false
      }))
    };
  }

  async addWishList(user: User) {
    user.isDisabled = true;
    this.wishlist = [...this.wishlist, user];
    await this.storage.set('wishlist', this.wishlist);
  }

  async openUserCard(user: User) {
    const modal = await this.modalController.create({
      component: UserCardComponent,
      componentProps: { user: user },
    });
    await modal.present();
  }
}
