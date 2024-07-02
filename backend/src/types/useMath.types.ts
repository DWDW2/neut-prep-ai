export type UseMathResponseType = {
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
