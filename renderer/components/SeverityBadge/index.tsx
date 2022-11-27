import { Badge } from '@nextui-org/react';

const squaredMaper = (severity: string) => {
  const obj = {
    high: 'Emergência',
    medium: 'Preferencial',
    low: 'Normal',
  };
  return obj[severity];
};

export const SeverityBadge = ({ severity }: { severity: string }) => {
  return (
    <Badge
      isSquared
      color={severity === 'high' ? 'error' : 'warning'}
      css={{
        border: 'unset',
      }}>
      {squaredMaper(severity)}
    </Badge>
  );
};
