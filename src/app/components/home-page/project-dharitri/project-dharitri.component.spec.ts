import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDharitriComponent } from './project-dharitri.component';

describe('ProjectDharitriComponent', () => {
  let component: ProjectDharitriComponent;
  let fixture: ComponentFixture<ProjectDharitriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectDharitriComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectDharitriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
