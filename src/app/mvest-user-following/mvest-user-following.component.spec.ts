import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MvestUserFollowingComponent } from './mvest-user-following.component';

describe('MvestUserFollowingComponent', () => {
  let component: MvestUserFollowingComponent;
  let fixture: ComponentFixture<MvestUserFollowingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MvestUserFollowingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MvestUserFollowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
