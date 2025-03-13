export default class SaveTaskDto {
  id: number | null;
  name: string;
  description?: string;
  date: Date | string; 
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
}
