import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { LogoutButton } from '../../components/auth/LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';
import logo from "../../images/LOGO_COULEUR.svg";


// Types
type Contact = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: 'new' | 'in_progress' | 'resolved';
  created_at: string;
};

type Stats = {
  total: number;
  new: number;
  in_progress: number;
  resolved: number;
};

type User = {
  id: string;
  email: string;
  name?: string | null;
  role: 'Admin' | 'Client';
  created_at: string;
};

export default function AdminDashboard() {
  const { user } = useAuth0();
  const { apiCall } = useApi();

  // States typés
  const [activeTab, setActiveTab] = useState<'contacts' | 'users'>('contacts');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Charger contacts + stats
  const loadContactsData = useCallback(async () => {
    setLoading(true);
    try {
      const [contactsData, statsData] = await Promise.all([
        apiCall('/client/contacts'),
        apiCall('/client/stats'),
      ]);

      if (contactsData.data?.contacts) setContacts(contactsData.data.contacts);
      if (statsData.data?.stats) setStats(statsData.data.stats);
    } catch (error) {
      console.error('Failed to load contacts/stats:', error);
    } finally {
      setLoading(false);
    }
  }, [apiCall]);

  // Charger utilisateurs
  const loadUsers = useCallback(async () => {
  setLoadingUsers(true);
  try {
    const res = await apiCall('/users');

    console.log('USERS RESPONSE:', res);

    if (res?.data) {
      setUsers(res.data);
    }
  } catch (error) {
    console.error('Failed to load users:', error);
  } finally {
    setLoadingUsers(false);
  }
}, [apiCall]);

  useEffect(() => {
    if (activeTab === 'contacts') {
      loadContactsData();
    } else {
      loadUsers();
    }
  }, [activeTab, loadContactsData, loadUsers]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Confirmer la suppression ?')) return;
    try {
      await apiCall(`/contacts/${id}`, { method: 'DELETE' });
      await loadContactsData();
    } catch (error) {
      alert('Erreur lors de la suppression');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
  <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
    
    {/* Left block: logo + title */}
    <div className="flex items-center gap-4">
      <Link to="/" className="flex items-center">
        <img src={logo} alt="logo" className="w-16" />
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Administration
        </h1>
        <p className="text-sm text-gray-500">
          Bienvenue, {user?.name || user?.email}
        </p>
      </div>
    </div>

    {/* Right block */}
    <LogoutButton />
  </div>
</header>


      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-4 py-2 rounded ${activeTab === 'contacts' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
          >
            Contacts
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded ${activeTab === 'users' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
          >
            Utilisateurs
          </button>
        </div>

        {/* Stats */}
        {activeTab === 'contacts' && stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-gray-500 text-sm">Total</p>
              <p className="text-3xl font-bold">{stats.total}</p>
            </div>
            <div className="bg-blue-50 rounded-xl shadow p-6">
              <p className="text-red-600 text-sm">Nouveaux</p>
              <p className="text-3xl font-bold text-red-600">{stats.new}</p>
            </div>
            <div className="bg-yellow-50 rounded-xl shadow p-6">
              <p className="text-yellow-600 text-sm">En cours</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.in_progress}</p>
            </div>
            <div className="bg-green-50 rounded-xl shadow p-6">
              <p className="text-green-600 text-sm">Résolus</p>
              <p className="text-3xl font-bold text-green-600">{stats.resolved}</p>
            </div>
          </div>
        )}

        {/* Contacts */}
        {activeTab === 'contacts' && (
          <div className="bg-white rounded-xl shadow">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold">Tous les Contacts</h2>
            </div>
            {loading ? (
              <p className="p-6">Chargement...</p>
            ) : (
              <div className="divide-y">
                {contacts.map((contact) => (
                  <div key={contact.id} className="p-6 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{contact.name}</h3>
                        <p className="text-gray-600">{contact.email}</p>
                        {contact.phone && <p className="text-gray-600">{contact.phone}</p>}
                        <p className="text-gray-700 mt-2">{contact.message}</p>
                        <p className="text-sm text-gray-400 mt-2">
                          {new Date(contact.created_at).toLocaleString('fr-FR')}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDelete(contact.id)}
                        className="ml-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Users */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-xl shadow">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold">Utilisateurs</h2>
            </div>
            {loadingUsers ? (
              <p className="p-6">Chargement...</p>
            ) : (
              <table className="w-full text-left divide-y">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-4">Email</th>
                    <th className="p-4">Nom</th>
                    <th className="p-4">Rôle</th>
                    <th className="p-4">Créé le</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50">
                      <td className="p-4">{u.email}</td>
                      <td className="p-4">{u.name || '-'}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded text-sm ${
                            u.role === 'Admin'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-green-100 text-green-700'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-500">
                        {new Date(u.created_at).toLocaleDateString('fr-FR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
