import { Badge, Container, Row, Text } from '@nextui-org/react';

interface IPatientQueue {
  title: 'Na fila' | 'Em atendimento' | 'Finalizados';
  patientCount: number;
  children: React.ReactNode;
}

const titleMaper = (title: string) => {
  const obj = {
    'Na fila': {
      color: 'success',
    },
    'Em atendimento': {
      color: 'warning',
    },
    Finalizados: {
      color: 'error',
    },
  };
  return obj[title];
};

export const PatientQueue = ({
  title,
  patientCount,
  children,
}: IPatientQueue) => {
  const { color } = titleMaper(title);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {' '}
      <Row
        as={'div'}
        justify={'space-between'}
        css={{
          fontWeight: '$extrabold',
          backgroundColor: `$${color}`,
          px: '$6',
          py: '$2',
          width: '100%',
        }}>
        <Text color={'white'} as={'span'}>
          {title}
        </Text>
        <Badge
          css={{
            fontWeight: '$extrabold',
          }}
          isSquared
          color={color}
          variant={'bordered'}
          size={'sm'}>
          {patientCount}
        </Badge>
      </Row>
      <Container
        css={{
          height: '100%',
          width: '100%',
          margin: '$0',
          flexWrap: 'no-wrap',
          gap: '$10',
          pt: '$4',
          overflowX: 'auto',
        }}
        alignContent='flex-start'
        display='grid'
        direction='column'>
        {children}
      </Container>
    </div>
  );
};
