import { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  XCircle,
  MapPin,
  Zap,
  Settings,
  Trash2,
  Filter,
  Search,
  Check
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Alert {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  location?: string;
  timestamp: string;
  read: boolean;
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'success',
    title: 'New Charging Station Opened',
    message: 'A new fast charging station has been inaugurated at MG Road, Bangalore',
    location: 'Bangalore, Karnataka',
    timestamp: '2 hours ago',
    read: false,
  },
  {
    id: '2',
    type: 'warning',
    title: 'High Traffic at Station',
    message: 'Wait times currently exceeding 30 minutes at Delhi Sector 18 charging hub',
    location: 'Delhi',
    timestamp: '3 hours ago',
    read: false,
  },
  {
    id: '3',
    type: 'info',
    title: 'Station Maintenance Scheduled',
    message: 'Scheduled maintenance at Mumbai Bandra charging station on March 15th',
    location: 'Mumbai, Maharashtra',
    timestamp: '5 hours ago',
    read: true,
  },
  {
    id: '4',
    type: 'warning',
    title: 'Power Outage Alert',
    message: 'Temporary power disruption affecting 5 stations in Gurugram region',
    location: 'Gurugram, Haryana',
    timestamp: '6 hours ago',
    read: false,
  },
  {
    id: '5',
    type: 'success',
    title: 'Free Charging Day',
    message: 'Free charging available at all EESL stations on National EV Day',
    location: 'All India',
    timestamp: '1 day ago',
    read: true,
  },
  {
    id: '6',
    type: 'error',
    title: 'Station Offline',
    message: 'Charging station at Pune Railway Station is currently offline',
    location: 'Pune, Maharashtra',
    timestamp: '1 day ago',
    read: true,
  },
  {
    id: '7',
    type: 'info',
    title: 'New Subsidy Scheme',
    message: 'Government announces new subsidy for EV charging infrastructure in Tier 2 cities',
    location: 'All India',
    timestamp: '2 days ago',
    read: true,
  },
];

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [filterType, setFilterType] = useState<'all' | 'unread'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAlerts = alerts.filter(alert => {
    if (filterType === 'unread' && alert.read) return false;
    if (searchQuery) {
      return alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             alert.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
             alert.location?.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  const markAsRead = (id: string) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, read: true } : a));
  };

  const markAllAsRead = () => {
    setAlerts(alerts.map(a => ({ ...a, read: true })));
  };

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-400" />;
      default: return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const getAlertColor = (type: Alert['type']) => {
    switch (type) {
      case 'success': return 'border-l-emerald-500 bg-emerald-500/5';
      case 'warning': return 'border-l-amber-500 bg-amber-500/5';
      case 'error': return 'border-l-red-500 bg-red-500/5';
      default: return 'border-l-blue-500 bg-blue-500/5';
    }
  };

  const unreadCount = alerts.filter(a => !a.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-900 via-slate-900 to-orange-900 p-8 border border-red-500/20"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <Bell className="w-8 h-8 text-red-400" />
              Alerts & Notifications
            </h1>
            <p className="text-red-200 text-lg">
              Stay updated with charging station status and announcements
            </p>
          </div>
          
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl transition-colors"
            >
              <Check className="w-5 h-5" />
              Mark All Read ({unreadCount})
            </button>
          )}
        </div>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search alerts..."
            className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="flex gap-2">
          {(['all', 'unread'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                filterType === type
                  ? 'bg-red-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {type === 'all' ? 'All' : `Unread (${unreadCount})`}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`bg-slate-800/50 rounded-2xl border-l-4 ${getAlertColor(alert.type)} overflow-hidden`}
          >
            <div className="p-6">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`p-3 rounded-xl ${
                  alert.type === 'success' ? 'bg-emerald-500/20' :
                  alert.type === 'warning' ? 'bg-amber-500/20' :
                  alert.type === 'error' ? 'bg-red-500/20' :
                  'bg-blue-500/20'
                }`}>
                  {getAlertIcon(alert.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-white font-semibold flex items-center gap-2">
                        {alert.title}
                        {!alert.read && (
                          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        )}
                      </h3>
                      <p className="text-slate-400 mt-1">{alert.message}</p>
                      {alert.location && (
                        <p className="text-slate-500 text-sm mt-2 flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {alert.location}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {!alert.read && (
                        <button
                          onClick={() => markAsRead(alert.id)}
                          className="p-2 text-slate-400 hover:text-white transition-colors"
                          title="Mark as read"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteAlert(alert.id)}
                        className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Timestamp */}
                  <p className="text-slate-500 text-xs mt-3">
                    {alert.timestamp}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {filteredAlerts.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <Bell className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No alerts found</p>
            <p className="text-sm">Try adjusting your filters</p>
          </div>
        )}
      </div>

      {/* Notification Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
      >
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-400" />
          Notification Settings
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'Station Status Updates', desc: 'Get notified about station online/offline status' },
            { label: 'New Station Openings', desc: 'Notifications when new stations are inaugurated' },
            { label: 'Traffic & Wait Times', desc: 'Alerts about high traffic at charging stations' },
            { label: 'Maintenance Alerts', desc: 'Scheduled maintenance notifications' },
            { label: 'Government Schemes', desc: 'Updates on EV policies and subsidies' },
            { label: 'Promotional Offers', desc: 'Special offers and free charging days' },
          ].map((setting, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl">
              <div>
                <p className="text-white font-medium">{setting.label}</p>
                <p className="text-sm text-slate-400">{setting.desc}</p>
              </div>
              <button className="relative w-12 h-6 bg-emerald-600 rounded-full transition-colors">
                <motion.div
                  animate={{ x: 24 }}
                  className="absolute top-1 w-4 h-4 bg-white rounded-full"
                />
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
