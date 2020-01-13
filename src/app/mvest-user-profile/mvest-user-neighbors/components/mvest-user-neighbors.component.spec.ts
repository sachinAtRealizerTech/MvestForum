import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MvestUserNeighborsComponent } from './mvest-user-neighbors.component';

describe('MvestUserNeighborsComponent', () => {
  let component: MvestUserNeighborsComponent;
  let fixture: ComponentFixture<MvestUserNeighborsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MvestUserNeighborsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MvestUserNeighborsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
