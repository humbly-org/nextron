import { Atom, atom } from 'jotai';
import { PatientType } from '../types';
import { atomWithBroadcast } from './atomWithBroadcast';
import type { PrimitiveAtom } from 'jotai';

export const visibleAtom = atom(false);
export const patientModalAtom = atom(false);
export const inProgressModalAtom = atom(false);
export const disconnectedModalAtom = atom(false);
export const patientObjectAtom = atom({} as PatientType);

export const calledPatientAtom = atomWithBroadcast<PatientType>(
  'calledPatient',
  null,
);

const initialValue = {
  name: 'Gregório Sampaio da Silva',
  position: 2,
  severity: 'high',
};

export const baseAtom = atom([]);
export const patientsAtom = atom<PrimitiveAtom<PatientType>[]>((get) =>
  get(baseAtom),
);
export const firstPatientsAtom = atom(
  null,
  (get, set, newPatients: PatientType[]) => {
    newPatients.forEach((patient) => {
      const patients = get(patientsAtom);
      const newPatient = atom(patient);
      set(baseAtom, [...patients, newPatient]);
    });
  },
);

export const onHoldPatientsAtom = atom<PrimitiveAtom<PatientType>[]>((get) => {
  const patients = get(patientsAtom);
  console.log(patients);
  return patients.filter((atom) => get(atom).queueType === 'onHold');
});
export const inProgressPatientsAtom = atom<PrimitiveAtom<PatientType>[]>(
  (get) => {
    const patients = get(patientsAtom);
    return patients.filter((atom) => get(atom).queueType === 'inProgress');
  },
);
export const finishedPatientsAtom = atom<PrimitiveAtom<PatientType>[]>(
  (get) => {
    const patients = get(patientsAtom);
    return patients.filter((atom) => get(atom).queueType === 'finished');
  },
);

export const addPatientAtom = atom(null, (get, set, patient: PatientType) => {
  const patients = get(patientsAtom);
  const newPatient = atom(patient);
  set(baseAtom, [...patients, newPatient]);
});

export const updatePatientAtom = atom(
  null,
  (get, set, patient: PatientType) => {
    const patients = get(baseAtom);
    const patientIndex = patients.findIndex(
      (atom: Atom<PatientType>) => get(atom).id === patient.id,
    );
    const newPatient = atom(patient);
    const newPatients = [...patients];
    newPatients[patientIndex] = newPatient;
    set(baseAtom, newPatients);
  },
);

export const testAtom = atomWithBroadcast('test', JSON.stringify(initialValue));
