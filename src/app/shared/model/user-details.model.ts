import { Experience } from './experience.model';
import { Field } from './field.model';
import { Technology } from './technology.model';
import { UserJob } from './user-job.model';

export class UserDetails {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  description: string;
  roleId: number;
  roleName: string;
  isActive: boolean;
  insertDate: Date;
  profilePic: string;
  experience: Experience[];
  fields: Field[];
  technologies: Technology[];
  jobs: UserJob[];
}
