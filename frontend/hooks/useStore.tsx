import {create} from 'zustand';

interface LessonState {
  isLessonCompleted: boolean;
  showModal: boolean;
  isModalShowed: boolean;
  setIsModalShowed: (show: boolean) => void;
  setLessonCompleted: (completed: boolean) => void;
  setShowModal: (show: boolean) => void;
}

const useStore = create<LessonState>((set) => ({
  isLessonCompleted: false,
  showModal: false,
  isModalShowed: false,
  setLessonCompleted: (completed) => set((state) => ({ ...state, isLessonCompleted: completed })),
  setShowModal: (show) => set((state) => ({ ...state, showModal: show })),
  setIsModalShowed: (show) => set((state) => ({ ...state, isModalShowed: show }))
 }));

export default useStore;
