type mathTestType = {
    id: string;
    question: string;
    question_type: string;
    explanation: string;
    options: {
        A: string;
        B: string;
        C: string;
        D: string;
        E: string | null;
    };
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