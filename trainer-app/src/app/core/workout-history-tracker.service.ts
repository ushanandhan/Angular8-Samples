import { Injectable } from '@angular/core';
import { ExercisePlan } from '../workout-runner/model';
import { CoreModule } from './core.module';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: CoreModule
})
export class WorkoutHistoryTrackerService {

  private maxHistoryItems = 20; //Tracking last 20 exercises
  private currentWorkoutLog: WorkoutLogEntry = null;
  private workoutHistory: Array<WorkoutLogEntry> = [];
  private workoutTracked: boolean;
  private storageKey = 'workouts';

  constructor(private storage : LocalStorageService) { 
    this.workoutHistory = (storage.getItem<Array<WorkoutLogEntry>>(this.storageKey) || [])
      .map((item: WorkoutLogEntry) => {
        item.startedOn = new Date(item.startedOn.toString());
        item.endedOn = item.endedOn == null ? null : new Date(item.endedOn.toString());
        return item;
      });
  }

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
    this.storage.setItem(this.storageKey, this.workoutHistory);
  }

  exerciseComplete(exercisePlan: ExercisePlan) {
    console.log(exercisePlan);
    this.currentWorkoutLog.lastExercise = exercisePlan.exercise.title;
    ++this.currentWorkoutLog.exercisesDone;
    this.storage.setItem(this.storageKey, this.workoutHistory);
  }

  endTracking(completed: boolean) {
    this.currentWorkoutLog.completed = completed;
    this.currentWorkoutLog.endedOn = new Date();
    this.currentWorkoutLog = null;
    this.workoutTracked = false;
    this.storage.setItem(this.storageKey, this.workoutHistory);
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
