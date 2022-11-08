import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Row,
  StyledBadge,
  StyledCol,
  Text,
} from '@nextui-org/react';
import { useAtom } from 'jotai';
import { patientObjectAtom } from '../../atom';
import { initialsFun } from '../../utils';
import { queueSeverity, queueType } from '../../utils/types';
import { SeverityBadge } from '../SeverityBadge';

interface IPatientMock {
  id: number;
  name: string;
  cpf: string;
  startAt: string;
  endAt: string | null;
  queueType: queueType;
  severity: queueSeverity;
  queuePosition: number;
  openModal: (boolean) => void;
}

const queueTypeMapper = (title: string) => {
  const obj = {
    onHold: {
      color: 'success',
    },
    inProgress: {
      color: 'warning',
    },
    finished: {
      color: 'error',
    },
  };
  return obj[title];
};

export const PatientCard = ({
  id,
  name,
  cpf,
  startAt,
  endAt,
  queueType,
  severity,
  openModal,
  queuePosition,
}: IPatientMock) => {
  const { color } = queueTypeMapper(queueType);
  const [, setPatientObject] = useAtom(patientObjectAtom);

  const openModalHandler = () => {
    setPatientObject({
      id,
      name,
      cpf,
    });
    openModal(true);
  };

  return (
    <Card
      isHoverable
      variant='flat'
      borderWeight='bold'
      css={{
        border: '2px solid',
        borderColor: `$${color}`,
        boxShadow: 'unset',
        background: 'white',
        height: 'max-content',
        w: '100%',
        p: '$2',
      }}>
      <Row
        css={{
          border: 'unset',
        }}
        align={'center'}
        justify='space-between'>
        <SeverityBadge severity={severity} />

        <StyledBadge
          isSquared
          as={'div'}
          css={{
            color: '$white',
          }}
          color='success'>
          {startAt}
        </StyledBadge>
      </Row>
      <Row
        css={{
          my: '$4',
          ml: '$6',
        }}>
        <Avatar squared text={initialsFun(name)} size='lg' />
        <div
          style={{
            width: '-webkit-fill-available',
            maxWidth: '100%',
            display: 'flex',
            marginLeft: '12px',
            border: 'unset',
            flexDirection: 'column',
          }}>
          <Text
            as='div'
            css={{ border: 'unset', fontWeight: '$extrabold' }}
            size={'$xs'}>
            {cpf}
          </Text>
          <Text
            as='div'
            weight={'black'}
            css={{
              border: 'unset',
              lh: '1',
              mb: '$2',
              mw: '100%',
            }}
            size={'$md'}>
            {name}
          </Text>
        </div>
      </Row>
      <Row justify='space-between' align='flex-end'>
        <StyledBadge
          isSquared
          as={'div'}
          css={{
            color: '$white',
          }}
          color={
            endAt ? 'primary' : queueType === 'finished' ? 'error' : 'secondary'
          }>
          {endAt
            ? endAt
            : queueType === 'finished'
            ? 'Finalizado'
            : 'Em atendimento'}
        </StyledBadge>
        <Row
          justify='flex-end'
          css={{
            gap: '$4',
          }}>
          {queueType !== 'onHold' && (
            <Button
              size={'xs'}
              disabled
              css={{
                backgroundColor: '$warning',
              }}>
              Solicitação
            </Button>
          )}
          <Button
            size={'xs'}
            onClick={openModalHandler}
            css={{
              backgroundColor: '$success',
            }}>
            Chamar
          </Button>
        </Row>
      </Row>
    </Card>
  );
};
