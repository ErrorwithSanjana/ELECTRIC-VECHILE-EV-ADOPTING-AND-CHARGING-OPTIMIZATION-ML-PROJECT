import { useState, useMemo } from 'react';
import { useAppStore } from '../store/useAppStore';
import { chargingStations, getUniqueStates, getUniqueCities, indianStates } from '../data/mockData';
import { ChargingStation } from '../types';
import { 
  MapPin, 
  Search, 
  Filter, 
  X, 
  Zap, 
  Battery, 
  DollarSign, 
  Calendar,
  Building,
  ChevronDown,
  Clock,
  Wifi,
  WifiOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const stationTypeOptions = ['All', 'Fast', 'Slow'];
const availabilityOptions = ['All', 'Active', 'Under Maintenance', 'Planned'];

// Interactive map with markers
const InteractiveMap = ({ 
  stations, 
  onStationClick 
}: { 
  stations: ChargingStation[], 
  onStationClick: (station: ChargingStation) => void 
}) => {
  // Group stations by approximate location
  const locationGroups = useMemo(() => {
    const groups: Record<string, ChargingStation[]> = {};
    
    stations.forEach(station => {
      const key = `${Math.round(station.coordinates.lat * 10)},${Math.round(station.coordinates.lng * 10)}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(station);
    });
    
    return groups;
  }, [stations]);

  return (
    <svg viewBox="0 0 450 500" className="w-full h-full" style={{ filter: 'drop-shadow(0 0 30px rgba(59, 130, 246, 0.2))' }}>
      <defs>
        <linearGradient id="mapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      
      {/* Simplified India boundary */}
      <path
        d="M 120 120 L 180 100 L 250 90 L 320 80 L 380 90 L 420 110 L 440 160 L 430 220 L 410 280 L 380 340 L 340 400 L 280 450 L 220 470 L 180 450 L 140 400 L 100 340 L 80 280 L 85 220 L 100 160 Z"
        fill="url(#mapGrad)"
        stroke="#3b82f6"
        strokeWidth="1.5"
        opacity="0.6"
      />

      {/* Station Markers */}
      {Object.entries(locationGroups).map(([key, groupStations]) => {
        const [lat, lng] = key.split(',').map(Number);
        const x = lng * 10 + 225;
        const y = 500 - (lat * 10 + 125);
        
        const isSingle = groupStations.length === 1;
        const statusColor = groupStations[0].status === 'Active' ? '#22c55e' : 
                          groupStations[0].status === 'Under Maintenance' ? '#f59e0b' : '#94a3b8';
        
        return (
          <g 
            key={key} 
            className="cursor-pointer"
            onClick={() => onStationClick(groupStations[0])}
          >
            {/* Pulse animation for active stations */}
            {groupStations[0].status === 'Active' && (
              <circle
                cx={x}
                cy={y}
                r={isSingle ? 12 : 18}
                fill="none"
                stroke={statusColor}
                strokeWidth="1"
                opacity="0.4"
              >
                <animate attributeName="r" values={`${isSingle ? 12 : 18};${isSingle ? 20 : 28};${isSingle ? 12 : 18}`} dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
              </circle>
            )}
            
            {/* Main marker */}
            <circle
              cx={x}
              cy={y}
              r={isSingle ? 8 : 12}
              fill={statusColor}
              stroke="#1e293b"
              strokeWidth="2"
            />
            
            {/* Count badge for grouped stations */}
            {!isSingle && (
              <text
                x={x}
                y={y + 4}
                textAnchor="middle"
                fill="white"
                fontSize="8"
                fontWeight="bold"
              >
                {groupStations.length}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
};

// Station Details Modal
const StationModal = ({ 
  station, 
  onClose 
}: { 
  station: ChargingStation, 
  onClose: () => void 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-slate-800 rounded-2xl max-w-lg w-full border border-slate-700 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-emerald-600 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">{station.name}</h3>
              <p className="text-blue-100 text-sm">{station.id}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              station.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' :
              station.status === 'Under Maintenance' ? 'bg-amber-500/20 text-amber-400' :
              'bg-slate-500/20 text-slate-400'
            }`}>
              {station.status === 'Active' ? '●' : '○'} {station.status}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              station.type === 'Fast' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'
            }`}>
              ⚡ {station.type} Charging
            </span>
          </div>

          {/* Location */}
          <div className="flex items-start gap-3 p-4 bg-slate-900/50 rounded-xl">
            <MapPin className="w-5 h-5 text-blue-400 mt-0.5" />
            <div>
              <p className="text-white">{station.address}</p>
              <p className="text-slate-400 text-sm">{station.city}, {station.state}</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-900/50 rounded-xl">
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <Battery className="w-4 h-4" />
                <span className="text-sm">Daily Usage</span>
              </div>
              <p className="text-2xl font-bold text-white">{station.dailyUsage}</p>
              <p className="text-xs text-slate-500">sessions/day</p>
            </div>
            <div className="p-4 bg-slate-900/50 rounded-xl">
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <DollarSign className="w-4 h-4" />
                <span className="text-sm">Revenue</span>
              </div>
              <p className="text-2xl font-bold text-white">₹{station.revenue.toLocaleString()}</p>
              <p className="text-xs text-slate-500">per day</p>
            </div>
          </div>

          {/* Ports */}
          <div>
            <p className="text-slate-400 text-sm mb-2">Charging Ports</p>
            <div className="flex flex-wrap gap-2">
              {station.ports.map((port) => (
                <span key={port} className="px-3 py-1 bg-slate-700 rounded-lg text-sm text-white">
                  {port}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Info */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-700">
            <div className="flex items-center gap-2 text-slate-400">
              <Building className="w-4 h-4" />
              <span className="text-sm">{station.operator}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{station.installedDate}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function StationMapPage() {
  const { filters, setFilters, selectedStation, setSelectedStation, searchQuery, setSearchQuery } = useAppStore();
  const [showFilters, setShowFilters] = useState(false);
  
  const states = getUniqueStates();
  const cities = getUniqueCities(filters.state);

  // Filter stations
  const filteredStations = useMemo(() => {
    return chargingStations.filter(station => {
      if (filters.state && station.state !== filters.state) return false;
      if (filters.city && station.city !== filters.city) return false;
      if (filters.stationType && filters.stationType !== 'All' && station.type !== filters.stationType) return false;
      if (filters.availability && filters.availability !== 'All' && station.status !== filters.availability) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!station.name.toLowerCase().includes(query) && 
            !station.city.toLowerCase().includes(query) &&
            !station.state.toLowerCase().includes(query)) {
          return false;
        }
      }
      return true;
    });
  }, [filters, searchQuery]);

  const handleStationClick = (station: ChargingStation) => {
    setSelectedStation(station);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Charging Station Map</h1>
          <p className="text-slate-400">Interactive view of all EV charging stations across India</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-400">
            Showing {filteredStations.length} stations
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stations, cities..."
            className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-colors ${
            showFilters ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <Filter className="w-5 h-5" />
          <span>Filters</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* State Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">State</label>
                <select
                  value={filters.state}
                  onChange={(e) => setFilters({ state: e.target.value, city: '' })}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All States</option>
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              {/* City Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">City</label>
                <select
                  value={filters.city}
                  onChange={(e) => setFilters({ city: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!filters.state}
                >
                  <option value="">All Cities</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* Station Type */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Station Type</label>
                <select
                  value={filters.stationType}
                  onChange={(e) => setFilters({ stationType: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {stationTypeOptions.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Availability */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Availability</label>
                <select
                  value={filters.availability}
                  onChange={(e) => setFilters({ availability: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {availabilityOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active Filters */}
            {(filters.state || filters.city || filters.stationType || filters.availability) && (
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-700">
                <span className="text-sm text-slate-400">Active filters:</span>
                {filters.state && (
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                    {filters.state} <button onClick={() => setFilters({ state: '' })} className="ml-1">×</button>
                  </span>
                )}
                {filters.city && (
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm">
                    {filters.city} <button onClick={() => setFilters({ city: '' })} className="ml-1">×</button>
                  </span>
                )}
                {filters.stationType && filters.stationType !== 'All' && (
                  <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm">
                    {filters.stationType} <button onClick={() => setFilters({ stationType: '' })} className="ml-1">×</button>
                  </span>
                )}
                {filters.availability && filters.availability !== 'All' && (
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                    {filters.availability} <button onClick={() => setFilters({ availability: '' })} className="ml-1">×</button>
                  </span>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map and List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
        >
          <h2 className="text-lg font-semibold text-white mb-4">India Network Map</h2>
          <div className="h-[500px]">
            <InteractiveMap stations={filteredStations} onStationClick={handleStationClick} />
          </div>
          
          {/* Map Legend */}
          <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-slate-700">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-sm text-slate-400">Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span className="text-sm text-slate-400">Maintenance</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-500"></div>
              <span className="text-sm text-slate-400">Planned</span>
            </div>
          </div>
        </motion.div>

        {/* Station List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
        >
          <h2 className="text-lg font-semibold text-white mb-4">Station List</h2>
          <div className="space-y-3 max-h-[540px] overflow-y-auto pr-2">
            {filteredStations.slice(0, 20).map((station) => (
              <div
                key={station.id}
                onClick={() => handleStationClick(station)}
                className="p-4 bg-slate-900/50 rounded-xl border border-slate-700 hover:border-blue-500/50 cursor-pointer transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium truncate">{station.name}</h3>
                    <p className="text-slate-500 text-sm">{station.city}, {station.state}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    station.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' :
                    station.status === 'Under Maintenance' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-slate-500/20 text-slate-400'
                  }`}>
                    {station.status === 'Active' ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3" /> {station.type}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {station.dailyUsage}/day
                  </span>
                </div>
              </div>
            ))}
            
            {filteredStations.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                <MapPin className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No stations found</p>
                <p className="text-sm">Try adjusting your filters</p>
              </div>
            )}
            
            {filteredStations.length > 20 && (
              <p className="text-center text-slate-500 text-sm py-2">
                + {filteredStations.length - 20} more stations
              </p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Station Modal */}
      <AnimatePresence>
        {selectedStation && (
          <StationModal 
            station={selectedStation} 
            onClose={() => setSelectedStation(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
