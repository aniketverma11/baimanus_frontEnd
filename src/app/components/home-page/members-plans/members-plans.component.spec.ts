import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersPlansComponent } from './members-plans.component';

describe('MembersPlansComponent', () => {
  let component: MembersPlansComponent;
  let fixture: ComponentFixture<MembersPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MembersPlansComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MembersPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
