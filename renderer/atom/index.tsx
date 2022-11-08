import { atom } from 'jotai';
import { atomWithBroadcast } from './atomWithBroadcast';

export const visibleAtom = atom(false);
export const patientModalAtom = atom(false);
export const patientObjectAtom = atom({
  id: null,
  name: null,
  cpf: null,
});
export const testAtom = atomWithBroadcast('test', 'test');
