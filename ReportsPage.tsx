import { useState } from 'react';
import { dashboardStats, indianStates, chargingStations } from '../data/mockData';
import { 
  FileText, 
  Download, 
  Calendar, 
  BarChart3, 
  TrendingUp,
  PieChart,
  Activity,
  Filter
} from 'lucide-react';
import { motion } from 'framer-motion';

const reportTypes = [
  { id: 'monthly', name: 'Monthly Overview', description: 'Comprehensive monthly charging infrastructure report' },
  { id: 'quarterly', name: 'Quarterly Analysis', description: 'Quarterly performance and growth analysis' },
  { id: 'annual', name: 'Annual Report', description: 'Yearly comprehensive government report' },
  { id: 'state', name: 'State-wise Report', description: 'Detailed state-wise infrastructure breakdown' },
  { id: 'revenue', name: 'Revenue Analysis', description: 'Revenue generation and financial metrics' },
  { id: 'adoption', name: 'EV Adoption Report', description: 'Electric vehicle adoption trends across India' },
];

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const quarters = ['Q1 (Jan-Mar)', 'Q2 (Apr-Jun)', 'Q3 (Jul-Sep)', 'Q4 (Oct-Dec)'];

export default function ReportsPage() {
  const [selectedType, setSelectedType] = useState('monthly');
  const [selectedMonth, setSelectedMonth] = useState('March');
  const [selectedQuarter, setSelectedQuarter] = useState('Q4');
  const [selectedYear, setSelectedYear] = useState('2024');

  const generateReport = () => {
    alert(`Generating ${reportTypes.find(r => r.id === selectedType)?.name} for ${selectedMonth} ${selectedYear}...\n\n(This is a demo - in production, this would generate a PDF report)`);
  };

  // Calculate summary stats for the report preview
  const totalRevenue = indianStates.reduce((acc, s) => acc + (s.totalStations * 8500), 0);
  const avgCoverage = Math.round(indianStates.reduce((acc, s) => acc + s.coveragePercent, 0) / indianStates.length);
  const activeStations = chargingStations.filter(s => s.status === 'Active').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Reports Center</h1>
          <p className="text-slate-400">Generate and download EV infrastructure reports</p>
        </div>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportTypes.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedType(report.id)}
            className={`p-6 rounded-2xl border cursor-pointer transition-all ${
              selectedType === report.id 
                ? 'bg-blue-600/20 border-blue-500' 
                : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl ${selectedType === report.id ? 'bg-blue-500' : 'bg-slate-700'}`}>
                <FileText className={`w-6 h-6 ${selectedType === report.id ? 'text-white' : 'text-slate-400'}`} />
              </div>
              <div>
                <h3 className="text-white font-semibold">{report.name}</h3>
                <p className="text-sm text-slate-400 mt-1">{report.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Report Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Filter className="w-5 h-5 text-blue-400" />
          Report Options
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {/* Month */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Month</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {months.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>

          {/* Quarter */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Quarter</label>
            <select
              value={selectedQuarter}
              onChange={(e) => setSelectedQuarter(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {quarters.map(q => (
                <option key={q} value={q}>{q}</option>
              ))}
            </select>
          </div>

          {/* Year */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generateReport}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
        >
          <Download className="w-5 h-5" />
          Generate Report
        </button>
      </motion.div>

      {/* Report Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-emerald-400" />
          Report Data Preview
        </h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-900/50 rounded-xl">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Period</span>
            </div>
            <p className="text-lg font-semibold text-white">{selectedMonth} {selectedYear}</p>
          </div>
          
          <div className="p-4 bg-slate-900/50 rounded-xl">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">Total Stations</span>
            </div>
            <p className="text-lg font-semibold text-white">{dashboardStats.totalStations.toLocaleString()}</p>
          </div>
          
          <div className="p-4 bg-slate-900/50 rounded-xl">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <Activity className="w-4 h-4" />
              <span className="text-sm">Active Stations</span>
            </div>
            <p className="text-lg font-semibold text-emerald-400">{activeStations.toLocaleString()}</p>
          </div>
          
          <div className="p-4 bg-slate-900/50 rounded-xl">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <PieChart className="w-4 h-4" />
              <span className="text-sm">Avg Coverage</span>
            </div>
            <p className="text-lg font-semibold text-blue-400">{avgCoverage}%</p>
          </div>
        </div>

        {/* Additional Preview Info */}
        <div className="mt-4 p-4 bg-slate-900/50 rounded-xl">
          <p className="text-sm text-slate-400 mb-2">Report includes:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <span className="text-slate-300">✓ State-wise distribution</span>
            <span className="text-slate-300">✓ Charging trends</span>
            <span className="text-slate-300">✓ Revenue metrics</span>
            <span className="text-slate-300">✓ Growth analysis</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
