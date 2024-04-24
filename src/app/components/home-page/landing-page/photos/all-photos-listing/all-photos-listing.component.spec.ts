import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPhotosListingComponent } from './all-photos-listing.component';

describe('AllPhotosListingComponent', () => {
  let component: AllPhotosListingComponent;
  let fixture: ComponentFixture<AllPhotosListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllPhotosListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllPhotosListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
