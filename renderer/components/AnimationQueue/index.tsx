import { Atom, PrimitiveAtom, useAtom } from 'jotai';
import { useTransition, a } from '@react-spring/web';
import { PatientType } from '../../types';
import { PatientCard } from '../PatientCard';
import { PatientQueue } from '../PatientQueue';

interface IAnimationQueue {
  title: 'Na fila' | 'Em atendimento' | 'Finalizados';
  atom: Atom<PrimitiveAtom<PatientType>[]>;
  setVisible: (boolean) => void;
}

export const AnimationQueue = ({
  title,
  atom,
  setVisible,
}: IAnimationQueue) => {
  const [patients] = useAtom<PrimitiveAtom<PatientType>[]>(atom);
  const transitions = useTransition(patients, {
    keys: (patient) => patient.toString(),
    sort: (a: any, b: any) => a.init.queuePosition - b.init.queuePosition,
    delay: 500,
    from: { opacity: 0, transform: 'translate3d(0, -40px, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0, 0px, 0)' },
    leave: { opacity: 0, transform: 'translate3d(0, -40px, 0)' },
  });

  return (
    <PatientQueue title={title} patientCount={patients.length}>
      {transitions((style, atom) => (
        <a.div style={style}>
          <PatientCard atom={atom} openModal={setVisible} />
        </a.div>
      ))}
    </PatientQueue>
  );
};
