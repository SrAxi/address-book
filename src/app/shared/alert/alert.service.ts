import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Alert } from '../models';

@Injectable()
export class AlertService {
  private subject = new Subject<Alert>();

  constructor(private router: Router) {
    // clear alert message on route change
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // clear alert
        this.subject.next();
      }
    });
  }

  success(message: string, timer?: number) {
    this.subject.next(<Alert>{ type: 'success', text: message });
    this.clearAlertTimer(timer);
  }

  error(message: string, timer?: number) {
    this.subject.next(<Alert>{ type: 'danger', text: message });
    this.clearAlertTimer(timer);
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  private clearAlertTimer(timer = 4000) {
    setTimeout(() => this.subject.next(), timer);
  }
}
