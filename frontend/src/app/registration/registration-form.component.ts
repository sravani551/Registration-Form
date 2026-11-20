import { Component, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AbstractControl, ReactiveFormsModule, ValidationErrors, Validators, NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiProblem } from './registration.model';
import { RegistrationService } from './registration.service';

const NAME_PATTERN = /^[\p{L}][\p{L} '-]*$/u;
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['application/pdf', 'image/png', 'image/jpeg'];

function pastDate(control: AbstractControl): ValidationErrors | null {
  return control.value && new Date(control.value) >= new Date() ? { future: true } : null;
}

@Component({
  selector: 'app-registration-form',
  imports: [ReactiveFormsModule],
  templateUrl: './registration-form.component.html',
})
export class RegistrationFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly service = inject(RegistrationService);
  private readonly router = inject(Router);

  readonly form = this.fb.group({
    firstName: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(NAME_PATTERN)]],
    lastName: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(NAME_PATTERN)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(72)]],
    gender: ['', Validators.required],
    dob: ['', [Validators.required, pastDate]],
  });

  readonly submitting = signal(false);
  readonly serverErrors = signal<Partial<Record<string, string>>>({});
  readonly generalError = signal<string | null>(null);
  readonly fileError = signal<string | null>(null);
  private file: File | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    this.fileError.set(null);
    if (file && !ALLOWED_TYPES.includes(file.type)) {
      this.fileError.set('Only PDF, PNG or JPEG files are allowed.');
    } else if (file && file.size > MAX_FILE_BYTES) {
      this.fileError.set('File must be 5 MB or smaller.');
    }
    this.file = this.fileError() ? null : file;
  }

  invalid(name: string): boolean {
    const control = this.form.get(name);
    return !!(control && control.invalid && (control.touched || control.dirty)) || !!this.serverErrors()[name];
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid || this.fileError()) {
      return;
    }
    this.submitting.set(true);
    this.serverErrors.set({});
    this.generalError.set(null);

    this.service.create(this.form.getRawValue(), this.file).subscribe({
      next: () => this.router.navigate(['/registrations']),
      error: (err: HttpErrorResponse) => {
        this.submitting.set(false);
        const problem = err.error as ApiProblem | null;
        if (problem?.errors) {
          this.serverErrors.set(problem.errors);
        }
        this.generalError.set(problem?.detail ?? 'Something went wrong. Please try again.');
      },
    });
  }
}
