import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Registration } from './registration.model';

export interface RegistrationInput {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  gender: string;
  dob: string;
}

@Injectable({ providedIn: 'root' })
export class RegistrationService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/registrations';

  list(): Observable<Registration[]> {
    return this.http.get<Registration[]>(this.baseUrl);
  }

  create(input: RegistrationInput, file?: File | null): Observable<Registration> {
    return this.http.post<Registration>(this.baseUrl, this.toFormData(input, file));
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  private toFormData(input: RegistrationInput, file?: File | null): FormData {
    const data = new FormData();
    Object.entries(input).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        data.append(key, value);
      }
    });
    if (file) {
      data.append('file', file);
    }
    return data;
  }
}
