import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { uuid } from "uuidv4";
import type { RootState } from "../../store";

// Define a type for the slice state
export interface ExamState {
  id: string;
  title: string;
  description: string;
  startDate: Date | null; // ISO 8601
  duration: string;
  questions: Question[];
}

export interface Question {
  id: string;
  question: string;
  description?: string;
  options: {
    A: any;
    B: any;
    C: any;
    D: any;
    E: any;
  };
  answer: "A" | "B" | "C" | "D" | "E";
}

// Define the initial state using that type
const initialState = {
  id: uuid(),
  title: "",
  description: "",
  startDate: new Date(),
  duration: "",
  questions: [
    {
      id: uuid(),
      question: "",
      description: "",
      options: {
        A: "",
        B: "",
        C: "",
        D: "",
        E: "",
      },
      answer: "A",
    },
  ],
} as ExamState;

export const examSlice = createSlice({
  name: "exam",
  // `clientSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
    setExam: (state, action: PayloadAction<ExamState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setExam } = examSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectContract = (state: RootState) =>
//   state.client.zkappWorkerClient;

export default examSlice.reducer;
