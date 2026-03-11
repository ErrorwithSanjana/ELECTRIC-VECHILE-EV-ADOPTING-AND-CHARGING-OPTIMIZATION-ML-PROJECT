import { useState } from 'react';
import { 
  Calculator, 
  Zap, 
  Battery, 
  Car, 
  IndianRupee, 
  Clock,
  TrendingUp,
  Info,
  RefreshCw,
  Leaf,
  Gauge
} from 'lucide-react';
import { motion } from 'framer-motion';

const vehicleTypes = [
  { id: '2w', name: '2-Wheeler', icon: '🛵', avgConsumption: 1.5, batterySize: 3, avgRange: 80 },
  { id: '3w', name: '3-Wheeler', icon: '�rickshaw', avgConsumption: 2.5, batterySize: 5, avgRange: 100 },
  { id: 'car', name: 'Car (SUV)', icon: '🚗', avgConsumption: 5.5, batterySize: 30, avgRange: 300 },
  { id: 'sedan', name: 'Car (Sedan)', icon: '🚙', avgConsumption: 4.0, batterySize: 25, avgRange: 350 },
  { id: 'bus', name: 'Electric Bus', icon: '🚌', avgConsumption: 15, batterySize: 100, avgRange: 200 },
];

const chargingTypes = [
  { id: 'slow', name: 'Slow Charging (3-7 kW)', rate: 8, time: 480, efficiency: 85 },
  { id: 'fast', name: 'Fast Charging (50 kW)', rate: 15, time: 45, efficiency: 90 },
  { id: 'rapid', name: 'Rapid Charging (150+ kW)', rate: 22, time: 20, efficiency: 92 },
];

const electricityRates = [
  { id: 'residential', name: 'Residential', rate: 6.5, desc: 'Home charging' },
  { id: 'commercial', name: 'Commercial', rate: 8.5, desc: 'Public stations' },
  { id: 'fast', name: 'Fast Charging', rate: 15, desc: 'DC fast chargers' },
];

export default function CalculatorPage() {
  const [vehicleType, setVehicleType] = useState(vehicleTypes[2]); // Car (SUV)
  const [chargingType, setChargingType] = useState(chargingTypes[1]); // Fast
  const [electricityRate, setElectricityRate] = useState(electricityRates[1]); // Commercial
  const [currentCharge, setCurrentCharge] = useState(20);
  const [targetCharge, setTargetCharge] = useState(80);
  const [showAnimation, setShowAnimation] = useState(false);

  // Calculate charging details
  const calculateCost = () => {
    const batteryCapacity = vehicleType.batterySize; // kWh
    const chargeNeeded = (targetCharge - currentCharge) / 100 * batteryCapacity; // kWh
    const energyDelivered = chargeNeeded / (chargingType.efficiency / 100); // kWh (considering losses)
    const chargingTime = (chargeNeeded / parseFloat(<chargingType className="rate split"></chargingType>(' ')[0])) * 60; // minutes
    const costPerUnit = electricityRate.rate;
    const totalCost = energyDelivered * costPerUnit;
    const costPerKm = totalCost / vehicleType.avgRange;
    const co2Saved = (energyDelivered * 0.7); // kg CO2 per kWh saved vs petrol

    return {
      chargeNeeded,
      energyDelivered,
      chargingTime,
      totalCost,
      costPerKm,
      co2Saved
    };
  };

  const result = calculateCost();

  const handleCalculate = () => {
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900 via-slate-900 to-blue-900 p-8 border border-purple-500/20"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative z-10">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <Calculator className="w-8 h-8 text-purple-400" />
            Charging Cost Calculator
          </h1>
          <p className="text-purple-200 text-lg">
            Estimate your EV charging costs and savings
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          {/* Vehicle Type */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Car className="w-5 h-5 text-blue-400" />
              Select Vehicle Type
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {vehicleTypes.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setVehicleType(v)}
                  className={`p-4 rounded-xl border transition-all ${
                    vehicleType.id === v.id
                      ? 'bg-blue-600/20 border-blue-500 text-white'
                      : 'bg-slate-900/50 border-slate-700 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <span className="text-2xl block mb-1">{v.icon}</span>
                  <span className="text-sm font-medium">{v.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Charging Type */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              Charging Type
            </h3>
            <div className="space-y-3">
              {chargingTypes.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setChargingType(c)}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    chargingType.id === c.id
                      ? 'bg-amber-600/20 border-amber-500'
                      : 'bg-slate-900/50 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">{c.name}</span>
                    <span className="text-amber-400">₹{c.rate}/kWh</span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> ~{c.time} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Gauge className="w-4 h-4" /> {c.efficiency}% efficiency
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Electricity Rate */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-emerald-400" />
              Electricity Rate
            </h3>
            <div className="space-y-3">
              {electricityRates.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setElectricityRate(r)}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    electricityRate.id === r.id
                      ? 'bg-emerald-600/20 border-emerald-500'
                      : 'bg-slate-900/50 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">{r.name}</span>
                    <span className="text-emerald-400">₹{r.rate}/unit</span>
                  </div>
                  <p className="text-sm text-slate-400 mt-1">{r.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Charge Range Slider */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Battery className="w-5 h-5 text-blue-400" />
              Charge Level
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-slate-400 mb-2">
                  <span>Current: {currentCharge}%</span>
                  <span>Target: {targetCharge}%</span>
                </div>
                <div className="relative h-8">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={currentCharge}
                    onChange={(e) => setCurrentCharge(parseInt(e.target.value))}
                    className="absolute w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={targetCharge}
                    onChange={(e) => setTargetCharge(parseInt(e.target.value))}
                    className="absolute w-full h-2 bg-transparent rounded-lg appearance-none cursor-pointer"
                    style={{ top: '12px' }}
                  />
                </div>
              </div>
              
              {/* Visual Battery Indicator */}
              <div className="flex items-center justify-center gap-2 py-4">
                <div className="w-32 h-16 bg-slate-700 rounded-lg p-2 relative">
                  <div 
                    className="absolute bottom-2 left-2 right-2 bg-gradient-to-t from-blue-500 to-blue-400 rounded transition-all"
                    style={{ height: `${currentCharge}%` }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-white font-bold">
                    {currentCharge}%
                  </span>
                </div>
                <Zap className="w-6 h-6 text-amber-400" />
                <div className="w-32 h-16 bg-slate-700 rounded-lg p-2 relative">
                  <div 
                    className="absolute bottom-2 left-2 right-2 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded transition-all"
                    style={{ height: `${targetCharge}%` }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-white font-bold">
                    {targetCharge}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Calculate Button */}
          <button
            onClick={handleCalculate}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25"
          >
            <RefreshCw className={`w-5 h-5 ${showAnimation ? 'animate-spin' : ''}`} />
            Calculate Cost
          </button>
        </motion.div>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Main Result */}
          <motion.div 
            key={showAnimation ? 'animating' : 'result'}
            initial={showAnimation ? { scale: 0.9 } : {}}
            animate={{ scale: 1 }}
            className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl p-8 border border-purple-500/30 text-center"
          >
            <h3 className="text-slate-400 text-sm mb-2">Estimated Total Cost</h3>
            <motion.p 
              className="text-5xl font-bold text-white mb-2"
              animate={showAnimation ? { scale: [1, 1.1, 1] } : {}}
            >
              ₹{result.totalCost.toFixed(2)}
            </motion.p>
            <p className="text-slate-400">
              for {result.energyDelivered.toFixed(1)} kWh energy delivery
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Charging Time</span>
              </div>
              <p className="text-2xl font-bold text-white">
                {Math.floor(result.chargingTime / 60)}h {Math.round(result.chargingTime % 60)}m
              </p>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">Cost per km</span>
              </div>
              <p className="text-2xl font-bold text-emerald-400">
                ₹{result.costPerKm.toFixed(2)}
              </p>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <Battery className="w-4 h-4" />
                <span className="text-sm">Energy Delivered</span>
              </div>
              <p className="text-2xl font-bold text-white">
                {result.energyDelivered.toFixed(1)} <span className="text-sm text-slate-400">kWh</span>
              </p>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <Leaf className="w-4 h-4" />
                <span className="text-sm">CO₂ Saved</span>
              </div>
              <p className="text-2xl font-bold text-green-400">
                {result.co2Saved.toFixed(1)} <span className="text-sm text-slate-400">kg</span>
              </p>
            </div>
          </div>

          {/* Comparison with Petrol */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-amber-400" />
              Comparison with Petrol Vehicle
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl">
                <span className="text-slate-300">Petrol Cost for same distance</span>
                <span className="text-white font-bold">₹{(result.totalCost * 3.5).toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                <span className="text-emerald-400 font-medium">Your Savings</span>
                <span className="text-emerald-400 font-bold text-xl">
                  ₹{((result.totalCost * 3.5) - result.totalCost).toFixed(2)} ({Math.round(100 - 28.5)}%)
                </span>
              </div>
            </div>
          </div>

          {/* Vehicle Info */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-white font-semibold mb-4">{vehicleType.name} Specifications</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-slate-900/50 rounded-lg">
                <p className="text-slate-400">Battery Size</p>
                <p className="text-white font-bold">{vehicleType.batterySize} kWh</p>
              </div>
              <div className="p-3 bg-slate-900/50 rounded-lg">
                <p className="text-slate-400">Avg Range</p>
                <p className="text-white font-bold">{vehicleType.avgRange} km</p>
              </div>
              <div className="p-3 bg-slate-900/50 rounded-lg">
                <p className="text-slate-400">Consumption</p>
                <p className="text-white font-bold">{vehicleType.avgConsumption} kWh/100km</p>
              </div>
              <div className="p-3 bg-slate-900/50 rounded-lg">
                <p className="text-slate-400">Efficiency</p>
                <p className="text-white font-bold">{chargingType.efficiency}%</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

