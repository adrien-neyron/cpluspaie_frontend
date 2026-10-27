import React, { ReactNode, useEffect } from 'react';
import ReactModal from 'react-modal';
import type { DeadlineKind, DeadlineStatus, RequestStatus } from '../../types/portal';

if (typeof document !== 'undefined') ReactModal.setAppElement('#root');

export const KIND_LABEL: Record<DeadlineKind, string> = {
  variables: 'Variables de paie',
  validation: 'Validation des bulletins',
  payment: 'Virement des salaires',
  social: 'Échéance sociale',
  other: 'Autre',
};
export const KIND_SHORT: Record<DeadlineKind, string> = {
  variables: 'Variables', validation: 'Validation', payment: 'Virement', social: 'Social', other: 'Autre',
};
const KIND_STYLE: Record<DeadlineKind, string> = {
  variables: 'bg-ardoise-100 text-ardoise-900 border-ardoise-300',
  validation: 'bg-encre-100 text-encre-900 border-encre-300',
  payment: 'bg-encre-800 text-white border-encre-800',
  social: 'bg-brume-200 text-encre-900 border-brume-300',
  other: 'bg-white text-encre-800 border-encre-300',
};
export const kindStyle = (k: DeadlineKind) => KIND_STYLE[k];

export const STATUS_LABEL: Record<DeadlineStatus, string> = { todo: 'À faire', in_progress: 'En cours', done: 'Terminé' };
export const REQUEST_LABEL: Record<RequestStatus, string> = {
  new: 'Nouveau', in_progress: 'En cours', resolved: 'Traité', closed: 'Clôturé',
};

/** Statut = texte + pictogramme (jamais la couleur seule, WCAG 1.4.1). */
export function StatusPill({ status, overdue }: { status: DeadlineStatus; overdue?: boolean }) {
  if (overdue && status !== 'done') {
    return <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-800 ring-1 ring-red-300"><span aria-hidden="true">⚠</span>En retard</span>;
  }
  const map: Record<DeadlineStatus, [string, string]> = {
    todo: ['○', 'bg-brume-200 text-encre-800 ring-encre-300'],
    in_progress: ['◐', 'bg-ardoise-50 text-ardoise-900 ring-ardoise-300'],
    done: ['✓', 'bg-emerald-50 text-emerald-900 ring-emerald-300'],
  };
  const [icon, cls] = map[status];
  return <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ${cls}`}><span aria-hidden="true">{icon}</span>{STATUS_LABEL[status]}</span>;
}

export function RequestPill({ status }: { status: RequestStatus }) {
  const cls: Record<RequestStatus, string> = {
    new: 'bg-ardoise-50 text-ardoise-900 ring-ardoise-300',
    in_progress: 'bg-amber-50 text-amber-900 ring-amber-300',
    resolved: 'bg-emerald-50 text-emerald-900 ring-emerald-300',
    closed: 'bg-brume-200 text-encre-800 ring-encre-300',
  };
  return <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ${cls[status]}`}>{REQUEST_LABEL[status]}</span>;
}

export const todayISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
export const isOverdue = (due: string, status: DeadlineStatus) => status !== 'done' && due < todayISO();
export const fmtDate = (iso: string) =>
  new Date(iso.length === 10 ? `${iso}T12:00:00` : iso).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });
export const fmtShort = (iso: string) =>
  new Date(iso.length === 10 ? `${iso}T12:00:00` : iso).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
export const fmtSize = (n: number) => (n < 1024 * 1024 ? `${Math.max(1, Math.round(n / 1024))} Ko` : `${(n / 1024 / 1024).toFixed(1)} Mo`);
export const extOf = (name: string) => (name.split('.').pop() || '').toUpperCase();

export function Spinner({ label = 'Chargement…' }: { label?: string }) {
  return (
    <div role="status" aria-live="polite" className="flex items-center gap-3 p-6 text-encre-600">
      <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-ardoise-600" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-encre-300 bg-brume-50 p-8 text-center">
      <p className="font-semibold text-encre-800">{title}</p>
      {children && <p className="mt-1 text-sm text-encre-600">{children}</p>}
    </div>
  );
}

/** Message d'état annoncé aux lecteurs d'écran. */
export function Alert({ kind = 'error', children }: { kind?: 'error' | 'success' | 'info'; children: ReactNode }) {
  const cls = {
    error: 'border-red-300 bg-red-50 text-red-900',
    success: 'border-emerald-300 bg-emerald-50 text-emerald-900',
    info: 'border-ardoise-300 bg-ardoise-50 text-ardoise-900',
  }[kind];
  return <div role={kind === 'error' ? 'alert' : 'status'} className={`rounded-lg border px-4 py-3 text-sm ${cls}`}>{children}</div>;
}

export function Dialog({ title, onClose, children, wide = false }: { title: string; onClose: () => void; children: ReactNode; wide?: boolean }) {
  return (
    <ReactModal
      isOpen
      onRequestClose={onClose}
      contentLabel={title}
      className={`mx-auto mt-10 max-h-[90vh] w-[94vw] overflow-y-auto rounded-xl bg-white p-6 shadow-2xl outline-none ${wide ? 'max-w-4xl' : 'max-w-xl'}`}
      overlayClassName="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-encre-900/60 px-2"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <h2 className="text-xl font-bold text-encre-800">{title}</h2>
        <button type="button" onClick={onClose} className="btn-outline btn-sm" aria-label="Fermer la fenêtre">✕</button>
      </div>
      {children}
    </ReactModal>
  );
}

export function Tabs<T extends string>({ tabs, value, onChange, label }: {
  tabs: { id: T; label: string; badge?: number }[]; value: T; onChange: (t: T) => void; label: string;
}) {
  return (
    <div role="tablist" aria-label={label} className="mb-6 flex flex-wrap gap-2">
      {tabs.map((t) => (
        <button
          key={t.id}
          role="tab"
          id={`tab-${t.id}`}
          aria-selected={value === t.id}
          aria-controls={`panel-${t.id}`}
          tabIndex={value === t.id ? 0 : -1}
          onClick={() => onChange(t.id)}
          onKeyDown={(e) => {
            const i = tabs.findIndex((x) => x.id === value);
            if (e.key === 'ArrowRight') onChange(tabs[(i + 1) % tabs.length].id);
            if (e.key === 'ArrowLeft') onChange(tabs[(i - 1 + tabs.length) % tabs.length].id);
          }}
          className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
            value === t.id ? 'bg-ardoise-500 text-white shadow-sm' : 'bg-white text-encre-700 ring-1 ring-encre-300 hover:bg-ardoise-50 hover:ring-ardoise-300'
          }`}
        >
          {t.label}
          {!!t.badge && <span className="ml-2 rounded-full bg-corail-600 px-2 py-0.5 text-xs text-white">{t.badge}</span>}
        </button>
      ))}
    </div>
  );
}

export function useDocumentTitle(title: string) {
  useEffect(() => { document.title = `${title} — C+Paie`; }, [title]);
}
