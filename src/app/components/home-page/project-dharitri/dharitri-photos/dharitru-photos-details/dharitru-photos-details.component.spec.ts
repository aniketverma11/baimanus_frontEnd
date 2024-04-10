import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DharitruPhotosDetailsComponent } from './dharitru-photos-details.component';

describe('DharitruPhotosDetailsComponent', () => {
  let component: DharitruPhotosDetailsComponent;
  let fixture: ComponentFixture<DharitruPhotosDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DharitruPhotosDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DharitruPhotosDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
