import { useState, useMemo } from 'react';
import { heatmapData, indianStates } from '../data/mockData';
import { HeatmapData } from '../types';
import { 
  Map, 
  Flame, 
  Zap, 
  Clock, 
  TrendingUp, 
  Search,
  Filter,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeatmapPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'demand' | 'stations' | 'wait'>('demand');
  const [showAll, setShowAll] = useState(true);

  const filteredData = useMemo(() => {
    let data = heatmapData;
    if (searchQuery) {
      data = data.filter(d => 
        d.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.state.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return data;
  }, [searchQuery]);

  const getHeatColor = (value: number, mode: string) => {
    if (mode === 'demand') {
      if (value >= 80) return 'bg-red-500';
      if (value >= 60) return 'bg-orange-500';
      if (value >= 40) return 'bg-yellow-500';
      if (value >= 20) return 'bg-green-500';
      return 'bg-emerald-400';
    } else if (mode === 'stations') {
      if (value >= 10) return 'bg-indigo-500';
      if (value >= 7) return 'bg-blue-500';
      if (value >= 4) return 'bg-cyan-500';
      return 'bg-sky-400';
    } else {
      if (value >= 30) return 'bg-red-500';
      if (value >= 20) return 'bg-orange-500';
      if (value >= 10) return 'bg-yellow-500';
      return 'bg-green-500';
    }
  };

  const getBorderColor = (value: number, mode: string) => {
    if (mode === 'demand') {
      if (value >= 80) return 'border-red-400';
      if (value >= 60) return 'border-orange-400';
      if (value >= 40) return 'border-yellow-400';
      return 'border-green-400';
    }
    return 'border-indigo-400';
  };

  const topCities = [...filteredData]
    .sort((a, b) => b.demand - a.demand)
    .slice(0, 10);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-pink-900 via-purple-900 to-indigo-900 p-8 border border-pink-500/20"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative z-10">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <Flame className="w-8 h-8 text-pink-400" />
            EV Demand Heatmap India
          </h1>
          <p className="text-pink-200 text-lg">
            Real-time charging demand distribution across Indian cities
          </p>
        </div>
      </motion.div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search city or state..."
            className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white"
          />
        </div>

        {/* View Mode Toggle */}
        <div className="flex bg-slate-800 rounded-xl p-1">
          <button
            onClick={() => setViewMode('demand')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              viewMode === 'demand' ? 'bg-pink-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Flame className="w-4 h-4 inline mr-2" />
            Demand
          </button>
          <button
            onClick={() => setViewMode('stations')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              viewMode === 'stations' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-4 h-4 inline mr-2" />
            Stations
          </button>
          <button
            onClick={() => setViewMode('wait')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              viewMode === 'wait' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4 inline mr-2" />
            Wait Time
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
        >
          <div className="flex items-center gap-3 mb-2">
            <Flame className="w-5 h-5 text-pink-400" />
            <span className="text-slate-400">High Demand Areas</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {filteredData.filter(d => d.demand >= 60).length}
          </p>
          <p className="text-sm text-slate-500">Cities</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
        >
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-5 h-5 text-indigo-400" />
            <span className="text-slate-400">Total Coverage</span>
          </div>
          <p className="text-2xl font-bold text-white">{filteredData.length}</p>
          <p className="text-sm text-slate-500">Cities with stations</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
        >
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <span className="text-slate-400">Avg Demand</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {Math.round(filteredData.reduce((acc, d) => acc + d.demand, 0) / filteredData.length)}%
          </p>
          <p className="text-sm text-slate-500">Nationwide</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
        >
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-amber-400" />
            <span className="text-slate-400">Avg Wait Time</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {Math.round(filteredData.reduce((acc, d) => acc + d.avgWaitTime, 0) / filteredData.length)} min
          </p>
          <p className="text-sm text-slate-500">Across India</p>
        </motion.div>
      </div>

      {/* Heatmap Grid */}
      <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
        <h3 className="text-white font-semibold mb-4">
          {viewMode === 'demand' ? 'Charging Demand' : viewMode === 'stations' ? 'Station Density' : 'Wait Time Distribution'} by City
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredData.map((city, idx) => {
            const value = viewMode === 'demand' ? city.demand : viewMode === 'stations' ? city.stationCount : city.avgWaitTime;
            return (
              <motion.div
                key={city.city}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.02 }}
                className={`relative p-4 rounded-xl border-2 ${getBorderColor(value, viewMode)} ${getHeatColor(value, viewMode)} bg-opacity-20 cursor-pointer hover:scale-105 transition-transform`}
              >
                <div className="text-white font-semibold">{city.city}</div>
                <div className="text-white/80 text-sm">{city.state}</div>
                <div className="mt-2 text-white font-bold">
                  {viewMode === 'demand' ? `${value}%` : viewMode === 'stations' ? `${value} stations` : `${value} min`}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Top Cities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Demand Cities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
        >
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-pink-400" />
            Highest Demand Cities
          </h3>
          <div className="space-y-3">
            {topCities.slice(0, 5).map((city, idx) => (
              <div key={city.city} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-white">{city.city}</span>
                    <span className="text-pink-400 font-semibold">{city.demand}%</span>
                  </div>
                  <div className="h-2 bg-slate-900 rounded-full mt-1 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-pink-500 to-pink-400"
                      style={{ width: `${city.demand}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Most Stations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
        >
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-400" />
            Most Station Coverage
          </h3>
          <div className="space-y-3">
            {[...filteredData]
              .sort((a, b) => b.stationCount - a.stationCount)
              .slice(0, 5)
              .map((city, idx) => (
                <div key={city.city} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-white">{city.city}</span>
                      <span className="text-indigo-400 font-semibold">{city.stationCount} stations</span>
                    </div>
                    <div className="h-2 bg-slate-900 rounded-full mt-1 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400"
                        style={{ width: `${(city.stationCount / 15) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
