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
import dayjs from 'dayjs';
import { PrimitiveAtom, useAtom, useSetAtom } from 'jotai';
import { inProgressModalAtom, patientObjectAtom } from '../../atom';
import { PatientType } from '../../types';
import { initialsFun } from '../../utils';
import { queueSeverity, queueType } from '../../utils/types';
import { SeverityBadge } from '../SeverityBadge';

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

interface IPatientCard {
  atom: PrimitiveAtom<PatientType>;
  openModal: (boolean: boolean) => void;
}

export const PatientCard = ({ atom, openModal }: IPatientCard) => {
  const setPatientObject = useSetAtom(patientObjectAtom);
  const setVisibleInProgressModal = useSetAtom(inProgressModalAtom);
  const [patient] = useAtom(atom);
  const { name, severity, queueType, cpf, endAt, startAt } = patient;
  const { color } = queueTypeMapper(patient.queueType);

  const queueTypeModal = (queueType: any) => {
    const obj = {
      onHold: () => {
        setPatientObject(patient);
        openModal(true);
      },
      inProgress: () => {
        setPatientObject(patient);
        setVisibleInProgressModal(true);
        console.log('inProgress');
      },
    };
    if (obj[queueType]) return obj[queueType]();
  };

  return (
    <Card
      isHoverable
      variant='bordered'
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
          {dayjs(startAt).format('HH:mm:ss')}
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
        {queueType !== 'onHold' ? (
          <StyledBadge
            isSquared
            as={'div'}
            css={{
              color: '$white',
            }}
            color={
              endAt
                ? 'primary'
                : queueType === 'finished'
                ? 'error'
                : 'secondary'
            }>
            {endAt
              ? (endAt as unknown as string)
              : queueType === 'finished'
              ? 'Finalizado'
              : 'Em atendimento'}
          </StyledBadge>
        ) : (
          ''
        )}
        <Row
          justify='flex-end'
          css={{
            gap: '$4',
          }}>
          {queueType == 'inProgress' && (
            <Button
              size={'xs'}
              disabled
              css={{
                backgroundColor: '$warning',
              }}>
              Solicitação
            </Button>
          )}
          {queueType !== 'finished' && (
            <Button
              size={'xs'}
              onClick={() => queueTypeModal(queueType) as any}
              css={{
                backgroundColor:
                  queueType == 'inProgress' ? '$error' : '$success',
              }}>
              {queueType == 'inProgress' ? 'Finalizar' : 'Chamar'}
            </Button>
          )}
        </Row>
      </Row>
    </Card>
  );
};
