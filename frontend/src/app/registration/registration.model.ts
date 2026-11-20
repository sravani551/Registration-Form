export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export interface Registration {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: Gender;
  dob: string;
  attachmentName: string | null;
  createdAt: string;
}

/** RFC 9457 problem detail returned by the API, with optional per-field errors. */
export interface ApiProblem {
  status: number;
  detail?: string;
  errors?: Record<string, string>;
}
