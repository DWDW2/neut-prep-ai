type mathTestType = {
    id: string;
    question: string;
    question_type: string;
    explanation: string;
    options: string[];
    correct_option: string;
    svg_file: string | null;
}

type mathTestModelType = {
    test: mathTestType[];
    answers: string[];
    createdAt: string;
    updatedAt: string;
}

export type {
    mathTestType,
    mathTestModelType
}

//