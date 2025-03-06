import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyTaskListComponent } from './daily-task-list.component';

describe('DailyTaskListComponent', () => {
  let component: DailyTaskListComponent;
  let fixture: ComponentFixture<DailyTaskListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailyTaskListComponent]
    });
    fixture = TestBed.createComponent(DailyTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
