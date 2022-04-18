import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {Component} from '@angular/core';
import {Idle} from '@ng-idle/core';
import {Keepalive, NgIdleKeepaliveModule} from '@ng-idle/keepalive';
import {Router} from '@angular/router';
import {of} from 'rxjs';
import {ModalModule} from 'ngx-bootstrap/modal';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockIdle;
  let mockKeepalive;
  let mockRouter;
  let mockSessionService;
  let errors;
  let mockAuthService;
  @Component({
    selector: 'app-loader',
    template: '<div> </div>'
  })
  class FakeLoaderCorComponent {
  }

  @Component({
    selector: 'app-header',
    template: '<div> </div>'
  })
  class FakeHeaderCorComponent {
  }

  @Component({
    selector: 'app-footer',
    template: '<div> </div>'
  })
  class FakeFooterCorComponent {
  }
  beforeEach(waitForAsync(() => {
    mockAuthService = jasmine.createSpyObj(['logout']);
    mockAuthService.logout.and.returnValue();
    mockSessionService = jasmine.createSpyObj(['setUserLoggedIn', 'getUserLoggedIn']);
    mockSessionService.getUserLoggedIn.and.returnValue(of(true));

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NgIdleKeepaliveModule,
        ModalModule.forRoot(),
      ],
      declarations: [
        AppComponent,
        FakeLoaderCorComponent,
        FakeFooterCorComponent,
        FakeHeaderCorComponent
      ],
      providers: [
        Idle,
        Keepalive,
        {provide: Router, useValue: mockRouter},
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });


  it('should put timout false when call reset', () => {
    component.reset();
    expect(component.timedOut).toBeFalsy();
  });
});
