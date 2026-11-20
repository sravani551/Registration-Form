import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

import { RegistrationFormComponent } from './registration-form.component';
import { Registration } from './registration.model';
import { RegistrationService } from './registration.service';

describe('RegistrationFormComponent', () => {
  let fixture: ComponentFixture<RegistrationFormComponent>;
  let component: RegistrationFormComponent;
  let service: jasmine.SpyObj<RegistrationService>;

  const valid = {
    firstName: 'Ada', lastName: 'Lovelace', email: 'ada@example.com',
    password: 's3cret-pass', gender: 'FEMALE', dob: '1990-12-10',
  };

  beforeEach(async () => {
    service = jasmine.createSpyObj<RegistrationService>('RegistrationService', ['create']);
    await TestBed.configureTestingModule({
      imports: [RegistrationFormComponent],
      providers: [provideRouter([]), { provide: RegistrationService, useValue: service }],
    }).compileComponents();
    fixture = TestBed.createComponent(RegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('does not submit an invalid form', () => {
    component.form.patchValue({ ...valid, firstName: 'Ada1', dob: '2999-01-01' });
    component.submit();
    expect(service.create).not.toHaveBeenCalled();
    expect(component.form.controls.firstName.hasError('pattern')).toBeTrue();
    expect(component.form.controls.dob.hasError('future')).toBeTrue();
  });

  it('submits a valid form and navigates to the list', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.resolveTo(true);
    service.create.and.returnValue(of({} as Registration));
    component.form.setValue(valid);
    component.submit();
    expect(service.create).toHaveBeenCalledWith(valid, null);
    expect(router.navigate).toHaveBeenCalledWith(['/registrations']);
  });

  it('shows field errors returned by the API', () => {
    service.create.and.returnValue(throwError(() => new HttpErrorResponse({
      status: 409,
      error: { status: 409, detail: 'Email is already registered', errors: { email: 'is already registered' } },
    })));
    component.form.setValue(valid);
    component.submit();
    expect(component.serverErrors()['email']).toBe('is already registered');
    expect(component.generalError()).toBe('Email is already registered');
    expect(component.submitting()).toBeFalse();
  });

  it('rejects unsupported file types before upload', () => {
    const file = new File(['x'], 'x.exe', { type: 'application/x-msdownload' });
    component.onFileSelected({ target: { files: [file] } } as unknown as Event);
    expect(component.fileError()).toContain('PDF');
  });
});
