import { useState, useMemo } from 'react';
import { chargingStations, getUniqueStates, getCityData } from '../data/mockData';
import { ChargingStation } from '../types';
import { 
  Building2, 
  MapPin, 
  Zap, 
  DollarSign, 
  Battery, 
  Clock,
  Search,
  ChevronDown,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CitiesPage() {
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  const states = getUniqueStates();
  
  // Get cities based on selected state
  const cities = useMemo(() => {
    const filtered = selectedState 
      ? chargingStations.filter(s => s.state === selectedState)
      : chargingStations;
    return [...new Set(filtered.map(s => s.city))].sort();
  }, [selectedState]);

  // City stats
  const cityStats = useMemo(() => {
    let filtered = chargingStations;
    if (selectedState) filtered = filtered.filter(s => s.state === selectedState);
    if (selectedCity) filtered = filtered.filter(s => s.city === selectedCity);
    if (searchQuery) {
      filtered = filtered.filter(s => 
        s.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.state.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Group by city
    const cityMap: Record<string, { 
      stations: ChargingStation[], 
      total: number,
      active: number,
      fast: number,
      slow: number,
      avgRevenue: number,
      state: string
    }> = {};

    filtered.forEach(s => {
      if (!cityMap[s.city]) {
        cityMap[s.city] = {
          stations: [],
          total: 0,
          active: 0,
          fast: 0,
          slow: 0,
          avgRevenue: 0,
          state: s.state
        };
      }
      cityMap[s.city].stations.push(s);
      cityMap[s.city].total++;
      if (s.status === 'Active') cityMap[s.city].active++;
      if (s.type === 'Fast') cityMap[s.city].fast++;
      else cityMap[s.city].slow++;
      cityMap[s.city].avgRevenue += s.revenue;
    });

    // Calculate averages
    Object.keys(cityMap).forEach(city => {
      cityMap[city].avgRevenue = Math.round(cityMap[city].avgRevenue / cityMap[city].total);
    });

    return Object.entries(cityMap)
      .map(([city, data]) => ({ city, ...data }))
      .sort((a, b) => b.total - a.total);
  }, [selectedState, selectedCity, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">City Details</h1>
          <p className="text-slate-400">EV charging infrastructure analysis by city</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* State Filter */}
        <div className="w-full sm:w-64">
          <label className="block text-sm font-medium text-slate-300 mb-2">State</label>
          <div className="relative">
            <select
              value={selectedState}
              onChange={(e) => { setSelectedState(e.target.value); setSelectedCity(''); }}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="">All States</option>
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search cities..."
            className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <p className="text-slate-400 text-sm">Total Cities</p>
          <p className="text-2xl font-bold text-white">{cityStats.length}</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <p className="text-slate-400 text-sm">Total Stations</p>
          <p className="text-2xl font-bold text-white">
            {cityStats.reduce((acc, c) => acc + c.total, 0)}
          </p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <p className="text-slate-400 text-sm">Active Stations</p>
          <p className="text-2xl font-bold text-emerald-400">
            {cityStats.reduce((acc, c) => acc + c.active, 0)}
          </p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <p className="text-slate-400 text-sm">Daily Revenue</p>
          <p className="text-2xl font-bold text-amber-400">
            ₹{cityStats.reduce((acc, c) => acc + c.avgRevenue * c.total, 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* City Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {cityStats.map((cityData, index) => (
            <motion.div
              key={cityData.city}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all cursor-pointer group"
              onClick={() => setSelectedCity(selectedCity === cityData.city ? '' : cityData.city)}
            >
              {/* City Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {cityData.city}
                  </h3>
                  <p className="text-sm text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {cityData.state}
                  </p>
                </div>
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Building2 className="w-5 h-5 text-blue-400" />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-900/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <Zap className="w-4 h-4" />
                    <span className="text-xs">Total</span>
                  </div>
                  <p className="text-xl font-bold text-white">{cityData.total}</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <Battery className="w-4 h-4" />
                    <span className="text-xs">Active</span>
                  </div>
                  <p className="text-xl font-bold text-emerald-400">{cityData.active}</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <span className="text-xs">Fast</span>
                  </div>
                  <p className="text-xl font-bold text-blue-400">{cityData.fast}</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-xs">Avg Rev</span>
                  </div>
                  <p className="text-xl font-bold text-amber-400">₹{cityData.avgRevenue.toLocaleString()}</p>
                </div>
              </div>

              {/* Type Breakdown */}
              <div className="mt-4 pt-4 border-t border-slate-700">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span>Type Distribution</span>
                </div>
                <div className="flex h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-500" 
                    style={{ width: `${(cityData.fast / cityData.total) * 100}%` }}
                  />
                  <div 
                    className="bg-emerald-500" 
                    style={{ width: `${(cityData.slow / cityData.total) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-blue-400">{cityData.fast} Fast</span>
                  <span className="text-emerald-400">{cityData.slow} Slow</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {cityStats.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          <Building2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">No cities found</p>
          <p className="text-sm">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}
