import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionslistComponent } from './discussionslist.component';

describe('DiscussionslistComponent', () => {
  let component: DiscussionslistComponent;
  let fixture: ComponentFixture<DiscussionslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscussionslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussionslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
