import { Card, Container, Row, StyledBadge, Text } from '@nextui-org/react';
import { useAtom, useAtomValue } from 'jotai';
import { testAtom } from '../atom';
import { LastCalledPatient } from '../components/LastCalledPatient';

export const MonitorPage = () => {
  const test = useAtomValue(testAtom);
  return (
    <Container
      justify='center'
      css={{
        display: 'flex',
        alignItems: 'center',
        height: '100vh',
        maxWidth: '100vw',
        p: '$0',
        m: '$0',
      }}>
      <div>
        <Text></Text>
        <Card
          css={{
            maxHeight: '60%',
            maxWidth: '60%',
          }}>
          <Row>
            <Text>Gregório Sampaio da Silva</Text>
          </Row>{' '}
          {test}
        </Card>
      </div>
      <div
        style={{
          alignSelf: 'flex-end',
        }}>
        <Text
          css={{
            ml: '$4',
          }}
          weight={'black'}
          size='$3xl'>
          Últimos chamados
        </Text>
        <StyledBadge
          color='primary'
          css={{
            gap: '$4',
            p: '$4',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: '1fr',
            borderRadius: '0',
            width: '100%',
            height: '15%',
            maxHeight: '100px',
            fontSize: '1.6rem',
          }}>
          <LastCalledPatient />
          <LastCalledPatient />
          <LastCalledPatient />
          <LastCalledPatient />
        </StyledBadge>
      </div>
    </Container>
  );
};

export default MonitorPage;
