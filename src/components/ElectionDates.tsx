import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  MapPin, 
  ChevronLeft, 
  Calendar, 
  Info, 
  CheckCircle2, 
  Clock, 
  RotateCcw,
  Building2,
  Users
} from "lucide-react";

// Types
type ElectionStatus = "CONFIRMED" | "CONFIRMED_YEAR" | "RECENT";

interface ScheduleItem {
  event: string;
  date: string;
}

interface StateElection {
  state: string;
  code: string;
  status: ElectionStatus;
  source?: string;
  seats: number;
  phases?: number;
  schedule?: ScheduleItem[];
  year?: number;
  termExpiry?: string;
  note: string;
  nextYear?: number;
}

// Data
const LOK_SABHA_DATA = {
  type: "LS",
  status: "CONFIRMED_YEAR",
  label: "Lok Sabha General Election",
  year: 2029,
  note: "The 18th Lok Sabha completes its 5-year term in 2029. The ECI has not yet announced dates. Historically held in April–May.",
  tentative: true
};

const STATE_ELECTIONS: StateElection[] = [
  {
    state: "West Bengal",
    code: "WB",
    status: "CONFIRMED" as ElectionStatus,
    source: "ECI announcement March 15, 2026",
    seats: 294,
    phases: 2,
    note: "West Bengal Assembly Election 2026",
    schedule: [
      { event: "MCC in effect from", date: "March 15, 2026" },
      { event: "Phase 1 Notification", date: "March 20, 2026" },
      { event: "Phase 1 Nomination deadline", date: "April 6, 2026" },
      { event: "Phase 1 Scrutiny", date: "April 7, 2026" },
      { event: "Phase 1 Withdrawal deadline", date: "April 9, 2026" },
      { event: "Phase 1 Polling (152 constituencies)", date: "April 23, 2026" },
      { event: "Phase 2 Notification", date: "April 2, 2026" },
      { event: "Phase 2 Nomination deadline", date: "April 9, 2026" },
      { event: "Phase 2 Scrutiny", date: "April 10, 2026" },
      { event: "Phase 2 Withdrawal deadline", date: "April 13, 2026" },
      { event: "Phase 2 Polling (142 constituencies)", date: "April 29, 2026" },
      { event: "Counting of votes", date: "May 4, 2026" },
      { event: "Process concludes by", date: "May 6, 2026" }
    ]
  },
  {
    state: "Tamil Nadu",
    code: "TN",
    status: "CONFIRMED" as ElectionStatus,
    source: "ECI announcement March 15, 2026",
    seats: 234,
    phases: 1,
    note: "Tamil Nadu Assembly Election 2026",
    schedule: [
      { event: "MCC in effect from", date: "March 15, 2026" },
      { event: "Nomination deadline", date: "April 6, 2026" },
      { event: "Scrutiny", date: "April 7, 2026" },
      { event: "Withdrawal deadline", date: "April 9, 2026" },
      { event: "Polling (all 234 seats)", date: "April 23, 2026" },
      { event: "Counting of votes", date: "May 4, 2026" }
    ]
  },
  {
    state: "Kerala",
    code: "KL",
    status: "CONFIRMED" as ElectionStatus,
    source: "ECI announcement March 15, 2026",
    seats: 140,
    phases: 1,
    note: "Kerala Assembly Election 2026",
    schedule: [
      { event: "MCC in effect from", date: "March 15, 2026" },
      { event: "Gazette notification", date: "March 16, 2026" },
      { event: "Nomination deadline", date: "March 23, 2026" },
      { event: "Scrutiny", date: "March 24, 2026" },
      { event: "Withdrawal deadline", date: "March 26, 2026" },
      { event: "Polling (all 140 seats)", date: "April 9, 2026" },
      { event: "Counting of votes", date: "May 4, 2026" }
    ]
  },
  {
    state: "Assam",
    code: "AS",
    status: "CONFIRMED" as ElectionStatus,
    source: "ECI announcement March 15, 2026",
    seats: 126,
    phases: 1,
    note: "Assam Assembly Election 2026",
    schedule: [
      { event: "MCC in effect from", date: "March 15, 2026" },
      { event: "Gazette notification", date: "March 16, 2026" },
      { event: "Nomination deadline", date: "March 23, 2026" },
      { event: "Scrutiny", date: "March 24, 2026" },
      { event: "Withdrawal deadline", date: "March 26, 2026" },
      { event: "Polling (all 126 seats)", date: "April 9, 2026" },
      { event: "Counting of votes", date: "May 4, 2026" }
    ]
  },
  {
    state: "Puducherry",
    code: "PY",
    status: "CONFIRMED" as ElectionStatus,
    source: "ECI announcement March 15, 2026",
    seats: 33,
    phases: 1,
    note: "Puducherry Assembly Election 2026",
    schedule: [
      { event: "MCC in effect from", date: "March 15, 2026" },
      { event: "Gazette notification", date: "March 16, 2026" },
      { event: "Nomination deadline", date: "March 23, 2026" },
      { event: "Scrutiny", date: "March 24, 2026" },
      { event: "Withdrawal deadline", date: "March 26, 2026" },
      { event: "Polling (all 33 seats)", date: "April 9, 2026" },
      { event: "Counting of votes", date: "May 4, 2026" }
    ]
  },
  {
    state: "Punjab",
    code: "PB",
    status: "CONFIRMED_YEAR" as ElectionStatus,
    year: 2027,
    termExpiry: "March 2027",
    note: "Current assembly term expires March 2027. ECI typically announces 4–6 weeks before polling. Expected: Feb–March 2027.",
    seats: 117,
    phases: 1
  },
  {
    state: "Goa",
    code: "GA",
    status: "CONFIRMED_YEAR" as ElectionStatus,
    year: 2027,
    termExpiry: "March 2027",
    note: "Current assembly term expires March 2027. Expected: Feb–March 2027.",
    seats: 40,
    phases: 1
  },
  {
    state: "Manipur",
    code: "MN",
    status: "CONFIRMED_YEAR" as ElectionStatus,
    year: 2027,
    termExpiry: "March 2027",
    note: "Current assembly term expires March 2027. Expected: Feb–March 2027.",
    seats: 60,
    phases: 2
  },
  {
    state: "Uttarakhand",
    code: "UK",
    status: "CONFIRMED_YEAR" as ElectionStatus,
    year: 2027,
    termExpiry: "March 2027",
    note: "Current assembly term expires March 2027. Expected: Feb–March 2027.",
    seats: 70,
    phases: 1
  },
  {
    state: "Himachal Pradesh",
    code: "HP",
    status: "CONFIRMED_YEAR" as ElectionStatus,
    year: 2027,
    termExpiry: "January 2028",
    note: "Current assembly term expires January 2028. Election typically held Nov–Dec 2027.",
    seats: 68,
    phases: 1
  },
  {
    state: "Gujarat",
    code: "GJ",
    status: "CONFIRMED_YEAR" as ElectionStatus,
    year: 2027,
    termExpiry: "February 2028",
    note: "Current assembly term expires February 2028. Election typically held Nov–Dec 2027.",
    seats: 182,
    phases: 2
  },
  {
    state: "Nagaland",
    code: "NL",
    status: "CONFIRMED_YEAR" as ElectionStatus,
    year: 2028,
    termExpiry: "March 2028",
    note: "Current assembly term expires March 2028. Expected: Feb–March 2028.",
    seats: 60,
    phases: 1
  },
  {
    state: "Meghalaya",
    code: "ML",
    status: "CONFIRMED_YEAR" as ElectionStatus,
    year: 2028,
    termExpiry: "March 2028",
    note: "Current assembly term expires March 2028. Expected: Feb–March 2028.",
    seats: 60,
    phases: 1
  },
  {
    state: "Tripura",
    code: "TR",
    status: "CONFIRMED_YEAR" as ElectionStatus,
    year: 2028,
    termExpiry: "March 2028",
    note: "Current assembly term expires March 2028. Expected: Feb–March 2028.",
    seats: 60,
    phases: 1
  },
  {
    state: "Karnataka",
    code: "KA",
    status: "CONFIRMED_YEAR" as ElectionStatus,
    year: 2028,
    termExpiry: "May 2028",
    note: "Current assembly term expires May 2028. Expected: April–May 2028.",
    seats: 224,
    phases: 1
  },
  {
    state: "Madhya Pradesh",
    code: "MP",
    status: "CONFIRMED_YEAR" as ElectionStatus,
    year: 2028,
    termExpiry: "December 2028",
    note: "Current assembly term expires December 2028. Expected: Nov–Dec 2028.",
    seats: 230,
    phases: 1
  },
  {
    state: "Chhattisgarh",
    code: "CG",
    status: "CONFIRMED_YEAR" as ElectionStatus,
    year: 2028,
    termExpiry: "December 2028",
    note: "Current assembly term expires December 2028. Expected: Nov–Dec 2028.",
    seats: 90,
    phases: 2
  },
  {
    state: "Mizoram",
    code: "MZ",
    status: "CONFIRMED_YEAR" as ElectionStatus,
    year: 2028,
    termExpiry: "December 2028",
    note: "Current assembly term expires December 2028. Expected: Nov–Dec 2028.",
    seats: 40,
    phases: 1
  },
  {
    state: "Rajasthan",
    code: "RJ",
    status: "CONFIRMED_YEAR" as ElectionStatus,
    year: 2028,
    termExpiry: "January 2029",
    note: "Current assembly term expires January 2029. Expected: Nov–Dec 2028.",
    seats: 200,
    phases: 1
  },
  {
    state: "Telangana",
    code: "TS",
    status: "CONFIRMED_YEAR" as ElectionStatus,
    year: 2028,
    termExpiry: "January 2029",
    note: "Current assembly term expires January 2029. Expected: Nov–Dec 2028.",
    seats: 119,
    phases: 1
  },
  {
    state: "Bihar",
    code: "BR",
    status: "CONFIRMED_YEAR" as ElectionStatus,
    year: 2025,
    termExpiry: "November 2025",
    note: "Bihar election was due in Oct–Nov 2025. Verify current status — election may have already been held.",
    seats: 243,
    phases: 3
  },
  {
    state: "Delhi",
    code: "DL",
    status: "RECENT" as ElectionStatus,
    note: "Delhi assembly election was held in February 2025. The next election is due in 2030.",
    nextYear: 2030,
    seats: 70
  },
  {
    state: "Haryana",
    code: "HR",
    status: "CONFIRMED_YEAR" as ElectionStatus,
    year: 2029,
    termExpiry: "November 2029",
    note: "Haryana election was held in October 2024. Next election due: Oct–Nov 2029.",
    seats: 90
  },
  {
    state: "Maharashtra",
    code: "MH",
    status: "CONFIRMED_YEAR" as ElectionStatus,
    year: 2029,
    termExpiry: "November 2029",
    note: "Maharashtra election was held in November 2024. Next election due: Oct–Nov 2029.",
    seats: 288
  },
  {
    state: "Jharkhand",
    code: "JH",
    status: "CONFIRMED_YEAR" as ElectionStatus,
    year: 2029,
    termExpiry: "January 2030",
    note: "Jharkhand election was held in November 2024. Next election due: Nov–Dec 2029.",
    seats: 81
  },
  {
    state: "Uttar Pradesh",
    code: "UP",
    status: "CONFIRMED_YEAR" as ElectionStatus,
    year: 2027,
    termExpiry: "May 2027",
    note: "Current UP assembly term expires May 2027. Election expected: Feb–March 2027. Largest state — 403 seats, typically 7 phases.",
    seats: 403,
    phases: 7
  },
  {
    state: "Andhra Pradesh",
    code: "AP",
    status: "CONFIRMED_YEAR" as ElectionStatus,
    year: 2029,
    termExpiry: "June 2029",
    note: "Andhra Pradesh election was held in May 2024 simultaneously with Lok Sabha. Next election due: May 2029.",
    seats: 175
  },
  {
    state: "Odisha",
    code: "OD",
    status: "CONFIRMED_YEAR" as ElectionStatus,
    year: 2029,
    termExpiry: "June 2029",
    note: "Odisha election was held in May–June 2024 simultaneously with Lok Sabha. Next election due: May 2029.",
    seats: 147
  },
  {
    state: "Sikkim",
    code: "SK",
    status: "CONFIRMED_YEAR" as ElectionStatus,
    year: 2029,
    termExpiry: "June 2029",
    note: "Sikkim election was held in April 2024. Next election due: 2029.",
    seats: 32
  },
  {
    state: "Arunachal Pradesh",
    code: "AR",
    status: "CONFIRMED_YEAR" as ElectionStatus,
    year: 2029,
    termExpiry: "June 2029",
    note: "Arunachal Pradesh election was held in April 2024. Next election due: 2029.",
    seats: 60
  }
].sort((a, b) => a.state.localeCompare(b.state));

export default function ElectionDates() {
  const [view, setView] = useState<"picker" | "ls" | "vs">("picker");
  const [selectedState, setSelectedState] = useState<StateElection | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStates = useMemo(() => {
    return STATE_ELECTIONS.filter(s => 
      s.state.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const StatusPill = ({ status }: { status: ElectionStatus }) => {
    switch (status) {
      case "CONFIRMED":
        return (
          <div className="flex items-center gap-2 px-3 py-1 bg-india-green/10 border border-india-green/30 rounded-full text-[10px] font-black text-india-green tracking-wider uppercase">
            <CheckCircle2 className="w-3 h-3" /> Official ECI Schedule
          </div>
        );
      case "CONFIRMED_YEAR":
        return (
          <div className="flex items-center gap-2 px-3 py-1 bg-[#f4a261]/10 border border-[#f4a261]/30 rounded-full text-[10px] font-black text-[#f4a261] tracking-wider uppercase">
            <Clock className="w-3 h-3" /> Tentative — Not yet announced
          </div>
        );
      case "RECENT":
        return (
          <div className="flex items-center gap-2 px-3 py-1 bg-[#4cc9f0]/10 border border-[#4cc9f0]/30 rounded-full text-[10px] font-black text-[#4cc9f0] tracking-wider uppercase">
            <RotateCcw className="w-3 h-3" /> Recently held
          </div>
        );
    }
  };

  return (
    <div className="space-y-8 min-h-[500px]">
      <AnimatePresence mode="wait">
        {view === "picker" && (
          <motion.div 
            key="picker"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <button 
              onClick={() => setView("ls")}
              className="group relative h-64 bg-surface border border-white/10 rounded-[32px] p-8 text-left hover:bg-white/5 hover:border-india-blue/30 transition-all flex flex-col justify-end"
            >
              <div className="absolute top-8 left-8 w-14 h-14 rounded-2xl bg-india-blue/10 flex items-center justify-center text-india-blue group-hover:scale-110 transition-transform">
                <Building2 className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-black tracking-[0.2em] uppercase text-muted">National Election</span>
                <h3 className="text-3xl font-serif font-black text-white">🏛️ Lok Sabha</h3>
                <p className="text-sm text-muted font-light">General Election for the Parliament of India</p>
              </div>
            </button>

            <button 
              onClick={() => setView("vs")}
              className="group relative h-64 bg-surface border border-white/10 rounded-[32px] p-8 text-left hover:bg-white/5 hover:border-india-green/30 transition-all flex flex-col justify-end"
            >
              <div className="absolute top-8 left-8 w-14 h-14 rounded-2xl bg-india-green/10 flex items-center justify-center text-india-green group-hover:scale-110 transition-transform">
                <MapPin className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-black tracking-[0.2em] uppercase text-muted">Regional Election</span>
                <h3 className="text-3xl font-serif font-black text-white">🗳️ Vidhan Sabha</h3>
                <p className="text-sm text-muted font-light">State Assembly Elections across India</p>
              </div>
            </button>
          </motion.div>
        )}

        {view === "ls" && (
          <motion.div 
            key="ls"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <button onClick={() => setView("picker")} className="flex items-center gap-2 text-xs font-black tracking-widest text-muted hover:text-white transition-colors">
              <ChevronLeft className="w-4 h-4" /> BACK TO CHOICE
            </button>

            <div className="bg-surface rounded-3xl border border-white/10 p-8 md:p-12 space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-india-blue/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="space-y-4 relative">
                <StatusPill status={LOK_SABHA_DATA.status as any} />
                <h2 className="text-4xl md:text-5xl font-serif font-black text-white">{LOK_SABHA_DATA.label} {LOK_SABHA_DATA.year}</h2>
              </div>

              <div className="space-y-6 text-lg leading-relaxed text-muted max-w-2xl">
                <p>{LOK_SABHA_DATA.note}</p>
                <div className="p-6 bg-surface2/50 rounded-2xl border border-white/5 flex items-start gap-4">
                  <Info className="w-6 h-6 text-india-gold shrink-0 mt-1" />
                  <p className="text-sm italic font-light">
                    The Election Commission of India (ECI) traditionally announces the schedule 5-6 weeks before the first polling phase. Dates will be finalized through a formal press conference.
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-white/5 flex items-center gap-2 text-[10px] font-mono text-muted uppercase tracking-[0.2em]">
                Source: Constitution of India Assembly Mandate
              </div>
            </div>
          </motion.div>
        )}

        {view === "vs" && !selectedState && (
          <motion.div 
            key="vs-list"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <button onClick={() => setView("picker")} className="flex items-center gap-2 text-xs font-black tracking-widest text-muted hover:text-white transition-colors">
                <ChevronLeft className="w-4 h-4" /> BACK TO CHOICE
              </button>
              
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input 
                  type="text"
                  placeholder="Search State..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-surface border border-white/10 rounded-2xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-india-green/50 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredStates.map(s => (
                <button
                  key={s.code}
                  onClick={() => setSelectedState(s)}
                  className="p-6 bg-surface border border-white/10 rounded-2xl text-left hover:bg-white/5 hover:border-white/20 transition-all group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-muted tracking-widest">{s.code}</span>
                    <MapPin className="w-4 h-4 text-muted group-hover:text-india-green transition-colors" />
                  </div>
                  <h4 className="text-xl font-serif font-black text-white">{s.state}</h4>
                  <div className="mt-4 text-[10px] uppercase font-bold tracking-widest flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${s.status === 'CONFIRMED' ? 'bg-india-green' : s.status === 'CONFIRMED_YEAR' ? 'bg-india-gold' : 'bg-india-blue'}`} />
                    <span className={s.status === 'CONFIRMED' ? 'text-india-green' : s.status === 'CONFIRMED_YEAR' ? 'text-india-gold' : 'text-india-blue'}>
                      {s.status === 'CONFIRMED' ? 'Official' : s.status === 'CONFIRMED_YEAR' ? 'Tentative' : 'Recent'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {selectedState && (
          <motion.div 
            key="vs-details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <button onClick={() => setSelectedState(null)} className="flex items-center gap-2 text-xs font-black tracking-widest text-muted hover:text-white transition-colors">
              <ChevronLeft className="w-4 h-4" /> BACK TO STATE LIST
            </button>

            <div className="bg-surface rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="p-8 md:p-12 border-b border-white/5 bg-surface/50">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="space-y-4">
                    <StatusPill status={selectedState.status} />
                    <h2 className="text-4xl md:text-5xl font-serif font-black text-white">{selectedState.state}</h2>
                    <div className="flex flex-wrap gap-6 text-sm text-muted font-light">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-india-blue" />
                        <span>{selectedState.seats} Assembly Seats</span>
                      </div>
                      {selectedState.phases && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-india-blue" />
                          <span>{selectedState.phases} Voting Phases</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {selectedState.source && (
                    <div className="text-[10px] font-mono text-muted uppercase tracking-[0.2em] md:text-right">
                      Source: {selectedState.source}
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-12">
                {selectedState.status === "CONFIRMED" && selectedState.schedule ? (
                  <div className="space-y-8">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="text-[10px] font-mono text-muted uppercase tracking-[0.3em] border-b border-white/10">
                            <th className="pb-4 font-black">Electoral Event</th>
                            <th className="pb-4 font-black">Official Date</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm">
                          {selectedState.schedule.map((item, idx) => {
                            const isPolling = item.event.toLowerCase().includes('polling');
                            const isCounting = item.event.toLowerCase().includes('counting');
                            
                            return (
                              <tr 
                                key={idx} 
                                className={`
                                  border-b border-white/5 last:border-0 group
                                  ${isPolling ? 'bg-accent/5' : ''}
                                  ${isCounting ? 'bg-india-green/5' : ''}
                                  hover:bg-white/[0.02] transition-colors
                                `}
                              >
                                <td className={`py-4 pr-4 ${isPolling ? 'font-bold text-accent' : isCounting ? 'font-bold text-india-green' : 'text-text'}`}>
                                  {item.event}
                                </td>
                                <td className={`py-4 font-mono ${isPolling ? 'text-accent' : isCounting ? 'text-india-green' : 'text-muted'}`}>
                                  {item.date}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <div className="p-5 bg-india-green/5 border border-india-green/10 rounded-2xl flex items-start gap-4">
                      <CheckCircle2 className="w-5 h-5 text-india-green shrink-0 mt-0.5" />
                      <p className="text-xs text-muted leading-relaxed italic">
                        These are officially confirmed dates announced by the Election Commission of India. These dates are binding and the Model Code of Conduct is currently in effect.
                      </p>
                    </div>
                  </div>
                ) : selectedState.status === "CONFIRMED_YEAR" ? (
                  <div className="space-y-10 max-w-2xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-muted uppercase tracking-widest">Expected Election</span>
                        <div className="text-2xl font-serif font-black text-white">{selectedState.year}</div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-muted uppercase tracking-widest">Assembly Term Expiry</span>
                        <div className="text-2xl font-serif font-black text-white">{selectedState.termExpiry}</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xl font-serif font-bold text-white">Status Note</h4>
                      <p className="text-lg text-muted leading-relaxed font-light">{selectedState.note}</p>
                    </div>

                    <div className="p-6 bg-[#f4a261]/5 border border-[#f4a261]/20 rounded-2xl space-y-4">
                      <div className="flex items-center gap-2 text-[#f4a261]">
                        <RotateCcw className="w-4 h-4" />
                        <span className="text-xs font-black uppercase tracking-widest">Process Timeline</span>
                      </div>
                      <p className="text-sm text-muted leading-relaxed font-light">
                        ECI will officially announce the full schedule (nomination dates, polling date, counting date) approximately 5–6 weeks before the election. This announcement occurs via a national press conference.
                      </p>
                    </div>

                    <div className="text-[10px] font-mono text-muted uppercase tracking-[0.2em] italic">
                      Disclaimer: These are estimated dates based on assembly term records. Not officially announced by the ECI.
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8 max-w-2xl">
                    <div className="space-y-6">
                      <p className="text-xl text-muted leading-relaxed font-light">{selectedState.note}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-muted uppercase tracking-widest">Next Election Cycle:</span>
                        <span className="text-lg font-serif font-bold text-white">{selectedState.nextYear}</span>
                      </div>
                    </div>
                    <div className="p-6 bg-[#4cc9f0]/5 border border-[#4cc9f0]/20 rounded-2xl flex items-start gap-4">
                      <Info className="w-5 h-5 text-[#4cc9f0] shrink-0 mt-0.5" />
                      <p className="text-sm text-muted leading-relaxed font-light italic">
                        This state has recently concluded its electoral process. Legislative operations are ongoing under the new mandate.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
