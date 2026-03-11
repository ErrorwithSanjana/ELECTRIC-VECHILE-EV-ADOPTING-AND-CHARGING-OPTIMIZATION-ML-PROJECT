import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, FilterState, ChargingStation } from '../types';

interface AppState {
  // Auth state
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  
  // Filter state
  filters: FilterState;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  
  // Selected station
  selectedStation: ChargingStation | null;
  setSelectedStation: (station: ChargingStation | null) => void;
  
  // Sidebar state
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  
  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

// Default filter state
const defaultFilters: FilterState = {
  state: '',
  city: '',
  stationType: '',
  availability: '',
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Auth
      user: null,
      isAuthenticated: false,
      login: (email: string, password: string) => {
        // Mock authentication - demo credentials
        if (email === 'admin@gov.in' && password === 'govt123') {
          const user: User = {
            id: 'USR-001',
            email,
            name: 'Dr. Rajesh Kumar',
            role: 'Administrator',
            avatar: undefined,
          };
          set({ user, isAuthenticated: true });
          return true;
        }
        // Allow any login for demo purposes
        const user: User = {
          id: 'USR-002',
          email,
          name: email.split('@')[0],
          role: 'Viewer',
          avatar: undefined,
        };
        set({ user, isAuthenticated: true });
        return true;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      
      // Filters
      filters: defaultFilters,
      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        })),
      resetFilters: () => set({ filters: defaultFilters }),
      
      // Selected station
      selectedStation: null,
      setSelectedStation: (station) => set({ selectedStation: station }),
      
      // Sidebar
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      
      // Search
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
    }),
    {
      name: 'ev-dashboard-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
