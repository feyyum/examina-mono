import { uuid } from "uuidv4";

class Question {
  public id: string;
  public question: string;
  public description: string;
  public options: {
    A: any;
    B: any;
    C: any;
    D: any;
    E: any;
  };
  public answer: "A" | "B" | "C" | "D" | "E";

  public constructor() {
    this.id = uuid();
    this.question = "";
    this.description = "";
    this.options = {
      A: "",
      B: "",
      C: "",
      D: "",
      E: "",
    };
    this.answer = "A";
  }
}

export default Question;
