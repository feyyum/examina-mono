import React from "react";
import styles from "@/styles/app/create-exam/CreateExam.module.css";

import { useAppSelector, useAppDispatch } from "../../../../hooks";
import { setExam } from "../../../../features/client/exam";

// Components
import Stepper from "@/components/ui/Stepper";
import { TextInput } from "@/components/ui/FormComponents";

type Props = {};

const STEPS = ["Basics", "Create Questions", "Check", "Done"];

function CreateExam({}: Props) {
  const [currentStep, setCurrentStep] = React.useState<number>(0);

  const exam = useAppSelector((state) => state.exam);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <Stepper
        steps={STEPS}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        className={styles.stepper}
      />

      {currentStep === 0 && (
        <div>
          <TextInput
            title="Assessment Title"
            value={exam.title}
            onChange={(e) => {
              dispatch(setExam({ ...exam, title: e }));
              console.log(exam);
            }}
          />
        </div>
      )}
      {currentStep === 1 && (
        <div>
          <h1>Create Questions</h1>
        </div>
      )}
      {currentStep === 2 && (
        <div>
          <h1>Check</h1>
        </div>
      )}
      {currentStep === 3 && (
        <div>
          <h1>Done</h1>
        </div>
      )}
    </div>
  );
}

export default CreateExam;
