export class JobCreate {
  title: string;
  description: string;
  sourceCodeLink: string;
  estimatedDays: number;
  contactEmail: string;
  priceAmount: number;
  skillsIds?: number[];
}
