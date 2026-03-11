import { useState, useMemo } from 'react';
import { indianStates, chargingStations, getStationsByState } from '../data/mockData';
import { 
  BarChart3, 
  TrendingUp, 
  MapPin, 
  Zap, 
  Car, 
  Building2,
  ChevronDown,
  PieChart,
  Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AnalyticsPage() {
  const [selectedState, setSelectedState] = useState<string>('Delhi');
  
  const stateData = indianStates.find(s => s.name === selectedState);
  const stateStations = getStationsByState(selectedState);
  
  // Calculate stats for the selected state
  const stats = useMemo(() => {
    const fastCount = stateStations.filter(s => s.type === 'Fast').length;
    const slowCount = stateStations.filter(s => s.type === 'Slow').length;
    const activeCount = stateStations.filter(s => s.status === 'Active').length;
    const avgDailyUsage = stateStations.reduce((acc, s) => acc + s.dailyUsage, 0) / (stateStations.length || 1);
    const avgRevenue = stateStations.reduce((acc, s) => acc + s.revenue, 0) / (stateStations.length || 1);
    
    return { fastCount, slowCount, activeCount, avgDailyUsage, avgRevenue };
  }, [stateStations]);

  // Top cities in state
  const topCities = useMemo(() => {
    const cityCounts: Record<string, number> = {};
    stateStations.forEach(s => {
      cityCounts[s.city] = (cityCounts[s.city] || 0) + 1;
    });
    return Object.entries(cityCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [stateStations]);

  // Station distribution by type
  const typeDistribution = [
    { name: 'Fast Charging', value: stats.fastCount, color: 'bg-blue-500' },
    { name: 'Slow Charging', value: stats.slowCount, color: 'bg-emerald-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">State Analytics</h1>
          <p className="text-slate-400">Detailed analysis of EV charging infrastructure by state</p>
        </div>
      </div>

      {/* State Selector */}
      <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
        <label className="block text-sm font-medium text-slate-300 mb-2">Select State/Union Territory</label>
        <div className="relative">
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
          >
            {indianStates.map(state => (
              <option key={state.id} value={state.name}>
                {state.name} ({state.abbrev})
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
        </div>
      </div>

      {/* State Overview */}
      {stateData && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-500/10 rounded-xl">
                  <Zap className="w-6 h-6 text-blue-400" />
                </div>
                <span className="text-slate-400">Total Stations</span>
              </div>
              <p className="text-3xl font-bold text-white">{stateData.totalStations}</p>
              <p className="text-sm text-slate-500 mt-1">Across {topCities.length} cities</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-emerald-500/10 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-emerald-400" />
                </div>
                <span className="text-slate-400">Coverage</span>
              </div>
              <p className="text-3xl font-bold text-white">{stateData.coveragePercent}%</p>
              <p className="text-sm text-slate-500 mt-1">Infrastructure coverage</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-amber-500/10 rounded-xl">
                  <Car className="w-6 h-6 text-amber-400" />
                </div>
                <span className="text-slate-400">EV Adoption</span>
              </div>
              <p className="text-3xl font-bold text-white">{stateData.evPenetration}%</p>
              <p className="text-sm text-slate-500 mt-1">Vehicle penetration</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-purple-500/10 rounded-xl">
                  <Building2 className="w-6 h-6 text-purple-400" />
                </div>
                <span className="text-slate-400">Capital</span>
              </div>
              <p className="text-xl font-bold text-white">{stateData.capital}</p>
              <p className="text-sm text-slate-500 mt-1">State capital</p>
            </motion.div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Station Type Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-blue-400" />
                Station Distribution
              </h3>
              <div className="space-y-4">
                {typeDistribution.map((item) => {
                  const total = stats.fastCount + stats.slowCount || 1;
                  const percentage = Math.round((item.value / total) * 100);
                  return (
                    <div key={item.name}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-300">{item.name}</span>
                        <span className="text-white font-medium">{item.value} ({percentage}%)</span>
                      </div>
                      <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.8, delay: 0.5 }}
                          className={`h-full ${item.color} rounded-full`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-700">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{stats.activeCount}</p>
                  <p className="text-sm text-slate-500">Active Stations</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{stateStations.length - stats.activeCount}</p>
                  <p className="text-sm text-slate-500">Inactive/Planned</p>
                </div>
              </div>
            </motion.div>

            {/* Top Cities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-400" />
                Top Cities by Stations
              </h3>
              <div className="space-y-4">
                {topCities.map(([city, count], index) => (
                  <div key={city} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-sm font-bold text-white">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white font-medium">{city}</span>
                        <span className="text-slate-400">{count} stations</span>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"
                          style={{ width: `${(count / (topCities[0]?.[1] || 1)) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-amber-400" />
              Performance Metrics - {selectedState}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-4 bg-slate-900/50 rounded-xl">
                <p className="text-slate-400 text-sm mb-1">Average Daily Usage</p>
                <p className="text-2xl font-bold text-white">{Math.round(stats.avgDailyUsage)}</p>
                <p className="text-xs text-slate-500">sessions per station</p>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-xl">
                <p className="text-slate-400 text-sm mb-1">Average Revenue</p>
                <p className="text-2xl font-bold text-white">₹{Math.round(stats.avgRevenue).toLocaleString()}</p>
                <p className="text-xs text-slate-500">per station per day</p>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-xl">
                <p className="text-slate-400 text-sm mb-1">Population</p>
                <p className="text-2xl font-bold text-white">{(stateData.population / 10000000).toFixed(1)}Cr</p>
                <p className="text-xs text-slate-500">total population</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
