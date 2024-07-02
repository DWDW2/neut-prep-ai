import { criticalTestModelType, criticalTestType } from "./useCritical.types";
import { mathTestModelType, mathTestType } from "./useMath.types";

interface nuetTestModelType{
    critical: criticalTestType;
    math: mathTestType;
}
interface IdResponse {
    id: string; // Or any other appropriate type for the ID
  }
export {
    nuetTestModelType,
    IdResponse
}