import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { RegistrationService } from './registration.service';

describe('RegistrationService', () => {
  let service: RegistrationService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(RegistrationService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('posts multipart form data, skipping empty fields and including the file', () => {
    const file = new File(['%PDF'], 'cv.pdf', { type: 'application/pdf' });
    service
      .create({ firstName: 'Ada', lastName: 'Lovelace', email: 'ada@example.com', password: '', gender: 'FEMALE', dob: '1990-12-10' }, file)
      .subscribe();

    const req = http.expectOne('/api/registrations');
    expect(req.request.method).toBe('POST');
    const body = req.request.body as FormData;
    expect(body.get('firstName')).toBe('Ada');
    expect(body.has('password')).toBeFalse();
    expect((body.get('file') as File).name).toBe('cv.pdf');
    req.flush({});
  });

  it('deletes by id', () => {
    service.delete('42').subscribe();
    const req = http.expectOne('/api/registrations/42');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
