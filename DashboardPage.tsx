import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { dashboardStats, getTopStatesByStations, chargingStations } from '../data/mockData';
import { 
  Zap, 
  Car, 
  Hammer, 
  IndianRupee, 
  TrendingUp, 
  MapPin, 
  ArrowUpRight,
  Battery,
  Navigation,
  Target,
  Info
} from 'lucide-react';
import { motion } from 'framer-motion';

const statsCards = [
  {
    title: 'Total Charging Stations',
    value: dashboardStats.totalStations.toLocaleString(),
    icon: Zap,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
    growth: `+${dashboardStats.stationsGrowth}%`,
  },
  {
    title: 'Electric Vehicles Registered',
    value: (dashboardStats.totalEVs / 100000).toFixed(1) + 'L',
    icon: Car,
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
    growth: `+${dashboardStats.evGrowth}%`,
  },
  {
    title: 'Under Construction',
    value: dashboardStats.underConstruction.toLocaleString(),
    icon: Hammer,
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-500/10',
    iconColor: 'text-amber-400',
    growth: '+127',
  },
  {
    title: 'Total Revenue (₹)',
    value: '₹' + (dashboardStats.totalRevenue / 10000000).toFixed(1) + 'Cr',
    icon: IndianRupee,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-500/10',
    iconColor: 'text-purple-400',
    growth: '+23.4%',
  },
];

// Enhanced India map with clickable state markers
const IndiaMapSVG = ({ onStateClick }: { onStateClick: (state: string) => void }) => {
  const topStates = getTopStatesByStations(8);
  
  // State coordinates for markers
  const stateCoords: Record<string, { x: number; y: number; name: string }> = {
    'Delhi': { x: 280, y: 180, name: 'Delhi' },
    'Maharashtra': { x: 300, y: 320, name: 'Maharashtra' },
    'Karnataka': { x: 220, y: 400, name: 'Karnataka' },
    'Tamil Nadu': { x: 200, y: 460, name: 'Tamil Nadu' },
    'Gujarat': { x: 180, y: 260, name: 'Gujarat' },
    'Uttar Pradesh': { x: 320, y: 180, name: 'Uttar Pradesh' },
    'West Bengal': { x: 390, y: 250, name: 'West Bengal' },
    'Rajasthan': { x: 180, y: 180, name: 'Rajasthan' },
    'Madhya Pradesh': { x: 260, y: 250, name: 'Madhya Pradesh' },
    'Telangana': { x: 280, y: 370, name: 'Telangana' },
    'Kerala': { x: 220, y: 490, name: 'Kerala' },
    'Punjab': { x: 270, y: 140, name: 'Punjab' },
    'Haryana': { x: 290, y: 165, name: 'Haryana' },
    'Andhra Pradesh': { x: 260, y: 410, name: 'Andhra Pradesh' },
  };

  return (
    <svg viewBox="0 0 450 500" className="w-full h-full" style={{ filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))' }}>
      <defs>
        <linearGradient id="indiaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="stateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="innerShadow">
          <feOffset dx="0" dy="2"/>
          <feGaussianBlur stdDeviation="2" result="offset-blur"/>
          <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"/>
          <feFlood floodColor="black" floodOpacity="0.3" result="color"/>
          <feComposite operator="in" in="color" in2="inverse" result="shadow"/>
          <feComposite operator="over" in="shadow" in2="SourceGraphic"/>
        </filter>
      </defs>
      
      {/* India boundary */}
      <path
        d="M 120 120 L 180 100 L 250 90 L 320 80 L 380 90 L 420 110 L 440 160 L 430 220 L 410 280 L 380 340 L 340 400 L 280 450 L 220 470 L 180 450 L 140 400 L 100 340 L 80 280 L 85 220 L 100 160 Z"
        fill="url(#indiaGrad)"
        stroke="#3b82f6"
        strokeWidth="1.5"
        opacity="0.6"
      />
      
      {/* Clickable State Markers */}
      {topStates.map((state) => {
        const coords = stateCoords[state.name];
        if (!coords) return null;
        const size = Math.min(35, Math.max(12, state.totalStations / 25));
        
        return (
          <g 
            key={state.id} 
            className="cursor-pointer group"
            onClick={() => onStateClick(state.name)}
            filter="url(#glow)"
          >
            {/* Pulse ring animation */}
            <circle
              cx={coords.x}
              cy={coords.y}
              r={size * 1.8}
              fill="none"
              stroke={state.totalStations > 400 ? '#ef4444' : state.totalStations > 200 ? '#f59e0b' : '#22c55e'}
              strokeWidth="1.5"
              opacity="0.2"
              className="animate-ping"
            />
            
            {/* Outer ring */}
            <circle
              cx={coords.x}
              cy={coords.y}
              r={size + 6}
              fill="none"
              stroke={state.totalStations > 400 ? '#ef4444' : state.totalStations > 200 ? '#f59e0b' : '#22c55e'}
              strokeWidth="2"
              opacity="0.5"
              className="transition-all duration-300 group-hover:opacity-100"
            />
            
            {/* Main marker with gradient */}
            <circle
              cx={coords.x}
              cy={coords.y}
              r={size}
              fill="url(#stateGrad)"
              stroke="#1e293b"
              strokeWidth="2"
              filter="url(#innerShadow)"
              className="transition-transform duration-300 group-hover:scale-125"
            />
            
            {/* Inner glow */}
            <circle
              cx={coords.x}
              cy={coords.y}
              r={size * 0.5}
              fill="white"
              opacity="0.3"
            />
            
            {/* Label */}
            <text
              x={coords.x}
              y={coords.y + size + 18}
              textAnchor="middle"
              fill="#e2e8f0"
              fontSize="9"
              fontWeight="600"
              className="transition-opacity duration-300 group-hover:opacity-100"
            >
              {state.abbrev}
            </text>
            
            {/* Tooltip on hover */}
            <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <rect
                x={coords.x - 50}
                y={coords.y - size - 45}
                width="100"
                height="35"
                rx="6"
                fill="#1e293b"
                stroke="#475569"
                strokeWidth="1"
              />
              <text
                x={coords.x}
                y={coords.y - size - 28}
                textAnchor="middle"
                fill="white"
                fontSize="10"
                fontWeight="600"
              >
                {state.name}
              </text>
              <text
                x={coords.x}
                y={coords.y - size - 16}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize="9"
              >
                {state.totalStations} stations
              </text>
            </g>
          </g>
        );
      })}
      
      {/* Decorative dots */}
      {[...Array(15)].map((_, i) => (
        <circle
          key={i}
          cx={100 + Math.random() * 250}
          cy={100 + Math.random() * 300}
          r={1 + Math.random() * 2}
          fill="#3b82f6"
          opacity="0.3 + Math.random() * 0.3"
          className="animate-pulse"
          style={{ animationDelay: `${Math.random() * 2}s` }}
        />
      ))}
    </svg>
  );
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const topStates = getTopStatesByStations(5);
  const recentStations = [...chargingStations].sort((a, b) => 
    new Date(b.installedDate).getTime() - new Date(a.installedDate).getTime()
  ).slice(0, 5);

  const handleStateClick = (state: string) => {
    navigate(`/map?state=${encodeURIComponent(state)}`);
  };

  const handleExploreStations = () => {
    navigate('/map');
  };

  const handleFindNearest = () => {
    navigate('/nearest');
  };

  return (
    <div className="space-y-6">
      {/* Hero Section with Animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-slate-900 to-emerald-900 p-8 border border-blue-500/20"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl lg:text-4xl font-bold text-white mb-2"
            >
              Welcome to EV India Charge Hub
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-blue-200 text-lg"
            >
              Ministry of Power, Government of India
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 mt-2"
            >
              Monitor and optimize India's electric vehicle charging infrastructure
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <button
              onClick={handleFindNearest}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25"
            >
              <Navigation className="w-5 h-5" />
              Find Nearest Station
            </button>
            <button
              onClick={handleExploreStations}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
            >
              <MapPin className="w-5 h-5" />
              Explore Map
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-slate-400">Electric Vehicle Charging Infrastructure - All India</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span>Data updated: Just now</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 hover:border-blue-500/30 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
              <div className="flex items-center gap-1 text-emerald-400 text-sm">
                <ArrowUpRight className="w-4 h-4" />
                <span>{stat.growth}</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-1">{stat.title}</p>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* India Map - Clickable */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-slate-800/50 rounded-2xl p-6 border border-slate-700 hover:border-blue-500/30 transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-400" />
              Interactive India Map
            </h2>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                400+
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                200-400
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>&lt;200</span>
              </span>
            </div>
          </div>
          
          <div className="relative h-80">
            <IndiaMapSVG onStateClick={handleStateClick} />
          </div>
          
          {/* Click hint */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center justify-center gap-2 mt-4 text-sm text-blue-400"
          >
            <Info className="w-4 h-4 animate-bounce" />
            <span>Click on any state marker to view stations</span>
          </motion.div>
        </motion.div>

        {/* Top States */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
        >
          <h2 className="text-lg font-semibold text-white mb-4">Top States by Stations</h2>
          <div className="space-y-4">
            {topStates.map((state, index) => (
              <motion.div 
                key={state.id}
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 cursor-pointer group"
                onClick={() => handleStateClick(state.name)}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white ${
                  index === 0 ? 'bg-gradient-to-br from-amber-400 to-orange-500' :
                  index === 1 ? 'bg-gradient-to-br from-slate-300 to-slate-400' :
                  index === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-700' :
                  'bg-slate-700'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white font-medium group-hover:text-blue-400 transition-colors">{state.name}</span>
                    <span className="text-slate-400">{state.totalStations}</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(state.totalStations / 612) * 100}%` }}
                      transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                      className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <button
            onClick={() => navigate('/analytics')}
            className="w-full mt-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            View All States
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Battery className="w-5 h-5 text-emerald-400" />
            Recently Added Stations
          </h2>
          <button
            onClick={handleExploreStations}
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            View All →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {recentStations.map((station, index) => (
            <motion.div
              key={station.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-slate-900/50 rounded-xl p-4 border border-slate-700 hover:border-blue-500/50 transition-all cursor-pointer"
              onClick={() => navigate(`/map?station=${station.id}`)}
            >
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  station.type === 'Fast' 
                    ? 'bg-emerald-500/20 text-emerald-400' 
                    : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {station.type}
                </span>
              </div>
              <p className="text-white font-medium text-sm truncate">{station.name}</p>
              <p className="text-slate-500 text-xs">{station.city}, {station.state}</p>
              <p className="text-slate-600 text-xs mt-2">{station.installedDate}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
