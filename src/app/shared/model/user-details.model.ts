import { Experience } from './experience.model';
import { Skill } from './skill.model';
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
  skills: Skill[];
  jobs: UserJob[];
}
