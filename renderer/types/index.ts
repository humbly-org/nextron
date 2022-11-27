import { queueSeverity, queueType } from '../utils';

export type PatientType = {
  id: string;
  name: string;
  cpf: string;
  startAt: Date;
  endAt: null | Date;
  queueType: queueType;
  severity: queueSeverity;
  queuePosition: number;
};
