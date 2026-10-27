import React, { useState } from 'react';
import PortalShell from '../../components/portal/PortalShell';
import { Tabs, useDocumentTitle } from '../../components/portal/ui';
import { useAuthContext } from '../../context/AuthContext';
import CompaniesTab from './CompaniesTab';
import DeadlinesTab from './DeadlinesTab';
import DocumentsAdminTab from './DocumentsAdminTab';
import RequestsAdminTab from './RequestsAdminTab';
import UsersTab from './UsersTab';

type Tab = 'companies' | 'deadlines' | 'documents' | 'requests' | 'users';

export default function AdminDashboard() {
  useDocumentTitle('Administration');
  const { user } = useAuthContext();
  const [tab, setTab] = useState<Tab>('requests');
  const [newCount, setNewCount] = useState(0);

  return (
    <PortalShell title="Administration" subtitle={`Connectée : ${user?.name || user?.email}`}>
      <Tabs
        label="Sections de l'administration"
        value={tab}
        onChange={setTab}
        tabs={[
          { id: 'requests', label: 'Demandes', badge: newCount },
          { id: 'companies', label: 'Entreprises' },
          { id: 'deadlines', label: 'Calendrier' },
          { id: 'documents', label: 'Documents' },
          { id: 'users', label: 'Utilisateurs' },
        ]}
      />
      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
        {tab === 'requests' && <RequestsAdminTab onNewCount={setNewCount} />}
        {tab === 'companies' && <CompaniesTab />}
        {tab === 'deadlines' && <DeadlinesTab />}
        {tab === 'documents' && <DocumentsAdminTab />}
        {tab === 'users' && <UsersTab />}
      </div>
    </PortalShell>
  );
}
