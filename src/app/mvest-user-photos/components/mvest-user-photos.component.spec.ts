import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MvestUserPhotosComponent } from './mvest-user-photos.component';

describe('MvestUserPhotosComponent', () => {
  let component: MvestUserPhotosComponent;
  let fixture: ComponentFixture<MvestUserPhotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MvestUserPhotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MvestUserPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
