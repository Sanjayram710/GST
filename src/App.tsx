import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { Landing } from './pages/Landing';
import { StartupExpress } from './pages/StartupExpress';
import { Dashboard } from './pages/Dashboard';
import { Copilot } from './pages/Copilot';
import { Invoices } from './pages/Invoices';
import { Reconciliation } from './pages/Reconciliation';
import { Returns } from './pages/Returns';
import { Assistant } from './pages/Assistant';
import { Vault } from './pages/Vault';
import { Referral } from './pages/Referral';
import { Kiosk } from './pages/Kiosk';
import { CaDashboard } from './pages/CaDashboard';
import { ApiHealth } from './pages/ApiHealth';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Guided Wizard */}
        <Route path="/start" element={<StartupExpress />} />

        {/* Kiosk Mode (independent view) */}
        <Route path="/kiosk" element={<Kiosk />} />

        {/* Core App Shell */}
        <Route element={<AppShell />}>
          <Route path="/app" element={<Dashboard />} />
          <Route path="/app/copilot" element={<Copilot />} />
          <Route path="/app/invoices" element={<Invoices />} />
          <Route path="/app/reconcile" element={<Reconciliation />} />
          <Route path="/app/returns" element={<Returns />} />
          <Route path="/app/assistant" element={<Assistant />} />
          <Route path="/app/vault" element={<Vault />} />
          <Route path="/app/referral" element={<Referral />} />
          <Route path="/ca" element={<CaDashboard />} />
          <Route path="/admin/api-health" element={<ApiHealth />} />
        </Route>

        {/* Catch-all redirect to Dashboard */}
        <Route path="*" element={<Navigate to="/app" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
