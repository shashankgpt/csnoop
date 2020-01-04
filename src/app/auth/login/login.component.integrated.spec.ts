import { async, ComponentFixture, TestBed } from '@angular/core/testing';
/* Ignore any html component does not know about
 * use for shallow testing
 * drawback: it will ignore any form module ng module error
 */
// import {NO_ERRORS_SCHEMA} from '@angular/core';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../state/authenticate.reducer';
import { AuthEffects } from '../state/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
// you can also mock nested component
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let element: HTMLElement;
  let debugEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [],
      schemas: [
        // NO_ERRORS_SCHEMA
      ],
      imports: [CoreModule, SharedModule, RouterTestingModule, NoopAnimationsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        StoreModule.forFeature('authentications', reducer),
        EffectsModule.forFeature([AuthEffects])],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    element = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('initial display', () => {
    it('initial display', () => {
      component.value = 'Login';
      fixture.detectChanges();
      // expect(element.querySelector('.head-div').textContent)
      // .toContain('Login');

      expect(debugEl.query(By.css('.head-div')).nativeElement.textContent)
      .toContain('Login');
    });
  });
});
