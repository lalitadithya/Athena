import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamaterComponent } from './paramater.component';

describe('ParamaterComponent', () => {
  let component: ParamaterComponent;
  let fixture: ComponentFixture<ParamaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParamaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
