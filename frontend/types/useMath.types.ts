interface UseMathResponseType {
    id: string
}

interface mathTestType {
    id: string;
    question: string;
    question_type: string;
    explanation: string;
    options: string[];
    correct_option: string;
    svg_file: string | null;
}

interface UseMathUpdateResponseType {
    result: [
        {
            questionId: string;
            isCorrect: boolean;
        }
    ];
}


export type {
    UseMathResponseType,
    mathTestType,
    UseMathUpdateResponseType
}
