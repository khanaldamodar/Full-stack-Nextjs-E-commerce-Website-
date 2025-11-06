// store/settingsStore.ts
import { create } from "zustand";

interface Settings {
  companyName?: string;
  slogan?: string;
  logo?: string;
  favicon?: string;
  aboutShort?: string;
  about?: string;
  socialLinks?: { [key: string]: string };
  address?: string;
  email1?:string;
  email2?:string;
  phone1?:string;
  phone2?:string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  createdAt: string;
  rating?: number;
  [key: string]: any;
}


interface SettingsStore {
  settings: Settings;
  setSettings: (settings: Settings) => void;
  fetchSettings: () => Promise<void>;
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  settings: {},
  setSettings: (settings) => set({ settings }),
  fetchSettings: async () => {
    try {
      const res = await fetch("http://localhost:3000/api/settings");
      const data = await res.json();
      set({ settings: data });
    } catch (err) {
      console.error("Failed to fetch settings", err);
    }
  },
}));




