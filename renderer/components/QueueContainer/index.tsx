import { Container } from '@nextui-org/react';
import {
  finishedPatientsAtom,
  inProgressPatientsAtom,
  onHoldPatientsAtom,
} from '../../atom';
import { AnimationQueue } from '../AnimationQueue';

interface IQueueContainer {
  setVisible: (boolean: boolean) => void;
}

export const QueueContainer = ({ setVisible }: IQueueContainer) => {
  return (
    <Container
      css={{
        mw: 'inherit',
        p: '$0',
        pb: '$8',
        m: '0px',
        flexWrap: 'nowrap',
        height: '95vh',
      }}
      display='flex'>
      <AnimationQueue
        title='Na fila'
        atom={onHoldPatientsAtom}
        setVisible={setVisible}
      />
      <AnimationQueue
        title='Em atendimento'
        atom={inProgressPatientsAtom}
        setVisible={setVisible}
      />
      <AnimationQueue
        title='Finalizados'
        atom={finishedPatientsAtom}
        setVisible={setVisible}
      />
    </Container>
  );
};
