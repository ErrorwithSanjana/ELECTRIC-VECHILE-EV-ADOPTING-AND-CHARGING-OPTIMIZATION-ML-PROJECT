import { useState, useMemo } from 'react';
import { chargingStations, mockDriver } from '../data/mockData';
import { ChargingStation } from '../types';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Zap, 
  Search, 
  Filter,
  CheckCircle,
  XCircle,
  Car,
  Battery,
  DollarSign,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const timeSlots = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00', '22:00'
];

export default function BookingsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedStation, setSelectedStation] = useState<ChargingStation | null>(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingDuration, setBookingDuration] = useState(60);
  const [selectedVehicle, setSelectedVehicle] = useState(mockDriver.vehicles[0].id);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  const cities = [...new Set(chargingStations.map(s => s.city))].sort();
  
  const filteredStations = useMemo(() => {
    return chargingStations.filter(station => {
      if (selectedCity && station.city !== selectedCity) return false;
      if (searchQuery) {
        return station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
               station.city.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return station.status === 'Active';
    });
  }, [selectedCity, searchQuery]);

  const handleBook = () => {
    if (selectedStation && bookingDate && bookingTime) {
      const slotKey = `${selectedStation.id}-${bookingDate}-${bookingTime}`;
      setBookedSlots([...bookedSlots, slotKey]);
      alert(`Booking confirmed for ${selectedStation.name} on ${bookingDate} at ${bookingTime}!`);
      setSelectedStation(null);
      setBookingDate('');
      setBookingTime('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-900 p-8 border border-blue-500/20"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative z-10">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <Calendar className="w-8 h-8 text-blue-400" />
            Book Charging Slot
          </h1>
          <p className="text-blue-200 text-lg">
            Reserve your charging slot at your preferred station
          </p>
        </div>
      </motion.div>

      {/* Search & Filter */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stations..."
            className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white"
          />
        </div>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white"
        >
          <option value="">All Cities</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {/* Stations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStations.slice(0, 15).map((station, index) => (
          <motion.div
            key={station.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`bg-slate-800/50 rounded-2xl p-6 border cursor-pointer transition-all hover:border-blue-500 ${
              selectedStation?.id === station.id ? 'border-blue-500 bg-blue-500/10' : 'border-slate-700'
            }`}
            onClick={() => setSelectedStation(station)}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-white font-semibold">{station.name}</h3>
                <p className="text-sm text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {station.city}
                </p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                station.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
              }`}>
                {station.status}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-400">
              <span className="flex items-center gap-1">
                <Zap className="w-4 h-4" />
                {station.type}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                ~{station.waitTime} min
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Booking Modal */}
      {selectedStation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedStation(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-800 rounded-2xl max-w-lg w-full border border-slate-700 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
              <h3 className="text-xl font-bold text-white">{selectedStation.name}</h3>
              <p className="text-blue-100">{selectedStation.city}, {selectedStation.state}</p>
            </div>

            <div className="p-6 space-y-4">
              {/* Date Selection */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">Select Date</label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white"
                />
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">Select Time Slot</label>
                <div className="grid grid-cols-6 gap-2">
                  {timeSlots.map((time) => {
                    const isBooked = bookedSlots.includes(`${selectedStation.id}-${bookingDate}-${time}`);
                    return (
                      <button
                        key={time}
                        disabled={isBooked}
                        onClick={() => setBookingTime(time)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          bookingTime === time
                            ? 'bg-blue-600 text-white'
                            : isBooked
                            ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                            : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">Duration</label>
                <div className="flex gap-2">
                  {[30, 45, 60, 90].map((dur) => (
                    <button
                      key={dur}
                      onClick={() => setBookingDuration(dur)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        bookingDuration === dur
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {dur} min
                    </button>
                  ))}
                </div>
              </div>

              {/* Vehicle Selection */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">Select Vehicle</label>
                <select
                  value={selectedVehicle}
                  onChange={(e) => setSelectedVehicle(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white"
                >
                  {mockDriver.vehicles.map((v) => (
                    <option key={v.id} value={v.id}>{v.make} {v.model} ({v.registrationNumber})</option>
                  ))}
                </select>
              </div>

              {/* Cost Estimate */}
              <div className="p-4 bg-slate-900/50 rounded-xl">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Slot Booking Fee</span>
                  <span className="text-white font-bold">₹{bookingDuration <= 30 ? 50 : bookingDuration <= 60 ? 100 : 150}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setSelectedStation(null)}
                  className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBook}
                  disabled={!bookingDate || !bookingTime}
                  className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Confirm Booking
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
