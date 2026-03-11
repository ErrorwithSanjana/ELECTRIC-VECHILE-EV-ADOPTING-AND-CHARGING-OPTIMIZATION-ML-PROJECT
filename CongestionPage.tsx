import { useState } from 'react';
import { congestionPredictions, chargingStations } from '../data/mockData';
import { Clock, TrendingUp, AlertTriangle, CheckCircle, MapPin, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CongestionPage() {
  const [selectedStation, setSelectedStation] = useState(congestionPredictions[0]);

  const getCongestionColor = (level: string) => {
    switch (level) {
      case 'Low': return 'text-emerald-400 bg-emerald-500/20';
      case 'Medium': return 'text-amber-400 bg-amber-500/20';
      case 'High': return 'text-red-400 bg-red-500/20';
      default: return 'text-slate-400 bg-slate-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-900 via-red-900 to-pink-900 p-8 border border-orange-500/20"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative z-10">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-orange-400" />
            Real-Time Congestion Prediction
          </h1>
          <p className="text-orange-200 text-lg">
            AI-powered predictions for charging station wait times across India
          </p>
        </div>
      </motion.div>

      {/* Live Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-slate-400">Low Traffic</span>
          </div>
          <p className="text-2xl font-bold text-white">12</p>
          <p className="text-sm text-slate-500">Stations</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-500/20 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-slate-400">Medium Traffic</span>
          </div>
          <p className="text-2xl font-bold text-white">8</p>
          <p className="text-sm text-slate-500">Stations</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <span className="text-slate-400">High Traffic</span>
          </div>
          <p className="text-2xl font-bold text-white">5</p>
          <p className="text-sm text-slate-500">Stations</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Clock className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-slate-400">Avg Wait Time</span>
          </div>
          <p className="text-2xl font-bold text-white">18 min</p>
          <p className="text-sm text-slate-500">Across all stations</p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Station List */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-white font-semibold mb-4">Select Station</h3>
          {congestionPredictions.map((pred) => (
            <motion.button
              key={pred.stationId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setSelectedStation(pred)}
              className={`w-full p-4 rounded-xl text-left transition-all ${
                selectedStation?.stationId === pred.stationId
                  ? 'bg-orange-600/20 border-orange-500'
                  : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
              } border`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">{pred.stationName}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${getCongestionColor(pred.predictions[pred.predictions.length - 1]?.congestionLevel || 'Low')}`}>
                  {pred.predictions[pred.predictions.length - 1]?.congestionLevel || 'Low'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <MapPin className="w-3 h-3" />
                {pred.city}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Prediction Chart */}
        {selectedStation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2 bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
          >
            <h3 className="text-white font-semibold mb-6">{selectedStation.stationName}</h3>
            
            {/* Timeline */}
            <div className="space-y-4">
              {selectedStation.predictions.map((pred, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-16 text-slate-400 text-sm">{pred.time}</div>
                  <div className="flex-1 h-8 bg-slate-900 rounded-lg overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((pred.waitTime / 45) * 100, 100)}%` }}
                      transition={{ delay: idx * 0.1, duration: 0.5 }}
                      className={`h-full ${
                        pred.congestionLevel === 'Low' ? 'bg-emerald-500' :
                        pred.congestionLevel === 'Medium' ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                    />
                  </div>
                  <div className="w-24 text-right">
                    <span className="text-white font-medium">{pred.waitTime} min</span>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs ${getCongestionColor(pred.congestionLevel)}`}>
                    {pred.congestionLevel}
                  </div>
                  <div className="w-16 text-right text-slate-500 text-xs">
                    {pred.confidence}% conf.
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 mt-6 pt-6 border-t border-slate-700">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500 rounded"></div>
                <span className="text-sm text-slate-400">Low (0-15 min)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-500 rounded"></div>
                <span className="text-sm text-slate-400">Medium (15-30 min)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-sm text-slate-400">High (30+ min)</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
