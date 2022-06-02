import { Box } from '@mui/material';
import { ReactChild, ReactChildren } from 'react';

interface TabPanelProps {
  children?: ReactChild | ReactChildren | ReactChild[] | ReactChildren[] | any;
  value?: number;
  index?: number;
  other?: any;
}

const TabPanel = (props: TabPanelProps): JSX.Element => {
  const { children, value, index, ...other } = props;

  return (
    <div  {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

export default TabPanel;
