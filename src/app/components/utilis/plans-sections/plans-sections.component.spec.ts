import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansSectionsComponent } from './plans-sections.component';

describe('PlansSectionsComponent', () => {
  let component: PlansSectionsComponent;
  let fixture: ComponentFixture<PlansSectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlansSectionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlansSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
