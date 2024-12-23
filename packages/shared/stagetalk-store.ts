import { create } from "zustand";
import type { Doc, Id } from "./convex/_generated/dataModel";

type GlobalState = {
  teamId: Id<"teams"> | null;
  setTeamId: (teamId: Id<"teams">) => void;

  userId: Id<"users"> | null;
  user: Doc<"users"> | null;
  setUser: (user: Doc<"users">) => void;
};

const useStagetalkStore = create<GlobalState>((set) => ({
  teamId: null,
  setTeamId: (teamId: Id<"teams">) => set({ teamId }),
  userId: null,
  user: null,
  setUser: (user: Doc<"users">) => set({ user, userId: user._id }),
}));

export default useStagetalkStore;
