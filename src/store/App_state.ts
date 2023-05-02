import { create } from "zustand";

type State = {
  modal: boolean;
  day: string;
  name_routine: string;
};

type Actions = {
  toggleModal: () => void;
  setRoutineName: (name_routine:string) => void;
  setDay: (day:string) => void;
};

const initialState: State = {
  name_routine: '',
  day: '',
  modal: false,
};

export const useAppStore = create<State & Actions>()((set) => ({
  ...initialState,
  toggleModal: () => set((state) => ({ modal: !state.modal })),
  setRoutineName: (name_routine) => set(() => ({ name_routine })),
  setDay: (day) => set(() => ({ day})),
}));
