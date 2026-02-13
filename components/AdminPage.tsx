
import React, { useState, useEffect } from 'react';
import { User } from '../types';

interface StoredAccount {
  username: string;
  role: string;
  password?: string;
  fullName?: string;
  email?: string;
  department?: string;
  phone?: string;
  notes?: string;
}

interface AdminPageProps {
  currentUser: User;
  onUpdateCurrentUser: (user: User) => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ currentUser, onUpdateCurrentUser }) => {
  const [accounts, setAccounts] = useState<StoredAccount[]>([]);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newFullName, setNewFullName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newDepartment, setNewDepartment] = useState('Marketing');
  const [newPhone, setNewPhone] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [newRole, setNewRole] = useState('Marketing Manager');
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  
  // Admin Profile Details linked to currentUser and localStorage
  const [adminProfile, setAdminProfile] = useState({
    fullName: localStorage.getItem(`mm_profile_name_${currentUser.username}`) || 'Platform Architect',
    email: localStorage.getItem(`mm_profile_email_${currentUser.username}`) || 'admin@marketmind.ai',
    alias: currentUser.role
  });

  const [stats] = useState({
    activeSessions: Math.floor(Math.random() * 20) + 5,
    apiCallsToday: 1248,
    serverLoad: '24%',
    uptime: '99.99%'
  });

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = () => {
    const stored = localStorage.getItem('mm_accounts');
    if (stored) {
      setAccounts(JSON.parse(stored));
    }
  };

  const deleteAccount = (username: string) => {
    if (username === 'admin') {
      alert("System integrity error: Primary root administrator cannot be purged.");
      return;
    }
    if (confirm(`CAUTION: Are you sure you want to permanently delete account: ${username}?`)) {
      const updated = accounts.filter(acc => acc.username !== username);
      localStorage.setItem('mm_accounts', JSON.stringify(updated));
      setAccounts(updated);
    }
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername || !newPassword) return;

    if (accounts.some(acc => acc.username.toLowerCase() === newUsername.toLowerCase())) {
      alert("Conflict detected: Identity already exists in database.");
      return;
    }

    const newAcc: StoredAccount = {
      username: newUsername,
      password: newPassword,
      role: newRole,
      fullName: newFullName,
      email: newEmail,
      department: newDepartment,
      phone: newPhone,
      notes: newNotes
    };

    const updated = [...accounts, newAcc];
    localStorage.setItem('mm_accounts', JSON.stringify(updated));
    setAccounts(updated);
    
    // Reset fields
    setNewUsername('');
    setNewPassword('');
    setNewFullName('');
    setNewEmail('');
    setNewPhone('');
    setNewNotes('');
    setNewDepartment('Marketing');
    setIsAdding(false);
  };

  const updateAdminProfile = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(`mm_profile_name_${currentUser.username}`, adminProfile.fullName);
    localStorage.setItem(`mm_profile_email_${currentUser.username}`, adminProfile.email);
    
    // Sync back to accounts list if needed
    const updatedAccounts = accounts.map(acc => {
      if (acc.username === currentUser.username) {
        return { ...acc, fullName: adminProfile.fullName, email: adminProfile.email };
      }
      return acc;
    });
    localStorage.setItem('mm_accounts', JSON.stringify(updatedAccounts));
    setAccounts(updatedAccounts);

    alert("CRITICAL: System Administrator Profile parameters synchronized.");
  };

  const toggleEditUser = (index: number) => {
    if (editingIndex === index) {
      // Save changes
      localStorage.setItem('mm_accounts', JSON.stringify(accounts));
      setEditingIndex(null);
    } else {
      setEditingIndex(index);
    }
  };

  const updateAccountDetail = (index: number, field: keyof StoredAccount, value: string) => {
    const updated = [...accounts];
    updated[index] = { ...updated[index], [field]: value };
    setAccounts(updated);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20">
      <header className="space-y-4">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-widest mb-2">
          Admin Terminal v4.2.0
        </div>
        <h2 className="text-4xl font-extrabold text-white leading-tight">
          Secure Governance
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl">
          Authorized access for {currentUser.username}. Management of identities and system-wide security parameters.
        </p>
      </header>

      {/* Admin Profile Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="glass p-8 rounded-[2.5rem] border border-white/5 h-full flex flex-col items-center text-center shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-600 via-indigo-600 to-rose-600 animate-pulse"></div>
             <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-4xl mb-6 shadow-xl border-4 border-slate-900 group-hover:scale-105 transition-transform duration-500">
               {currentUser.username.charAt(0).toUpperCase()}
             </div>
             <h3 className="text-xl font-bold text-white tracking-tight">{adminProfile.fullName}</h3>
             <p className="text-rose-400 text-[10px] font-black uppercase tracking-[0.2em] mt-2 px-3 py-1 bg-rose-500/10 rounded-full border border-rose-500/20">{adminProfile.alias}</p>
             <p className="text-slate-500 text-xs font-mono mt-6">{adminProfile.email}</p>
             
             <div className="mt-auto pt-8 w-full">
               <div className="bg-slate-900/60 rounded-2xl p-5 border border-white/5 space-y-3">
                 <div className="flex justify-between items-center">
                   <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Auth Level</span>
                   <span className="text-white font-mono text-xs">Tier 10</span>
                 </div>
                 <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                   <div className="bg-rose-500 h-full w-full shadow-[0_0_8px_rgba(244,63,94,0.5)]"></div>
                 </div>
               </div>
             </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <form onSubmit={updateAdminProfile} className="glass p-10 rounded-[2.5rem] border border-white/5 space-y-8 shadow-2xl bg-gradient-to-br from-slate-900/40 to-transparent">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
               <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]"></span>
               Personal Identity
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Legal Full Name</label>
                <input
                  type="text"
                  value={adminProfile.fullName}
                  onChange={(e) => setAdminProfile({...adminProfile, fullName: e.target.value})}
                  className="w-full bg-slate-950/40 border border-slate-700/50 rounded-2xl px-5 py-3.5 text-white text-sm outline-none focus:ring-2 focus:ring-rose-500/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Terminal Handle</label>
                <input
                  type="text"
                  readOnly
                  value={currentUser.username}
                  className="w-full bg-slate-950/20 border border-slate-800 rounded-2xl px-5 py-3.5 text-slate-500 text-sm outline-none cursor-not-allowed italic"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Secure Contact Link (Email)</label>
              <input
                type="email"
                value={adminProfile.email}
                onChange={(e) => setAdminProfile({...adminProfile, email: e.target.value})}
                className="w-full bg-slate-950/40 border border-slate-700/50 rounded-2xl px-5 py-3.5 text-white text-sm outline-none focus:ring-2 focus:ring-rose-500/50 transition-all"
              />
            </div>
            <div className="flex justify-end">
              <button className="px-10 py-4 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-2xl text-xs uppercase tracking-widest transition-all shadow-xl shadow-rose-600/30 active:scale-95">
                Commit Changes
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Identity Directory Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
             <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
             Identity Provisioning
          </h3>
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2"
          >
            <span>{isAdding ? 'Cancel' : 'Provision New Identity'}</span>
            <span className="text-lg">{isAdding ? '×' : '+'}</span>
          </button>
        </div>

        {isAdding && (
          <form onSubmit={handleCreateAccount} className="glass p-10 rounded-[2.5rem] border border-indigo-500/30 bg-indigo-500/5 animate-in slide-in-from-top-4 duration-500 shadow-2xl">
            <h4 className="text-white font-bold mb-8 flex items-center gap-2 text-lg">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              Identity Specification
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6 mb-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Username (Required)</label>
                <input
                  type="text"
                  required
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="jdoe"
                  className="w-full bg-slate-950/60 border border-slate-700/50 rounded-2xl px-5 py-3.5 text-white text-sm outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Security Key (Password)</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950/60 border border-slate-700/50 rounded-2xl px-5 py-3.5 text-white text-sm outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                <input
                  type="text"
                  value={newFullName}
                  onChange={(e) => setNewFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-slate-950/60 border border-slate-700/50 rounded-2xl px-5 py-3.5 text-white text-sm outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Contact Email</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="john@company.ai"
                  className="w-full bg-slate-950/60 border border-slate-700/50 rounded-2xl px-5 py-3.5 text-white text-sm outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Phone Number</label>
                <input
                  type="tel"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-slate-950/60 border border-slate-700/50 rounded-2xl px-5 py-3.5 text-white text-sm outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Department</label>
                <select
                  value={newDepartment}
                  onChange={(e) => setNewDepartment(e.target.value)}
                  className="w-full bg-slate-950/60 border border-slate-700/50 rounded-2xl px-5 py-3.5 text-white text-sm outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none cursor-pointer"
                >
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Product">Product</option>
                  <option value="Operations">Operations</option>
                  <option value="Executive">Executive</option>
                </select>
              </div>
              <div className="space-y-2 lg:col-span-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Internal Notes</label>
                <input
                  type="text"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Additional context about this team member..."
                  className="w-full bg-slate-950/60 border border-slate-700/50 rounded-2xl px-5 py-3.5 text-white text-sm outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Access Role</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full bg-slate-950/60 border border-slate-700/50 rounded-2xl px-5 py-3.5 text-white text-sm outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none cursor-pointer"
                >
                  <option value="Marketing Manager">Marketing Manager</option>
                  <option value="Sales Analyst">Sales Analyst</option>
                  <option value="Growth Lead">Growth Lead</option>
                  <option value="Chief Strategist">Chief Strategist (Admin)</option>
                </select>
              </div>
            </div>
            <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-indigo-600/30">
              Finalize Identity Provisioning
            </button>
          </form>
        )}

        <div className="glass rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl relative">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 bg-slate-900/80">
                  <th className="px-10 py-6 text-xs font-bold text-slate-500 uppercase tracking-widest">User Profile</th>
                  <th className="px-10 py-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Metadata</th>
                  <th className="px-10 py-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Phone & Notes</th>
                  <th className="px-10 py-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Clearance</th>
                  <th className="px-10 py-6 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {accounts.map((acc, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors group">
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-inner">
                          {acc.username.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          {editingIndex === i ? (
                            <input 
                              value={acc.fullName}
                              placeholder="Full Name"
                              onChange={(e) => updateAccountDetail(i, 'fullName', e.target.value)}
                              className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-sm text-white outline-none mb-1"
                            />
                          ) : (
                            <span className="text-white font-bold tracking-tight">{acc.fullName || acc.username}</span>
                          )}
                          <span className="text-slate-500 text-[10px] font-mono">@{acc.username}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex flex-col gap-1">
                        {editingIndex === i ? (
                          <>
                            <input 
                              value={acc.email}
                              placeholder="Email"
                              onChange={(e) => updateAccountDetail(i, 'email', e.target.value)}
                              className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white outline-none"
                            />
                            <input 
                              value={acc.department}
                              placeholder="Dept"
                              onChange={(e) => updateAccountDetail(i, 'department', e.target.value)}
                              className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white outline-none"
                            />
                          </>
                        ) : (
                          <>
                            <span className="text-slate-400 text-xs truncate max-w-[150px]">{acc.email || 'No email'}</span>
                            <span className="text-slate-600 text-[9px] font-black uppercase tracking-widest">{acc.department || 'General'}</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-10 py-6">
                       <div className="flex flex-col gap-1">
                        {editingIndex === i ? (
                          <>
                            <input 
                              value={acc.phone}
                              placeholder="Phone"
                              onChange={(e) => updateAccountDetail(i, 'phone', e.target.value)}
                              className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white outline-none"
                            />
                             <input 
                              value={acc.notes}
                              placeholder="Notes"
                              onChange={(e) => updateAccountDetail(i, 'notes', e.target.value)}
                              className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white outline-none"
                            />
                          </>
                        ) : (
                          <>
                            <span className="text-slate-400 text-xs">{acc.phone || 'N/A'}</span>
                            <span className="text-slate-600 text-[10px] italic truncate max-w-[120px]">{acc.notes || 'No notes...'}</span>
                          </>
                        )}
                       </div>
                    </td>
                    <td className="px-10 py-6">
                      {editingIndex === i ? (
                        <select 
                          value={acc.role}
                          onChange={(e) => updateAccountDetail(i, 'role', e.target.value)}
                          className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-indigo-400 outline-none"
                        >
                          <option value="Chief Strategist">Chief Strategist</option>
                          <option value="Marketing Manager">Marketing Manager</option>
                          <option value="Growth Lead">Growth Lead</option>
                          <option value="Sales Analyst">Sales Analyst</option>
                        </select>
                      ) : (
                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                          acc.role === 'Chief Strategist' 
                            ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_10px_rgba(99,102,241,0.1)]' 
                            : 'bg-slate-800 text-slate-400 border border-slate-700/50'
                        }`}>
                          {acc.role}
                        </span>
                      )}
                    </td>
                    <td className="px-10 py-6 text-right">
                      <div className="flex justify-end gap-3">
                        <button 
                          onClick={() => toggleEditUser(i)}
                          className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 hover:text-indigo-300 transition-colors"
                        >
                          {editingIndex === i ? 'Sync' : 'Edit'}
                        </button>
                        <button 
                          onClick={() => deleteAccount(acc.username)}
                          className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${
                            acc.username === 'admin' ? 'text-slate-800 cursor-not-allowed opacity-30' : 'text-slate-500 hover:text-rose-400'
                          }`}
                          disabled={acc.username === 'admin'}
                        >
                          Purge
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
