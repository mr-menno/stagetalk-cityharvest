import { create } from "zustand";
import type { Id } from "./convex/_generated/dataModel";

type GlobalState = {
  teamId: Id<"teams"> | null;
  setTeamId: (teamId: Id<"teams">) => void;
};

const useStagetalkStore = create<GlobalState>((set) => ({
  teamId: null,
  setTeamId: (teamId: Id<"teams">) => set({ teamId }),
}));

export default useStagetalkStore;
