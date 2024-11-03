import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailsDialogComponent } from './user-details-dialog.component';
import { ChildComponent } from './child/child.component';
import { ChangeDetectorRef} from '@angular/core';

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
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSlideToggleModule, MatTableModule, HttpClientModule, ChildComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  //displayedColumns: string[] = ['uuid', 'username', 'phone', 'gender'];
  displayedColumns: string[] = ['firstName', 'lastName', 'gender', 'birthday','age','btn'];
  dataSource:any;
  wishlist:any = [];
  name:any;
  response:Response | undefined;
  users:any;
  isDisabled = false;

  constructor(private http: HttpClient, public dialog: MatDialog, private cdr: ChangeDetectorRef) {
    this.fetchRandomUser();
    this.users = this.response?.results
    this.dataSource = this.users
  }

  getUsers(size: number = 10): Observable<any> {
    return this.http.get<any>(`https://randomuser.me/api/?results=${size}`).pipe(
      map((response) => this.processResponse(response)));
  }

  getUser(uuid:number = 1): Observable<any>{
    return this.http.get<any>(`https://randomuser.me/api/?uuid=${uuid}`)
  }

  fetchRandomUser(): void {
    this.getUsers(15).subscribe(
      (response: Response) => {
        this.response = response;
      },
      (error) => console.error('Error fetching random users:', error)
    );
  }

  processResponse(response: Response): Response {
    return{
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
    }
  }

  openDialog(user: User): void {
    this.dialog.open(UserDetailsDialogComponent, {
      width: '400px',
      data: user,
    });
  }

  addWishList(user: User):void{
    this.wishlist = [...this.wishlist, user];
    user.isDisabled = true;
    this.cdr.detectChanges();
  }

}
