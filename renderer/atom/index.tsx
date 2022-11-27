import { atom } from 'jotai';
import { PatientType } from '../types';
import { atomWithBroadcast } from './atomWithBroadcast';

export const visibleAtom = atom(false);
export const patientModalAtom = atom(false);
export const patientObjectAtom = atom({
  id: null,
  name: null,
  cpf: null,
});

const initialValue = {
  name: 'Gregório Sampaio da Silva',
  position: 2,
  severity: 'high',
};

export const patientsAtom = atomWithBroadcast<PatientType[]>('patients', []);

export const testAtom = atomWithBroadcast('test', JSON.stringify(initialValue));
