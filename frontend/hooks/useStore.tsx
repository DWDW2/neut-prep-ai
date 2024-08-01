import {create} from 'zustand';

interface LessonState {
  isLessonCompleted: boolean;
  showModal: boolean;
  setLessonCompleted: (completed: boolean) => void;
  setShowModal: (show: boolean) => void;
}

const useStore = create<LessonState>((set) => ({
  isLessonCompleted: false,
  showModal: false,
  setLessonCompleted: (completed) => set((state) => ({ ...state, isLessonCompleted: completed })),
  setShowModal: (show) => set((state) => ({ ...state, showModal: show })),
}));

export default useStore;
