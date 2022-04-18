import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {HeaderComponent} from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockAuthService;

  beforeEach(waitForAsync(() => {
    mockAuthService = jasmine.createSpyObj(['logout']);
    mockAuthService.logout.and.returnValue();
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
