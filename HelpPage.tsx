import { useState } from 'react';
import { 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  Book, 
  Video,
  ChevronDown,
  Search,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'How do I find the nearest charging station?',
    answer: 'Use the "Find Nearest" feature in the navigation to locate charging stations near your current location. You can also use the interactive map to explore stations across India.'
  },
  {
    question: 'What types of charging stations are available?',
    answer: 'There are three main types: Slow chargers (3-7 kW) - best for overnight charging, Fast chargers (50 kW) - 80% charge in 30-45 minutes, and Rapid chargers (150+ kW) - 80% charge in 15-20 minutes.'
  },
  {
    question: 'How do I calculate charging costs?',
    answer: 'Use our Cost Calculator tool to estimate charging costs based on your vehicle type, battery size, and charging station rates. The calculator also shows your savings compared to petrol vehicles.'
  },
  {
    question: 'Can I plan a long-distance trip with multiple charging stops?',
    answer: 'Yes! Use the Route Planner feature to input your start and destination points. The system will calculate the optimal charging stops along your route based on your vehicle range.'
  },
  {
    question: 'How accurate is the station availability data?',
    answer: 'Our data is updated in real-time from station operators. However, we recommend checking the station status before heading there, as availability can change quickly.'
  },
  {
    question: 'What payment methods are accepted at charging stations?',
    answer: 'Most stations accept UPI, credit/debit cards, and mobile wallets. Some government-run stations also accept e-RUPI vouchers. Fast charging stations typically require prepaid accounts.'
  },
];

const guides = [
  { title: 'Getting Started with EV Charging', icon: '📖', desc: 'Learn the basics of EV charging' },
  { title: 'Understanding Charging Types', icon: '⚡', desc: 'Slow, Fast, and Rapid charging explained' },
  { title: 'Charging Station Etiquette', icon: '🤝', desc: 'Best practices at charging stations' },
  { title: 'Battery Care Tips', icon: '🔋', desc: 'Maximize your EV battery life' },
  { title: 'Troubleshooting Common Issues', icon: '🔧', desc: 'Solutions for common charging problems' },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-900 via-slate-900 to-blue-900 p-8 border border-cyan-500/20"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative z-10">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <HelpCircle className="w-8 h-8 text-cyan-400" />
            Help & Support
          </h1>
          <p className="text-cyan-200 text-lg">
            Get assistance and learn about EV charging in India
          </p>
        </div>
      </motion.div>

      {/* Quick Contact */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: MessageCircle, label: 'Live Chat', sublabel: 'Available 24/7', color: 'from-green-500 to-green-600' },
          { icon: Phone, label: 'Helpline', sublabel: '1800-XXX-XXXX', color: 'from-blue-500 to-blue-600' },
          { icon: Mail, label: 'Email Support', sublabel: 'support@evcharge.gov.in', color: 'from-purple-500 to-purple-600' },
        ].map((item, index) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all text-left group"
          >
            <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} w-fit mb-3`}>
              <item.icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-white font-semibold">{item.label}</p>
            <p className="text-sm text-slate-400">{item.sublabel}</p>
          </motion.button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search help articles..."
          className="w-full pl-12 pr-4 py-4 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FAQs */}
        <div className="lg:col-span-2 space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
          >
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Book className="w-5 h-5 text-cyan-400" />
              Frequently Asked Questions
            </h3>
            
            <div className="space-y-3">
              {filteredFaqs.map((faq, index) => (
                <div 
                  key={index}
                  className="bg-slate-900/50 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between"
                  >
                    <span className="text-white font-medium pr-4">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="px-4 pb-4 text-slate-400">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Guides */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
          >
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Video className="w-5 h-5 text-purple-400" />
              Quick Guides
            </h3>
            
            <div className="space-y-3">
              {guides.map((guide, index) => (
                <button
                  key={index}
                  className="w-full p-4 bg-slate-900/50 rounded-xl hover:bg-slate-800/50 transition-colors text-left flex items-center gap-3"
                >
                  <span className="text-2xl">{guide.icon}</span>
                  <div className="flex-1">
                    <p className="text-white font-medium">{guide.title}</p>
                    <p className="text-sm text-slate-400">{guide.desc}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Emergency */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-red-500/10 rounded-2xl p-6 border border-red-500/20"
          >
            <h3 className="text-white font-semibold mb-2">Emergency Contacts</h3>
            <p className="text-slate-400 text-sm mb-4">
              For urgent assistance related to charging stations or EV emergencies
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-white">🚨 Police: 100</p>
              <p className="text-white">🚒 Fire: 101</p>
              <p className="text-white">🚑 Ambulance: 102</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
