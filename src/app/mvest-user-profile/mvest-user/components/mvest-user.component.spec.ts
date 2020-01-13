import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MvestUserComponent } from './mvest-user.component';

describe('MvestUserComponent', () => {
  let component: MvestUserComponent;
  let fixture: ComponentFixture<MvestUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MvestUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MvestUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
