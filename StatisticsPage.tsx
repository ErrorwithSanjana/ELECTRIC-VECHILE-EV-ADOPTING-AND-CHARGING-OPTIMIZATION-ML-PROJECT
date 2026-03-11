import { useState } from 'react';
import { indianStates, chargingStations } from '../data/mockData';
import { 
  TrendingUp, 
  Zap, 
  Car, 
  Battery,
  MapPin,
  BarChart3,
  PieChart,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  Info
} from 'lucide-react';
import { motion } from 'framer-motion';

const monthlyData = [
  { month: 'Jan', stations: 3200, evs: 1800000 },
  { month: 'Feb', stations: 3450, evs: 1950000 },
  { month: 'Mar', stations: 3800, evs: 2100000 },
  { month: 'Apr', stations: 4100, evs: 2280000 },
  { month: 'May', stations: 4500, evs: 2450000 },
  { month: 'Jun', stations: 4900, evs: 2580000 },
  { month: 'Jul', stations: 5100, evs: 2650000 },
  { month: 'Aug', stations: 5350, evs: 2720000 },
  { month: 'Sep', stations: 5600, evs: 2780000 },
  { month: 'Oct', stations: 5720, evs: 2810000 },
  { month: 'Nov', stations: 5780, evs: 2830000 },
  { month: 'Dec', stations: 5847, evs: 2845000 },
];

const topEVModels = [
  { brand: 'Tata', model: 'Nexon EV', sales: 45000, growth: 45 },
  { brand: 'MG', model: 'ZS EV', sales: 28000, growth: 32 },
  { brand: 'Hyundai', model: 'Ioniq 5', sales: 18500, growth: 28 },
  { brand: 'Mahindra', model: 'XUV400', sales: 15200, growth: 65 },
  { brand: 'BYD', model: 'Atto 3', sales: 12000, growth: 85 },
  { brand: 'Kia', model: 'EV6', sales: 8500, growth: 42 },
];

export default function StatisticsPage() {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedMetric, setSelectedMetric] = useState<'stations' | 'evs'>('evs');

  const maxStations = Math.max(...monthlyData.map(d => d.stations));
  const maxEVs = Math.max(...monthlyData.map(d => d.evs));

  const totalStations = chargingStations.filter(s => s.status === 'Active').length;
  const totalEVs = 2845000;
  const fastChargers = chargingStations.filter(s => s.type === 'Fast').length;
  const slowChargers = chargingStations.filter(s => s.type === 'Slow').length;

  const stats = [
    { 
      title: 'Total EV Sales (YTD)', 
      value: (totalEVs / 100000).toFixed(1) + 'L', 
      change: 28.5, 
      icon: Car, 
      color: 'from-blue-500 to-blue-600' 
    },
    { 
      title: 'Active Charging Stations', 
      value: totalStations.toString(), 
      change: 18.5, 
      icon: Zap, 
      color: 'from-emerald-500 to-emerald-600' 
    },
    { 
      title: 'Fast Chargers', 
      value: fastChargers.toString(), 
      change: 32.4, 
      icon: Battery, 
      color: 'from-amber-500 to-amber-600' 
    },
    { 
      title: 'Slow Chargers', 
      value: slowChargers.toString(), 
      change: 12.3, 
      icon: MapPin, 
      color: 'from-purple-500 to-purple-600' 
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-slate-900 to-emerald-900 p-8 border border-blue-500/20"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-blue-400" />
              EV Statistics & Analytics
            </h1>
            <p className="text-blue-200 text-lg">
              Comprehensive electric vehicle adoption and charging infrastructure data
            </p>
          </div>
          
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white"
          >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${stat.change > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {stat.change > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                <span>{stat.change}%</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm">{stat.title}</p>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Growth Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <LineChart className="w-5 h-5 text-blue-400" />
              Growth Trend
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedMetric('evs')}
                className={`px-3 py-1 rounded-lg text-sm ${
                  selectedMetric === 'evs' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'
                }`}
              >
                EVs
              </button>
              <button
                onClick={() => setSelectedMetric('stations')}
                className={`px-3 py-1 rounded-lg text-sm ${
                  selectedMetric === 'stations' ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300'
                }`}
              >
                Stations
              </button>
            </div>
          </div>
          
          <div className="h-64 flex items-end gap-2">
            {monthlyData.map((data, index) => (
              <motion.div
                key={data.month}
                initial={{ height: 0 }}
                animate={{ 
                  height: `${(selectedMetric === 'evs' ? data.evs : data.stations) / (selectedMetric === 'evs' ? maxEVs : maxStations) * 100}%`
                }}
                transition={{ delay: 0.5 + index * 0.05, duration: 0.5 }}
                className={`flex-1 rounded-t-lg ${
                  selectedMetric === 'evs' 
                    ? 'bg-gradient-to-t from-blue-600 to-blue-400' 
                    : 'bg-gradient-to-t from-emerald-600 to-emerald-400'
                }`}
              >
                <div className="relative group">
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 px-3 py-2 rounded-lg text-white text-sm whitespace-nowrap transition-opacity">
                    {selectedMetric === 'evs' 
                      ? `${(data.evs / 100000).toFixed(1)}L EVs`
                      : `${data.stations} stations`
                    }
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-slate-500">
            {monthlyData.map(d => (
              <span key={d.month}>{d.month}</span>
            ))}
          </div>
        </motion.div>

        {/* Station Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
        >
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-emerald-400" />
            Station Type Distribution
          </h3>
          
          <div className="flex items-center justify-center gap-8">
            {/* Pie Chart Visual */}
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="20"
                  strokeDasharray={`${(fastChargers / (fastChargers + slowChargers)) * 251.2} 251.2`}
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="20"
                  strokeDasharray={`${(slowChargers / (fastChargers + slowChargers)) * 251.2} 251.2`}
                  strokeDashoffset={-((fastChargers / (fastChargers + slowChargers)) * 251.2)}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{fastChargers + slowChargers}</p>
                  <p className="text-xs text-slate-400">Total</p>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                <div>
                  <p className="text-white font-medium">Fast Chargers</p>
                  <p className="text-sm text-slate-400">{fastChargers} ({Math.round((fastChargers / (fastChargers + slowChargers)) * 100)}%)</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                <div>
                  <p className="text-white font-medium">Slow Chargers</p>
                  <p className="text-sm text-slate-400">{slowChargers} ({Math.round((slowChargers / (fastChargers + slowChargers)) * 100)}%)</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Top EV Models */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
      >
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-amber-400" />
          Top Selling EV Models in India
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Rank</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Brand</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Model</th>
                <th className="text-right py-3 px-4 text-slate-400 font-medium">Sales</th>
                <th className="text-right py-3 px-4 text-slate-400 font-medium">Growth</th>
              </tr>
            </thead>
            <tbody>
              {topEVModels.map((model, index) => (
                <motion.tr 
                  key={model.model}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="border-b border-slate-700/50 hover:bg-slate-800/50"
                >
                  <td className="py-3 px-4">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                      index === 0 ? 'bg-amber-500 text-white' :
                      index === 1 ? 'bg-slate-300 text-slate-900' :
                      index === 2 ? 'bg-amber-700 text-white' :
                      'bg-slate-700 text-white'
                    }`}>
                      {index + 1}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-white font-medium">{model.brand}</td>
                  <td className="py-3 px-4 text-slate-300">{model.model}</td>
                  <td className="py-3 px-4 text-right text-white font-mono">{model.sales.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-emerald-400 flex items-center justify-end gap-1">
                      <ArrowUpRight className="w-4 h-4" />
                      {model.growth}%
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* State Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
      >
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-400" />
          State-wise EV Infrastructure
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {indianStates.slice(0, 12).map((state, index) => (
            <motion.div
              key={state.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + index * 0.05 }}
              className="p-4 bg-slate-900/50 rounded-xl border border-slate-700"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">{state.name}</span>
                <span className="text-blue-400 font-bold">{state.totalStations}</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(state.totalStations / 612) * 100}%` }}
                  transition={{ delay: 1 + index * 0.05, duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-slate-500">
                <span>{state.evPenetration}% EV</span>
                <span>{state.coveragePercent}% coverage</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
