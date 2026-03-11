import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { 
  Settings, 
  User, 
  Bell, 
  Moon, 
  Shield, 
  HelpCircle,
  LogOut,
  ChevronRight,
  Check
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const { user, logout } = useAppStore();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    weekly: false,
    alerts: true,
  });
  const [darkMode, setDarkMode] = useState(true);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-slate-400">Manage your account and preferences</p>
      </div>

      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
      >
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-400" />
          Profile Information
        </h2>
        
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  defaultValue={user?.name || 'User'}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Email</label>
                <input
                  type="email"
                  defaultValue={user?.email || 'user@gov.in'}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Role</label>
                <input
                  type="text"
                  defaultValue={user?.role || 'Administrator'}
                  disabled
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-500 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Department</label>
                <input
                  type="text"
                  defaultValue="Ministry of Power"
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </motion.div>

      {/* Appearance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
      >
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Moon className="w-5 h-5 text-amber-400" />
          Appearance
        </h2>
        
        <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl">
          <div>
            <p className="text-white font-medium">Dark Mode</p>
            <p className="text-sm text-slate-400">Use dark theme for the dashboard</p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`relative w-14 h-8 rounded-full transition-colors ${
              darkMode ? 'bg-blue-600' : 'bg-slate-600'
            }`}
          >
            <motion.div
              animate={{ x: darkMode ? 26 : 4 }}
              className="absolute top-1 w-6 h-6 bg-white rounded-full"
            />
          </button>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
      >
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-emerald-400" />
          Notification Preferences
        </h2>
        
        <div className="space-y-4">
          {[
            { key: 'email', label: 'Email Notifications', desc: 'Receive updates via email' },
            { key: 'push', label: 'Push Notifications', desc: 'Browser push notifications' },
            { key: 'weekly', label: 'Weekly Digest', desc: 'Weekly summary report' },
            { key: 'alerts', label: 'Station Alerts', desc: 'Alerts for station status changes' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl">
              <div>
                <p className="text-white font-medium">{item.label}</p>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  notifications[item.key as keyof typeof notifications] ? 'bg-blue-600' : 'bg-slate-600'
                }`}
              >
                <motion.div
                  animate={{ x: notifications[item.key as keyof typeof notifications] ? 26 : 4 }}
                  className="absolute top-1 w-6 h-6 bg-white rounded-full"
                />
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Security */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
      >
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-purple-400" />
          Security
        </h2>
        
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-4 bg-slate-900/50 rounded-xl hover:bg-slate-700/50 transition-colors">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-slate-400" />
              <span className="text-white">Change Password</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>
          
          <button className="w-full flex items-center justify-between p-4 bg-slate-900/50 rounded-xl hover:bg-slate-700/50 transition-colors">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-slate-400" />
              <span className="text-white">Two-Factor Authentication</span>
            </div>
            <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-sm rounded-lg">Enabled</span>
          </button>
          
          <button className="w-full flex items-center justify-between p-4 bg-slate-900/50 rounded-xl hover:bg-slate-700/50 transition-colors">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-slate-400" />
              <span className="text-white">Session History</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>
        </div>
      </motion.div>

      {/* Logout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-4 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors border border-red-500/20"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </motion.div>

      {/* Version Info */}
      <p className="text-center text-sm text-slate-500">
        EV India Charge Hub v1.0.0 • Government of India
      </p>
    </div>
  );
}
