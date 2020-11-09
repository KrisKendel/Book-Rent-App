import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-returned-book',
  templateUrl: './returned-book.component.html',
  styleUrls: ['./returned-book.component.scss']
})
export class ReturnedBookComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  async onConfirmBookReturned(): Promise<void> {

  }

  closeDialog(): void {
    this.dialog.closeAll();
  }
}
