import { useState, useMemo } from 'react';
import { chargingStations } from '../data/mockData';
import { ChargingStation } from '../types';
import { 
  Route, 
  MapPin, 
  Navigation, 
  Zap, 
  Battery,
  Clock,
  Car,
  Search,
  Plus,
  Trash2,
  ArrowRight,
  Info
} from 'lucide-react';
import { motion } from 'framer-motion';

const popularRoutes = [
  { from: 'Delhi', to: 'Jaipur', distance: 280, stations: 12 },
  { from: 'Mumbai', to: 'Pune', distance: 150, stations: 8 },
  { from: 'Bangalore', to: 'Chennai', distance: 350, stations: 15 },
  { from: 'Kolkata', to: 'Durgapur', distance: 150, stations: 6 },
  { from: 'Ahmedabad', to: 'Surat', distance: 260, stations: 10 },
];

interface RoutePoint {
  id: string;
  type: 'start' | 'waypoint' | 'end';
  city: string;
  state: string;
}

export default function RoutePlannerPage() {
  const [routePoints, setRoutePoints] = useState<RoutePoint[]>([
    { id: '1', type: 'start', city: 'Delhi', state: 'Delhi' }
  ]);
  const [selectedVehicle, setSelectedVehicle] = useState({ range: 300, consumption: 5 });
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const addWaypoint = () => {
    const newPoint: RoutePoint = {
      id: Date.now().toString(),
      type: 'waypoint',
      city: '',
      state: ''
    };
    setRoutePoints([...routePoints, newPoint]);
  };

  const removeWaypoint = (id: string) => {
    if (routePoints.length > 2) {
      setRoutePoints(routePoints.filter(p => p.id !== id));
    }
  };

  const updateWaypoint = (id: string, city: string, state: string) => {
    setRoutePoints(routePoints.map(p => 
      p.id === id ? { ...p, city, state } : p
    ));
  };

  const findChargingStations = () => {
    // Mock route calculation
    setShowResults(true);
  };

  // Get unique cities for autocomplete
  const cities = useMemo(() => {
    return [...new Set(chargingStations.map(s => s.city))].sort();
  }, []);

  const filteredCities = cities.filter(city => 
    city.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 10);

  const totalDistance = 280; // Mock distance
  const requiredStops = Math.ceil(totalDistance / selectedVehicle.range);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-900 via-slate-900 to-amber-900 p-8 border border-orange-500/20"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative z-10">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <Route className="w-8 h-8 text-orange-400" />
            Route Planner
          </h1>
          <p className="text-orange-200 text-lg">
            Plan your EV journey with charging station stops
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Route Input */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
          >
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Navigation className="w-5 h-5 text-orange-400" />
              Plan Your Route
            </h3>

            <div className="space-y-4">
              {routePoints.map((point, index) => (
                <div key={point.id} className="flex items-center gap-3">
                  {/* Point Icon */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    point.type === 'start' ? 'bg-green-500' :
                    point.type === 'end' ? 'bg-red-500' :
                    'bg-orange-500'
                  }`}>
                    {point.type === 'start' ? (
                      <MapPin className="w-5 h-5 text-white" />
                    ) : point.type === 'end' ? (
                      <MapPin className="w-5 h-5 text-white" />
                    ) : (
                      <span className="text-white font-bold">{index}</span>
                    )}
                  </div>

                  {/* Input */}
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={point.city}
                      onChange={(e) => updateWaypoint(point.id, e.target.value, 'State')}
                      placeholder={point.type === 'start' ? 'Starting point' : point.type === 'end' ? 'Destination' : 'Waypoint'}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  {/* Delete Button */}
                  {routePoints.length > 2 && point.type === 'waypoint' && (
                    <button
                      onClick={() => removeWaypoint(point.id)}
                      className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}

                  {/* Arrow */}
                  {index < routePoints.length - 1 && (
                    <ArrowRight className="w-5 h-5 text-slate-500" />
                  )}
                </div>
              ))}

              {/* Add Waypoint Button */}
              <button
                onClick={addWaypoint}
                className="w-full py-3 border-2 border-dashed border-slate-600 rounded-xl text-slate-400 hover:border-orange-500 hover:text-orange-400 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Stop
              </button>
            </div>

            {/* Vehicle Selection */}
            <div className="mt-6 pt-6 border-t border-slate-700">
              <h4 className="text-white font-medium mb-4">Vehicle Range</h4>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { range: 200, label: '200 km', consumption: 4 },
                  { range: 300, label: '300 km', consumption: 5 },
                  { range: 400, label: '400 km', consumption: 6 },
                  { range: 500, label: '500 km', consumption: 7 },
                ].map((v) => (
                  <button
                    key={v.range}
                    onClick={() => setSelectedVehicle({ range: v.range, consumption: v.consumption })}
                    className={`p-3 rounded-xl border transition-all ${
                      selectedVehicle.range === v.range
                        ? 'bg-orange-600/20 border-orange-500 text-white'
                        : 'bg-slate-900/50 border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <Battery className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-sm font-medium">{v.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={findChargingStations}
              className="w-full mt-6 py-4 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              <Search className="w-5 h-5" />
              Find Charging Stations
            </button>
          </motion.div>

          {/* Results */}
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
            >
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                Recommended Charging Stops
              </h3>

              {/* Route Summary */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-slate-900/50 rounded-xl text-center">
                  <p className="text-slate-400 text-sm">Total Distance</p>
                  <p className="text-2xl font-bold text-white">{totalDistance} km</p>
                </div>
                <div className="p-4 bg-slate-900/50 rounded-xl text-center">
                  <p className="text-slate-400 text-sm">Required Stops</p>
                  <p className="text-2xl font-bold text-orange-400">{requiredStops}</p>
                </div>
                <div className="p-4 bg-slate-900/50 rounded-xl text-center">
                  <p className="text-slate-400 text-sm">Est. Time</p>
                  <p className="text-2xl font-bold text-white">4h 30m</p>
                </div>
              </div>

              {/* Charging Stops */}
              <div className="space-y-4">
                {[
                  { city: 'Rewari', distance: 80, stations: 3, time: '30 min' },
                  { city: 'Jaipur', distance: 160, stations: 5, time: '45 min' },
                  { city: 'Ajmer', distance: 240, stations: 4, time: '30 min' },
                ].map((stop, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{stop.city}</p>
                      <p className="text-sm text-slate-400">{stop.distance} km from start • {stop.stations} stations</p>
                    </div>
                    <div className="text-right">
                      <p className="text-orange-400 font-medium">{stop.time}</p>
                      <p className="text-xs text-slate-500">charging time</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Popular Routes */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
          >
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Car className="w-5 h-5 text-blue-400" />
              Popular Routes
            </h3>
            <div className="space-y-3">
              {popularRoutes.map((route, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setRoutePoints([
                      { id: '1', type: 'start', city: route.from, state: 'State' },
                      { id: '2', type: 'end', city: route.to, state: 'State' }
                    ]);
                    setShowResults(true);
                  }}
                  className="w-full p-3 bg-slate-900/50 rounded-xl hover:bg-slate-700/50 transition-colors text-left"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white font-medium">{route.from}</span>
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                    <span className="text-white font-medium">{route.to}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{route.distance} km</span>
                    <span>{route.stations} stations</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
          >
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-emerald-400" />
              Travel Tips
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-amber-400 mt-0.5" />
                Charge to 80% for optimal battery health
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-blue-400 mt-0.5" />
                Plan stops every 200-300 km
              </li>
              <li className="flex items-start gap-2">
                <Battery className="w-4 h-4 text-emerald-400 mt-0.5" />
                Pre-condition vehicle while charging
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-400 mt-0.5" />
                Check station availability before arrival
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
