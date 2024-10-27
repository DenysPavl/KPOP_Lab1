import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailsDialogComponent } from '../user-details-dialog.component';
import { User } from '../app.component';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnChanges {
  @Input() dataSource2: any | undefined;
  displayedColumns: string[] = ['firstName', 'lastName', 'gender', 'birthday', 'age'];

  constructor(public dialog: MatDialog, private cdr: ChangeDetectorRef) {}

  openDialog(user: User): void {
    this.dialog.open(UserDetailsDialogComponent, {
      width: '400px',
      data: user,
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSource2']) {
      this.cdr.detectChanges();
    }
  }
}
