import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberstopComponent } from './memberstop.component';

describe('MemberstopComponent', () => {
  let component: MemberstopComponent;
  let fixture: ComponentFixture<MemberstopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MemberstopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MemberstopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
