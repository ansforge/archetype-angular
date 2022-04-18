import {Component, OnInit, ViewChild} from '@angular/core';
import {DEFAULT_INTERRUPTSOURCES, Idle} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';
import {Router} from '@angular/router';
import {ModalDirective} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  title = 'angular-idle-timeout';
  history = [];

  @ViewChild('childModal') childModal: ModalDirective;

  constructor(private readonly idle: Idle, private readonly keepalive: Keepalive, private readonly router: Router) {

    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(900);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle.';
      console.log(this.idleState);
      this.reset();
    });

    // sets the ping interval to 15 seconds
    keepalive.interval(15);

    keepalive.onPing.subscribe(() => this.lastPing = new Date());



  }

  reset() {
    this.idle.watch();
    this.timedOut = false;
  }

  
  ngOnInit() {

  }

}
