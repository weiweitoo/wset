import { useState } from 'react';
import { Anchor, Drawer, Burger, Group, Stack, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

const navigationItems: NavLink[] = [
  { label: 'Grape varieties', href: '#grape-varieties' },
  {
    label: 'Grapes and regions',
    href: '#grapes-and-regions',
    children: [
      { label: 'By grape', href: '#grapes-by-grape' },
      { label: 'By region', href: '#grapes-by-region' },
    ],
  },
  {
    label: 'Important Notes',
    href: '#important-notes',
  },
];

export default function Navigation() {
  const [opened, setOpened] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleClick = (href: string) => {
    window.location.hash = href;
    if (isMobile) {
      setOpened(false);
    }
  };

  const renderLinks = (items: NavLink[]) => (
    <Stack spacing="xs">
      {items.map((item) => (
        <div key={item.href}>
          <Anchor
            href={item.href}
            onClick={(e) => {
              e.preventDefault();
              handleClick(item.href);
            }}
            sx={{ display: 'block' }}
          >
            {item.label}
          </Anchor>
          {item.children && (
            <Stack spacing="xs" pl="md" mt="xs">
              {renderLinks(item.children)}
            </Stack>
          )}
        </div>
      ))}
    </Stack>
  );

  const navigationContent = (
    <Stack spacing="md">
      <Text weight={700} size="xl">
        WSET 2 Notes
      </Text>
      {renderLinks(navigationItems)}
    </Stack>
  );

  if (isMobile) {
    return (
      <>
        <Group
          position="apart"
          sx={{
            position: 'sticky',
            top: 0,
            backgroundColor: 'white',
            zIndex: 1000,
            padding: '1rem',
            borderBottom: '1px solid #dee2e6',
          }}
        >
          <Burger opened={opened} onClick={() => setOpened((o) => !o)} />
        </Group>
        <Drawer
          opened={opened}
          onClose={() => setOpened(false)}
          title="Navigation"
          padding="xl"
          size="xl"
        >
          {navigationContent}
        </Drawer>
      </>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '250px',
        height: '100vh',
        overflowY: 'auto',
        padding: '1.5rem',
        borderRight: '1px solid #dee2e6',
        backgroundColor: '#fafafa',
      }}
    >
      {navigationContent}
    </div>
  );
}

