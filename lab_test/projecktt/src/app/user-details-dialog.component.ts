import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from './app.component';  // Імпортуйте інтерфейс користувача з основного компонента

@Component({
  selector: 'app-user-details-dialog',
  template: `
    <div class="dialog-container">
  <div class="dialog-header">Деталі користувача</div>
  
  <div class="dialog-content">
    <p><strong>Ім'я:</strong> {{ data.firstName }} {{ data.lastName }}</p>
    <p><strong>Username:</strong> {{ data.username }}</p>
    <p><strong>Телефон:</strong> {{ data.phone }}</p>
    <p><strong>Стать:</strong> {{ data.gender }}</p>
    <p><strong>Email:</strong> {{ data.email }}</p>
    <p><strong>Адреса:</strong> {{ data.address }}</p>
  </div>
  
  <img class="user-image" [src]="data.imageUrl" alt="User Image">
</div>`,
  styleUrl: './dialog.css'
})
export class UserDetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: User) {}
}