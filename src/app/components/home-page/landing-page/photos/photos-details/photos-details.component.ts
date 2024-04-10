import { environment } from '../../../../../../enviroments/environment';
import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  Inject,
  Input,
  effect,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { SwiperContainer } from 'swiper/element/bundle';

@Component({
  selector: 'app-photos-details',
  templateUrl: './photos-details.component.html',
  styleUrl: './photos-details.component.css',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PhotosDetailsComponent {
  public currentIndex = 0;
  public imageBaseURL = environment.imagesBaseURL;
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any[],
    private dialogRef: MatDialogRef<PhotosDetailsComponent>
  ) {}

  ngOnInit() {}
  close() {
    console.log('cloe');

    this.dialogRef.close();
  }
  updateIndex(index: any) {
    this.currentIndex = index;
  }
}
