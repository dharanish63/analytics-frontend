import { create } from "zustand";
import { persist } from "zustand/middleware";

const domain = (set) => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const lastWeekStart = new Date(today);
  lastWeekStart.setDate(today.getDate() - dayOfWeek - 7);
  const lastWeekEnd = new Date(today);
  lastWeekEnd.setDate(today.getDate() - dayOfWeek - 1);
  return {
    selectedDomain: null,
    startDate: lastWeekStart,
    endDate: lastWeekEnd,
    setSelectedDomain: (domain) => set({ selectedDomain: domain }),
    setStartDate: (startDate) => set({ startDate }),
    setEndDate: (endDate) => set({ endDate }),
  };
};

const useDomain = create(
  persist(domain, {
    name: "domaindetails", // LocalStorage key
  })
);

export { useDomain };
