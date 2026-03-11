import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockDriver, mockChargingSessions, mockBookings, tripSuggestions, chargingStations } from '../data/mockData';
import { Vehicle } from '../types';
import { 
  Car, 
  Battery, 
  MapPin, 
  Calendar, 
  Clock,
  Zap,
  TrendingUp,
  Navigation,
  Star,
  Plus,
  ArrowRight,
  History,
  AlertCircle,
  User,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function DriverDashboardPage() {
  const navigate = useNavigate();
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(mockDriver.vehicles[0]);
  
  // Get nearest stations
  const nearestStations = chargingStations
    .filter(s => s.status === 'Active')
    .slice(0, 5);

  const upcomingBookings = mockBookings.filter(b => b.status === 'Confirmed' || b.status === 'Pending');
  const recentSessions = mockChargingSessions.slice(0, 3);

  const batteryPercentage = 65; // Mock current battery

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-slate-900 to-purple-900 p-8 border border-indigo-500/20"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white">Welcome back, {mockDriver.name}!</h1>
              <p className="text-indigo-200">Driver Dashboard</p>
            </div>
          </div>
          
          <button
            onClick={() => navigate('/driver-profile')}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
          >
            Edit Profile
          </button>
        </div>
      </motion.div>

      {/* Vehicle Selector & Battery Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vehicle Selector */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
        >
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Car className="w-5 h-5 text-indigo-400" />
            My Vehicles
          </h3>
          <div className="space-y-3">
            {mockDriver.vehicles.map((vehicle) => (
              <button
                key={vehicle.id}
                onClick={() => setSelectedVehicle(vehicle)}
                className={`w-full p-4 rounded-xl border text-left transition-all ${
                  selectedVehicle.id === vehicle.id
                    ? 'bg-indigo-600/20 border-indigo-500'
                    : 'bg-slate-900/50 border-slate-700 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{vehicle.model.includes('Nexon') ? '🚗' : '🛵'}</span>
                  <div>
                    <p className="text-white font-medium">{vehicle.make} {vehicle.model}</p>
                    <p className="text-sm text-slate-400">{vehicle.registrationNumber}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <button className="w-full mt-4 py-3 border-2 border-dashed border-slate-600 rounded-xl text-slate-400 hover:border-indigo-500 hover:text-indigo-400 transition-colors flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" />
            Add Vehicle
          </button>
        </motion.div>

        {/* Battery Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
        >
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Battery className="w-5 h-5 text-emerald-400" />
            Current Battery
          </h3>
          
          <div className="flex items-center justify-center py-4">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="12"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke={batteryPercentage > 20 ? '#22c55e' : '#ef4444'}
                  strokeWidth="12"
                  strokeDasharray={`${(batteryPercentage / 100) * 352} 352`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white">{batteryPercentage}%</span>
                <span className="text-sm text-slate-400">{selectedVehicle.range * (batteryPercentage/100)} km</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="p-3 bg-slate-900/50 rounded-lg text-center">
              <p className="text-slate-400 text-xs">Range</p>
              <p className="text-white font-bold">{selectedVehicle.range} km</p>
            </div>
            <div className="p-3 bg-slate-900/50 rounded-lg text-center">
              <p className="text-slate-400 text-xs">Capacity</p>
              <p className="text-white font-bold">{selectedVehicle.batteryCapacity} kWh</p>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
        >
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-400" />
            Your Stats
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl">
              <span className="text-slate-400">Total Sessions</span>
              <span className="text-white font-bold">{mockDriver.totalChargingSessions}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl">
              <span className="text-slate-400">Total Distance</span>
              <span className="text-white font-bold">{mockDriver.totalDistance.toLocaleString()} km</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl">
              <span className="text-slate-400">Rating</span>
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <Star className="w-4 h-4 fill-current" />
                {mockDriver.rating}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl">
              <span className="text-slate-400">Member Since</span>
              <span className="text-white font-bold">{mockDriver.memberSince}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Nearest Stations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-400" />
              Nearest Charging Stations
            </h3>
            <button 
              onClick={() => navigate('/nearest')}
              className="text-sm text-indigo-400 hover:text-indigo-300"
            >
              View All →
            </button>
          </div>
          
          <div className="space-y-3">
            {nearestStations.map((station, index) => (
              <motion.div
                key={station.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-slate-900/50 rounded-xl hover:bg-slate-800/50 cursor-pointer transition-colors"
                onClick={() => navigate(`/map?station=${station.id}`)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{station.name}</p>
                    <p className="text-sm text-slate-400">{station.city}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm ${
                      station.congestionLevel === 'Low' ? 'text-emerald-400' :
                      station.congestionLevel === 'Medium' ? 'text-amber-400' : 'text-red-400'
                    }`}>
                      {station.waitTime} min wait
                    </p>
                    <p className="text-xs text-slate-500">{station.type}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Bookings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-400" />
              Upcoming Bookings
            </h3>
            <button 
              onClick={() => navigate('/bookings')}
              className="text-sm text-indigo-400 hover:text-indigo-300"
            >
              View All →
            </button>
          </div>
          
          {upcomingBookings.length > 0 ? (
            <div className="space-y-3">
              {upcomingBookings.map((booking, index) => (
                <div key={booking.id} className="p-4 bg-slate-900/50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-white font-medium">{booking.stationName}</p>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      booking.status === 'Confirmed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {booking.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {booking.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No upcoming bookings</p>
              <button 
                onClick={() => navigate('/bookings')}
                className="mt-2 text-indigo-400 hover:text-indigo-300"
              >
                Book a slot →
              </button>
            </div>
          )}
        </motion.div>
      </div>

      {/* Trip Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <Navigation className="w-5 h-5 text-orange-400" />
            Trip Suggestions
          </h3>
          <button 
            onClick={() => navigate('/route')}
            className="text-sm text-indigo-400 hover:text-indigo-300"
          >
            Plan New Trip →
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tripSuggestions.map((trip, index) => (
            <motion.button
              key={trip.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-slate-900/50 rounded-xl border border-slate-700 hover:border-indigo-500/50 text-left transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-indigo-400" />
                <span className="text-white font-medium">{trip.from}</span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <ArrowRight className="w-4 h-4 text-slate-500" />
                <span className="text-white font-medium">{trip.to}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>{trip.distance} km</span>
                <span>{trip.requiredStops} stops</span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <History className="w-5 h-5 text-purple-400" />
            Recent Charging History
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Station</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Date</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Energy</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Cost</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Duration</th>
              </tr>
            </thead>
            <tbody>
              {recentSessions.map((session) => (
                <tr key={session.id} className="border-b border-slate-700/50 hover:bg-slate-800/50">
                  <td className="py-3 px-4 text-white">{session.stationName}</td>
                  <td className="py-3 px-4 text-slate-300">{session.date}</td>
                  <td className="py-3 px-4 text-slate-300">{session.energyCharged} kWh</td>
                  <td className="py-3 px-4 text-emerald-400">₹{session.cost}</td>
                  <td className="py-3 px-4 text-slate-300">{session.duration} min</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
