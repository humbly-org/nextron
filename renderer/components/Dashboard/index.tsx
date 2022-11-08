import { Container } from '@nextui-org/react';

interface IDashboardProps {
  children: React.ReactNode;
}

export const Dashboard = ({ children }: IDashboardProps) => {
  return (
    <Container
      display='flex'
      css={{
        flexWrap: 'nowrap',
        margin: '0px',
        mw: 'inherit',
        p: '0px',
      }}>
      {children}
    </Container>
  );
};
