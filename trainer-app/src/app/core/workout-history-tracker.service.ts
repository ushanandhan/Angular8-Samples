import { Injectable } from '@angular/core';
import { ExercisePlan } from '../workout-runner/model';
import { CoreModule } from './core.module';

@Injectable({
  providedIn: CoreModule
})
export class WorkoutHistoryTrackerService {

  private maxHistoryItems = 20; //Tracking last 20 exercises
  private currentWorkoutLog: WorkoutLogEntry = null;
  private workoutHistory: Array<WorkoutLogEntry> = [];
  private workoutTracked: boolean;

  constructor() { }

  get tracking(): boolean {
    return this.workoutTracked;
  }

  startTracking() {
    this.workoutTracked = true;
    this.currentWorkoutLog = new WorkoutLogEntry(new Date());
    if (this.workoutHistory.length >= this.maxHistoryItems) {
      this.workoutHistory.shift();
    }
    this.workoutHistory.push(this.currentWorkoutLog);
  }

  exerciseComplete(exercisePlan: ExercisePlan) {
    console.log(exercisePlan);
    this.currentWorkoutLog.lastExercise = exercisePlan.exercise.title;
    ++this.currentWorkoutLog.exercisesDone;
  }

  endTracking(completed: boolean) {
    this.currentWorkoutLog.completed = completed;
    this.currentWorkoutLog.endedOn = new Date();
    this.currentWorkoutLog = null;
    this.workoutTracked = false;
  }

  getHistory(): Array<WorkoutLogEntry> {
    return this.workoutHistory;
  }

}

export class WorkoutLogEntry {
  constructor(
    public startedOn: Date,
    public completed: boolean = false,
    public exercisesDone: number = 0,
    public lastExercise?: string,
    public endedOn?: Date) { }
}
