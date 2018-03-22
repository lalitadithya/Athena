import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyHomePageComponent } from './my-home-page.component';

describe('MyHomePageComponent', () => {
  let component: MyHomePageComponent;
  let fixture: ComponentFixture<MyHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyHomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
