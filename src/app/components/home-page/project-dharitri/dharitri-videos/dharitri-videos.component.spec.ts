import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DharitriVideosComponent } from './dharitri-videos.component';

describe('DharitriVideosComponent', () => {
  let component: DharitriVideosComponent;
  let fixture: ComponentFixture<DharitriVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DharitriVideosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DharitriVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
