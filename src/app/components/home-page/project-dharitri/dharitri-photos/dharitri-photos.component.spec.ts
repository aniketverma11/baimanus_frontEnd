import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DharitriPhotosComponent } from './dharitri-photos.component';

describe('DharitriPhotosComponent', () => {
  let component: DharitriPhotosComponent;
  let fixture: ComponentFixture<DharitriPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DharitriPhotosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DharitriPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
