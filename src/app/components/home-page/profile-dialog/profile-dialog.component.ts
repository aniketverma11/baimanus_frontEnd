import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrl: './profile-dialog.component.css',
})
export class ProfileDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<ProfileDialogComponent>,
    private router: Router
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }

  navigate() {
    this.router.navigate(['/home/dashboard']);
    this.closeDialog();
  }
}
