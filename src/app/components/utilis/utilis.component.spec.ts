import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisComponent } from './utilis.component';

describe('UtilisComponent', () => {
  let component: UtilisComponent;
  let fixture: ComponentFixture<UtilisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UtilisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UtilisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
