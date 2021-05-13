import { Component, OnInit } from '@angular/core';
import { WorkoutHistoryTrackerService, WorkoutLogEntry } from '../core/workout-history-tracker.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-workout-history',
  templateUrl: './workout-history.component.html',
  styles:[]
})
export class WorkoutHistoryComponent implements OnInit {

  constructor(private tracker: WorkoutHistoryTrackerService, private location: Location) { }

  history: Array<WorkoutLogEntry> = [];
  completed: boolean;

  ngOnInit() {
    console.log("Test");
    this.history = this.tracker.getHistory();
  }

  goBack() {
    this.location.back();
  }

}
