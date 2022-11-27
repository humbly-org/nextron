import { Card, Container, Row, StyledBadge, Text } from '@nextui-org/react';
import { useAtom, useAtomValue } from 'jotai';
import { testAtom } from '../atom';
import { LastCalledPatient } from '../components/LastCalledPatient';

export const MonitorPage = () => {
  const test = useAtomValue(testAtom);
  const { name, severity, position } = JSON.parse(test);

  const squaredMaper = (severity: string) => {
    const obj = {
      high: 'Emergência',
      medium: 'Preferencial',
      low: 'Normal',
    };
    return obj[severity];
  };

  return (
    <Container
      justify='center'
      css={{
        display: 'flex',
        alignItems: 'center',
        height: '100vh',
        maxWidth: '100vw',
        padding: '$0',
        margin: '$0',
      }}>
      <div
        style={{
          maxHeight: '60%',
          maxWidth: '60%',
          minWidth: '60%',
          width: '60%',
        }}>
        <Text></Text>
        <Card
          css={{
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <StyledBadge
            isSquared
            color={severity === 'high' ? 'error' : 'warning'}
            css={{
              fontSize: '$8xl',
              fontWeight: 'black',
              width: '100%',
            }}>
            {squaredMaper(severity)}
          </StyledBadge>
          <Row css={{ padding: '$12' }} justify={'center'}>
            <Text span weight={'bold'} size='$6xl'>
              Georgia
            </Text>
          </Row>{' '}
          <StyledBadge
            isSquared
            css={{
              fontSize: '$8xl',
              width: 'fit-content',
              fontWeight: 'black',
              mb: '$8',
            }}>
            #12
          </StyledBadge>
          <StyledBadge
            isSquared
            color={'primary'}
            css={{
              fontSize: '$8xl',
              fontWeight: 'black',
              width: '100%',
            }}>
            Guichê 7
          </StyledBadge>
        </Card>
      </div>
      <div
        style={{
          width: '100%',
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
