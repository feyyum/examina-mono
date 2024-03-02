import { uuid } from "uuidv4";

export type Option = {
  number: 1 | 2 | 3 | 4 | 5;
  text: string;
};

class Question {
  public id: string;
  public question: string;
  public description: string;
  public options: Option[];
  public correctAnswer: 1 | 2 | 3 | 4 | 5; // correctAnswer

  public constructor() {
    this.id = uuid();
    this.question = "";
    this.description = "";
    this.options = [
      {
        number: 1,
        text: "",
      },
      {
        number: 2,
        text: "",
      },
      {
        number: 3,
        text: "",
      },
      {
        number: 4,
        text: "",
      },
      {
        number: 5,
        text: "",
      },
    ];
    this.correctAnswer = 1;
  }
}

export default Question;
