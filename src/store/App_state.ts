import { create } from "zustand";

type State = {
  modal: boolean;
  done: boolean;
  day: string;
  nameEx: string;
  sets: number;
  weight: number;
  reps: number;
};

type Actions = {
  toggleModal: () => void;
  toggleDone: () => void;
  setDay: (day: string) => void;
  setNameEx: (nameEx: string) => void;
  setSets: (sets: number) => void;
  setWeight: (weight: number) => void;
  setReps: (reps: number) => void;
};

const initialState: State = {
  modal: false,
  done: false,
  day: "",
  nameEx: "",
  sets: 0,
  weight: 0,
  reps: 0,
};

export const useAppStore = create<State & Actions>()((set) => ({
  ...initialState,
  toggleModal: () => set((state) => ({ modal: !state.modal })),
  toggleDone: () => set((state) => ({ done: !state.done })),
  setDay: (day) => set(() => ({ day })),
  setNameEx: (nameEx) => set(() => ({ nameEx })),
  setSets: (sets) => set(() => ({ sets })),
  setWeight: (weight) => set(() => ({ weight })),
  setReps: (reps) => set(() => ({ reps })),
}));
