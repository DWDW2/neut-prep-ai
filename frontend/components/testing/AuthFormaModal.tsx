import { useRouter } from "next/navigation";

type Props = {
    isModalOpen: boolean;
    closeModal: () => void;
}

export default function LessonCompleteModal({isModalOpen, closeModal}: Props) {
    const router = useRouter()
  
    if (!isModalOpen) return null
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-2xl max-w-sm mx-auto border-2 border-slate-500">
          <h2 className="text-black text-xl font-bold mb-6 text-center">
            Lesson Complete! Create an account to save your progress and access all features of the application!
          </h2>
          <div className="space-y-4">
            <button
              className="w-full py-3 bg-[#DCAF52] border-b-4 active:border-b-2 border-[#C39840] text-white font-bold rounded-2xl transition duration-300"
              onClick={() => {
                closeModal()
                router.push('/testing')
              }}
            >
              CREATE ACCOUNT
            </button>
            <button
              className="w-full py-3 bg-blue-500 border-b-4 active:border-b-2 border-blue-600 text-white font-bold rounded-2xl transition duration-300"
              onClick={() => {
                closeModal()
                router.push('/login')
              }}
            >
              LOGIN
            </button>
          </div>
        </div>
      </div>
    )
  }