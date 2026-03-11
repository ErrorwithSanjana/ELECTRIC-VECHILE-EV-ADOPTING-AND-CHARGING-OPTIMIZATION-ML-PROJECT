import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { chargingStations } from '../data/mockData';
import { ChargingStation } from '../types';
import { 
  Navigation, 
  MapPin, 
  Search, 
  Zap, 
  Battery,
  DollarSign,
  Clock,
  Car,
  Filter,
  Crosshair,
  Star,
  ArrowRight,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Calculate distance between two coordinates (Haversine formula)
const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

export default function NearestStationPage() {
  const [searchParams] = useSearchParams();
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'fast' | 'slow'>('all');
  const [selectedStation, setSelectedStation] = useState<ChargingStation | null>(null);

  // Get user's current location
  const getUserLocation = () => {
    setLocationLoading(true);
    setLocationError(null);
    
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLocationLoading(false);
      },
      (error) => {
        setLocationError('Unable to get your location. Please enable location services.');
        setLocationLoading(false);
        // Default to Delhi as fallback
        setUserLocation({ lat: 28.6139, lng: 77.2090 });
      }
    );
  };

  // Calculate distances to all stations
  const stationsWithDistance = useMemo(() => {
    if (!userLocation) return [];
    
    return chargingStations
      .map(station => ({
        ...station,
        distance: calculateDistance(
          userLocation.lat,
          userLocation.lng,
          station.coordinates.lat,
          station.coordinates.lng
        )
      }))
      .filter(station => {
        if (filterType === 'fast' && station.type !== 'Fast') return false;
        if (filterType === 'slow' && station.type !== 'Slow') return false;
        if (searchQuery) {
          return station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                 station.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                 station.state.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return true;
      })
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 20);
  }, [userLocation, filterType, searchQuery]);

  // Use effect to get initial location
  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 via-slate-900 to-blue-900 p-8 border border-emerald-500/20"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative z-10">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <Navigation className="w-8 h-8 text-emerald-400" />
            Find Nearest Charging Station
          </h1>
          <p className="text-emerald-200 text-lg">
            Locate the closest EV charging stations to your current location
          </p>
        </div>
      </motion.div>

      {/* Location Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Get Location Button */}
          <button
            onClick={getUserLocation}
            disabled={locationLoading}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-600/50 text-white font-semibold rounded-xl transition-all hover:scale-105"
          >
            {locationLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Getting Location...
              </>
            ) : (
              <>
                <Crosshair className="w-5 h-5" />
                Get My Location
              </>
            )}
          </button>

          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, city, or state..."
              className="w-full pl-10 pr-4 py-4 bg-slate-900 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Filter */}
          <div className="flex gap-2">
            {(['all', 'fast', 'slow'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  filterType === type
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {type === 'all' ? 'All' : type === 'fast' ? '⚡ Fast' : '🔌 Slow'}
              </button>
            ))}
          </div>
        </div>

        {/* Location Status */}
        {userLocation && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 flex items-center gap-2 text-sm text-emerald-400"
          >
            <MapPin className="w-4 h-4" />
            <span>Your location: {userLocation.lat.toFixed(4)}°N, {userLocation.lng.toFixed(4)}°E</span>
          </motion.div>
        )}

        {locationError && (
          <div className="mt-4 flex items-center gap-2 text-sm text-amber-400">
            <Info className="w-4 h-4" />
            <span>{locationError}</span>
          </div>
        )}
      </motion.div>

      {/* Results */}
      {userLocation && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">
              {stationsWithDistance.length} stations found
            </h2>
            <span className="text-slate-400 text-sm">Sorted by distance</span>
          </div>

          {/* Station Cards */}
          <AnimatePresence>
            {stationsWithDistance.map((station, index) => (
              <motion.div
                key={station.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.01 }}
                onClick={() => setSelectedStation(station)}
                className={`bg-slate-800/50 rounded-2xl p-6 border cursor-pointer transition-all hover:border-emerald-500/50 ${
                  selectedStation?.id === station.id ? 'border-emerald-500' : 'border-slate-700'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Distance Badge */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-600 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-white">{station.distance.toFixed(1)}</span>
                      <span className="text-xs text-emerald-100">km</span>
                    </div>
                  </div>

                  {/* Station Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-white font-semibold text-lg">{station.name}</h3>
                        <p className="text-slate-400 flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {station.city}, {station.state}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          station.type === 'Fast' 
                            ? 'bg-emerald-500/20 text-emerald-400' 
                            : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          <Zap className="w-4 h-4 inline mr-1" />
                          {station.type}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          station.status === 'Active' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {station.status}
                        </span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{station.dailyUsage} sessions/day</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <DollarSign className="w-4 h-4" />
                        <span className="text-sm">₹{station.revenue}/day</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <Battery className="w-4 h-4" />
                        <span className="text-sm">{station.ports.join(', ')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <Star className="w-4 h-4 text-amber-400" />
                        <span className="text-sm">{station.operator}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex-shrink-0">
                    <button className="p-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-white transition-colors">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {stationsWithDistance.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              <Navigation className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No stations found</p>
              <p className="text-sm">Try adjusting your filters</p>
            </div>
          )}
        </div>
      )}

      {/* Quick Location Buttons for Demo */}
      {!userLocation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
        >
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-400" />
            Quick Location Select (Demo)
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { name: 'Delhi', lat: 28.6139, lng: 77.2090 },
              { name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
              { name: 'Bangalore', lat: 12.9716, lng: 77.5946 },
              { name: 'Chennai', lat: 13.0827, lng: 80.2707 },
              { name: 'Kolkata', lat: 22.5726, lng: 88.3639 },
              { name: 'Hyderabad', lat: 17.3850, lng: 78.4867 },
              { name: 'Pune', lat: 18.5204, lng: 73.8567 },
              { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714 },
            ].map((city) => (
              <button
                key={city.name}
                onClick={() => setUserLocation({ lat: city.lat, lng: city.lng })}
                className="p-3 bg-slate-700 hover:bg-slate-600 rounded-xl text-white text-sm font-medium transition-colors"
              >
                📍 {city.name}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
