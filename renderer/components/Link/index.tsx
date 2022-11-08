import NextLink from 'next/link';

export const Link = ({ href, children }) => {
  return (
    <NextLink href={href}>
      <a
        style={{
          textDecoration: 'none',
        }}>
        {children}
      </a>
    </NextLink>
  );
};
