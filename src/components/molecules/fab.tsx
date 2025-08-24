import React from 'react';
import {FAB} from 'react-native-paper';

const MainFab = () => {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <FAB.Group
      open={open}
      icon={open ? 'close' : 'pencil'}
      variant={'secondary'}
      actions={[
        {
          icon: 'arrow-up',
          label: 'Arrow Up',
          onPress: () => {},
        },
        {
          icon: 'swap-horizontal',
          label: 'Swap Horizontal',
          onPress: () => {},
        },
        {
          icon: 'arrow-down',
          label: 'Arrow Down',
          onPress: () => {},
        },
      ]}
      onStateChange={({open}: {open: boolean}) => setOpen(open)}
      visible
    />
  );
};

export default MainFab;
