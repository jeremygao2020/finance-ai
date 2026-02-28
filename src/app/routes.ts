import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { InvoiceAnnotation } from './pages/InvoiceAnnotation';
import { BankFlowAnnotation } from './pages/BankFlowAnnotation';
import { RuleManagement } from './pages/RuleManagement';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: 'invoice', Component: InvoiceAnnotation },
      { path: 'bankflow', Component: BankFlowAnnotation },
      { path: 'rules', Component: RuleManagement },
    ],
  },
]);
