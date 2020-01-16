import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeddiscussionlistComponent } from './addeddiscussionlist.component';

describe('AddeddiscussionlistComponent', () => {
  let component: AddeddiscussionlistComponent;
  let fixture: ComponentFixture<AddeddiscussionlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeddiscussionlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeddiscussionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
