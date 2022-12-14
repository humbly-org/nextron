import { Avatar, Button, Card, Col, Text, useTheme } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { HomeIcon } from '../../Icons/HomeIcon';
import { TvIcon } from '../../Icons/TvIcon';

interface IMenu {
  disconnect: () => void;
}

const handleOpenMonitor = () => {
  window.open(
    '/monitor',
    '_blank',
    'top=500, left=200,contextIsolation=no,nodeIntegration=yes',
  );
};

export const Menu = ({ disconnect, ...props }: IMenu) => {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <div
      {...props}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'repeat(2, 1fr)',
        gridColumnGap: '0px',
        gridRowGap: '0px',
        padding: '8px',
        background: theme.colors.success.value,
        height: '100vh',
      }}>
      <Card
        variant='bordered'
        css={{
          background: 'transparent',
          border: 'unset',
          alignItems: 'center',
          gridArea: '1 / 1 / 2 / 2',
          alignSelf: 'center',
          padding: '20px',
          gap: '$12',
        }}>
        <Col
          css={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}>
          <HomeIcon fill='white' />
          <Text b color={'white'} size={'$xs'}>
            Filas
          </Text>
        </Col>
        <Col
          css={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}>
          <Button
            ghost
            color={'error'}
            style={{
              border: '0px solid white',
              display: 'flex',
              flexDirection: 'row',
              lineHeight: 'normal',
            }}
            onClick={handleOpenMonitor}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0px',
              }}>
              <div>
                <TvIcon as={'div'} fill={'white'} />
              </div>
              <Text as={'div'} b color={'white'} size={'$xs'}>
                Monitor
              </Text>
            </div>
          </Button>
        </Col>
      </Card>
      <Card
        variant='bordered'
        css={{
          color: 'white',
          background: 'transparent',
          border: 'unset',
          gridArea: '2 / 1 / 3 / 2',
          alignSelf: 'end',
          justifyContent: 'end',
          alignItems: 'center',
        }}>
        {'Atendente'}
        <Button
          css={{ fontWeight: '$black', p: '$6' }}
          color={'error'}
          onClick={() => {
            disconnect();
            router.push('/home');
          }}
          size={'xs'}>
          Desconectar
        </Button>
      </Card>
    </div>
  );
};
