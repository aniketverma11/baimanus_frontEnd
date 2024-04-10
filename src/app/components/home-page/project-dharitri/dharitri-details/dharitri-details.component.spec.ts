import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DharitriDetailsComponent } from './dharitri-details.component';

describe('DharitriDetailsComponent', () => {
  let component: DharitriDetailsComponent;
  let fixture: ComponentFixture<DharitriDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DharitriDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DharitriDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
