import {
  Button,
  Card,
  Container,
  Row,
  StyledBadge,
  Text,
} from '@nextui-org/react';
import { useAtomValue } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import {
  useSpring,
  a,
  useSpringRef,
  useChain,
  config,
} from '@react-spring/web';
import { calledPatientAtom } from '../atom';

export const MonitorPage = () => {
  const calledPatient = useAtomValue(calledPatientAtom);
  const [newCall, setNewCall] = useState(false);
  const { name, severity, queuePosition } = calledPatient || {
    name: 'Sem chamado',
    severity: 'low',
    queuePosition: 0,
  };

  const squaredMaper = (severity: string) => {
    const obj = {
      high: 'Emergência',
      medium: 'Preferencial',
      low: 'Normal',
    };
    return obj[severity];
  };

  const blinkRef = useSpringRef();
  const n = useRef(0);
  const transitions = useSpring({
    ref: blinkRef,
    reset: newCall == true,
    delay: 600,
    loop: {
      reverse: true,
      loop: () => 2 > n.current++,
    },
    from: { transform: 'scale(1)' },
    to: { transform: 'scale(1.1)' },
    config: { ...config.wobbly },
  });

  const appearRef = useSpringRef();
  const appear = useSpring({
    ref: appearRef,
    delay: 600,
    from: { opacity: 0 },
    to: { opacity: 1 },
    reset: newCall == true,
  });

  useEffect(() => {}, [calledPatient]);

  useChain([appearRef, blinkRef], [0, 1], 300);

  function handleReset() {
    setNewCall((prev: boolean) => !prev);
  }

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
        <a.div>
          <a.div style={{ ...transitions, ...appear }}>
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
                {squaredMaper(severity) || 'Normal'}
              </StyledBadge>
              <Row css={{ padding: '$12' }} justify={'center'}>
                <Text span weight={'bold'} size='$6xl'>
                  {name || 'Sem chamado'}
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
                #{queuePosition}
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
          </a.div>
        </a.div>
      </div>
    </Container>
  );
};

export default MonitorPage;
