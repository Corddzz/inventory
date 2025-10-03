import { Dashboard, Inventory, Article } from '@mui/icons-material';
import { Outlet } from 'react-router';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import inventoryLogo from './assets/inventory-management.png';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    title: 'Dashboard',
    icon: <Dashboard />,
  },
  {
    segment: 'inventory',
    title: 'Inventory',
    icon: <Inventory />,
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <Article />,
  },
];

const BRANDING = {
  title: 'Inventory Management System',
  logo: <img src={inventoryLogo} alt="logo" />,
};

const App = () => {
  return (
    <ReactRouterAppProvider navigation={NAVIGATION} branding={BRANDING}>
      <Outlet />
    </ReactRouterAppProvider>
  );
};

export default App;
