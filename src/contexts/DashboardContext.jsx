import { createContext, useContext } from "react";

const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  return (
    <DashboardContext.Provider value={{}}>{children}</DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);

  if (context) {
    return context;
  } else {
    throw new Error("use useDashboard within DashboardProvider context");
  }
}
