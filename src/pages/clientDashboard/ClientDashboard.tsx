import React, { useState } from 'react';
import PortalShell from '../../components/portal/PortalShell';
import { Tabs, useDocumentTitle } from '../../components/portal/ui';
import { useAuthContext } from '../../context/AuthContext';
import OverviewTab from './OverviewTab';
import CalendarTab from './CalendarTab';
import DocumentsTab from './DocumentsTab';
import RequestsTab from './RequestsTab';

type Tab = 'overview' | 'calendar' | 'documents' | 'requests';

export default function ClientDashboard() {
  useDocumentTitle('Espace client');
  const { user } = useAuthContext();
  const [tab, setTab] = useState<Tab>('overview');

  return (
    <PortalShell title="Espace client" subtitle={`Bienvenue, ${user?.name || user?.email}`}>
      <Tabs
        label="Sections de l'espace client"
        value={tab}
        onChange={setTab}
        tabs={[
          { id: 'overview', label: 'Tableau de bord' },
          { id: 'calendar', label: 'Calendrier de paie' },
          { id: 'documents', label: 'Documents' },
          { id: 'requests', label: 'Mes demandes' },
        ]}
      />
      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
        {tab === 'overview' && <OverviewTab onOpenCalendar={() => setTab('calendar')} onOpenDocs={() => setTab('documents')} />}
        {tab === 'calendar' && <CalendarTab />}
        {tab === 'documents' && <DocumentsTab />}
        {tab === 'requests' && <RequestsTab />}
      </div>
    </PortalShell>
  );
}
