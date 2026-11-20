import { Component, OnInit, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Registration } from './registration.model';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-registration-list',
  imports: [DatePipe, RouterLink],
  templateUrl: './registration-list.component.html',
})
export class RegistrationListComponent implements OnInit {
  private readonly service = inject(RegistrationService);

  readonly registrations = signal<Registration[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.service.list().subscribe({
      next: (items) => {
        this.registrations.set(items);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Could not load registrations. Is the backend running?');
        this.loading.set(false);
      },
    });
  }

  remove(item: Registration): void {
    if (!confirm(`Delete the registration for ${item.firstName} ${item.lastName}?`)) {
      return;
    }
    this.service.delete(item.id).subscribe({
      next: () => this.registrations.update((list) => list.filter((r) => r.id !== item.id)),
      error: () => this.error.set('Delete failed. Please try again.'),
    });
  }
}
