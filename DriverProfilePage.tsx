import { useState } from 'react';
import { mockDriver, evModels } from '../data/mockData';
import { Vehicle } from '../types';
import { 
  User, 
  Car, 
  Battery, 
  Plus, 
  Trash2, 
  Save,
  Mail,
  Phone,
  Calendar,
  Star,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function DriverProfilePage() {
  const [driver, setDriver] = useState(mockDriver);
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockDriver.vehicles);
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [newVehicle, setNewVehicle] = useState<Partial<Vehicle>>({
    make: '',
    model: '',
    year: 2024,
    batteryCapacity: 0,
    range: 0,
    chargingType: 'Both',
    registrationNumber: '',
    color: ''
  });

  const addVehicle = () => {
    if (newVehicle.make && newVehicle.model && newVehicle.registrationNumber) {
      const vehicle: Vehicle = {
        id: `VEH-${Date.now()}`,
        make: newVehicle.make,
        model: newVehicle.model,
        year: newVehicle.year || 2024,
        batteryCapacity: newVehicle.batteryCapacity || 0,
        range: newVehicle.range || 0,
        chargingType: newVehicle.chargingType || 'Both',
        registrationNumber: newVehicle.registrationNumber || '',
        color: newVehicle.color || ''
      };
      setVehicles([...vehicles, vehicle]);
      setShowAddVehicle(false);
      setNewVehicle({
        make: '',
        model: '',
        year: 2024,
        batteryCapacity: 0,
        range: 0,
        chargingType: 'Both',
        registrationNumber: '',
        color: ''
      });
    }
  };

  const removeVehicle = (id: string) => {
    setVehicles(vehicles.filter(v => v.id !== id));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-slate-900 to-purple-900 p-8 border border-indigo-500/20"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative z-10 flex items-center gap-6">
          <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white">{driver.name}</h1>
            <p className="text-indigo-200">Driver Profile</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="flex items-center gap-1 text-amber-400">
                <Star className="w-4 h-4 fill-current" />
                {driver.rating} Rating
              </span>
              <span className="text-slate-400">Member since {driver.memberSince}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Personal Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
      >
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-indigo-400" />
          Personal Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Full Name</label>
            <input
              type="text"
              defaultValue={driver.name}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="email"
                defaultValue={driver.email}
                className="w-full pl-10 px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Phone</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="tel"
                defaultValue={driver.phone}
                className="w-full pl-10 px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Member Since</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                defaultValue={driver.memberSince}
                disabled
                className="w-full pl-10 px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-slate-500"
              />
            </div>
          </div>
        </div>

        <button className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </motion.div>

      {/* Vehicles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <Car className="w-5 h-5 text-emerald-400" />
            My Vehicles
          </h3>
          <button
            onClick={() => setShowAddVehicle(!showAddVehicle)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Vehicle
          </button>
        </div>

        {/* Add Vehicle Form */}
        {showAddVehicle && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="mb-6 p-4 bg-slate-900/50 rounded-xl border border-slate-600"
          >
            <h4 className="text-white font-medium mb-4">Add New Vehicle</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                value={newVehicle.make}
                onChange={(e) => setNewVehicle({ ...newVehicle, make: e.target.value })}
                className="px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white"
              >
                <option value="">Select Make</option>
                {[...new Set(evModels.map(m => m.make))].map(make => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Model"
                value={newVehicle.model}
                onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                className="px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white"
              />
              <input
                type="text"
                placeholder="Registration Number"
                value={newVehicle.registrationNumber}
                onChange={(e) => setNewVehicle({ ...newVehicle, registrationNumber: e.target.value })}
                className="px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white"
              />
              <input
                type="number"
                placeholder="Battery (kWh)"
                value={newVehicle.batteryCapacity || ''}
                onChange={(e) => setNewVehicle({ ...newVehicle, batteryCapacity: parseFloat(e.target.value) })}
                className="px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white"
              />
              <input
                type="number"
                placeholder="Range (km)"
                value={newVehicle.range || ''}
                onChange={(e) => setNewVehicle({ ...newVehicle, range: parseInt(e.target.value) })}
                className="px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white"
              />
              <select
                value={newVehicle.chargingType}
                onChange={(e) => setNewVehicle({ ...newVehicle, chargingType: e.target.value as 'Fast' | 'Slow' | 'Both' })}
                className="px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white"
              >
                <option value="Both">Both</option>
                <option value="Fast">Fast</option>
                <option value="Slow">Slow</option>
              </select>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={addVehicle}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg"
              >
                Add Vehicle
              </button>
              <button
                onClick={() => setShowAddVehicle(false)}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        {/* Vehicle List */}
        <div className="space-y-4">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="p-4 bg-slate-900/50 rounded-xl border border-slate-700">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl">
                    {vehicle.make === 'Tata' ? '🚗' : vehicle.make === 'Ather' ? '🛵' : '🚙'}
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{vehicle.make} {vehicle.model}</h4>
                    <p className="text-sm text-slate-400">{vehicle.registrationNumber}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <Battery className="w-4 h-4" />
                        {vehicle.batteryCapacity} kWh
                      </span>
                      <span className="flex items-center gap-1">
                        <Zap className="w-4 h-4" />
                        {vehicle.range} km
                      </span>
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded">
                        {vehicle.chargingType}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeVehicle(vehicle.id)}
                  className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
