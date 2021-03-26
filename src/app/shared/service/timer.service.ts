import { Injectable } from '@angular/core';
import * as moment from 'moment';
import 'moment-duration-format';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  isRunning = false;
  format = 'hh:mm:ss';
  elapsedTime = 0;
  id: any;
  now: BehaviorSubject<string> = new BehaviorSubject(this.formattedTime());

  constructor() {
   }

  tick() {
    if (this.isRunning) {
      this.id = setInterval(() => {
        this.elapsedTime++;
        const now = this.formattedTime();
        this.now.next(now);
      }, 1000);
    } else {
      if (!!this.id) {
        clearInterval(this.id);
      }
    }
  }

  start(format?: string) {
    this.format = format || this.format;
    this.elapsedTime = 0;
    this.isRunning = true;
    this.tick();
    return this.now;
  }

  stop() {
    this.isRunning = false;
    this.elapsedTime = 0;
  }

  pause() {
    this.isRunning = false;
    this.tick();
  }

  resume() {
    this.isRunning = true;
    this.tick();
  }

  formattedTime() {
    return moment.duration(this.elapsedTime, 'seconds').format(this.format,  { trim: false });
  }

}
