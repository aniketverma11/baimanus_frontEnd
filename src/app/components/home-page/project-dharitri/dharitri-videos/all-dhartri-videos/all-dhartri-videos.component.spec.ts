import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDhartriVideosComponent } from './all-dhartri-videos.component';

describe('AllDhartriVideosComponent', () => {
  let component: AllDhartriVideosComponent;
  let fixture: ComponentFixture<AllDhartriVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllDhartriVideosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllDhartriVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
