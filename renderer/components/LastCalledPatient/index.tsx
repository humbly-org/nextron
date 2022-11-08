import {
  Avatar,
  Card,
  Row,
  StyledBadge,
  StyledRow,
  Text,
} from '@nextui-org/react';
import { PatientMock } from '../../pages/mocks/patientMock';
import { initialsFun } from '../../utils';
import { SeverityBadge } from '../SeverityBadge';

export const LastCalledPatient = () => {
  const { name, id, queueType, queuePosition, severity } = PatientMock;

  return (
    <Card
      isHoverable
      variant='flat'
      borderWeight='bold'
      css={{
        border: '2px solid $primary',
        boxShadow: 'unset',
        background: 'white',
        height: 'max-content',
        maxWidth: '100%',
        h: '100%',
        p: '$2',
      }}>
      <Row justify='space-between'>
        <StyledBadge size='xs'>#{queuePosition}</StyledBadge>
        <SeverityBadge severity={severity} />
      </Row>
      <Row>
        <Avatar
          css={{
            mr: '$4',
          }}
          bordered
          squared
          text={initialsFun(name)}
          size='sm'
        />{' '}
        <Text
          size={'xl'}
          weight={'bold'}
          css={{
            wordWrap: 'break-word',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}>
          {name}
        </Text>
      </Row>
    </Card>
  );
};
