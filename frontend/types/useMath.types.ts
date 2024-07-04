interface UseMathResponseType {
    id: string
}

interface mathTestType {
    _id: string;
    test:[{
        id: string;
        question: string;
        questionType: string;
        explanation: string;
        options: string[];
        correct_option: string;
        svg_file: string | null;
    }],
    answers: string[]
    createdAt: string;
    updatedAt: string;
}

interface useMathUpdateResponseType {
    results: [
        {
            questionId: string;
            isCorrect: boolean;
        }
    ];
}


export type {
    UseMathResponseType,
    mathTestType,
    useMathUpdateResponseType
}
