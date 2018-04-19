import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteDataSetComponent } from './complete-data-set.component';

describe('CompleteDataSetComponent', () => {
  let component: CompleteDataSetComponent;
  let fixture: ComponentFixture<CompleteDataSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteDataSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteDataSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
