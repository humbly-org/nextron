import { queueSeverity, queueType } from '../../utils/types';
import dayjs from 'dayjs';

const date = dayjs().subtract(1, 'day').format('DD/MM HH:mm:ss');

export const PatientMock = {
  id: '1',
  name: 'João Víctor Pereira de Souza e Miranda da Silva',
  cpf: '123.456.789-00',
  startAt: date,
  endAt: null,
  queueType: queueType['onHold'],
  severity: queueSeverity['high'],
  queuePosition: 1,
};

export const PatientMockFinished = {
  id: '2',
  name: 'João Víctor Pereira de Souza e Miranda da Silva',
  cpf: '123.456.789-00',
  startAt: date,
  endAt: null,
  queueType: queueType['finished'],
  severity: queueSeverity['high'],
  queuePosition: 1,
};

export const PatientMockInProgress = {
  id: '3',
  name: 'João Víctor Pereira de Souza e Miranda da Silva',
  cpf: '123.456.789-00',
  startAt: date,
  endAt: null,
  queueType: queueType['inProgress'],
  severity: queueSeverity['high'],
  queuePosition: 1,
};
