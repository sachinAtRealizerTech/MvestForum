import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MvestUserProfileComponent } from './mvest-user-profile.component';

describe('MvestUserProfileComponent', () => {
  let component: MvestUserProfileComponent;
  let fixture: ComponentFixture<MvestUserProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MvestUserProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MvestUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
