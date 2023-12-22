import React from "react";
import styles from "@/styles/app/create-exam/CreateExam.module.css";

// Components
import Stepper from "@/components/ui/Stepper";

type Props = {};

const STEPS = ["Basics", "Create Questions", "Check", "Done"];

function CreateExam({}: Props) {
  const [currentStep, setCurrentStep] = React.useState<number>(2);

  return (
    <div className={styles.container}>
      <Stepper
        steps={STEPS}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    </div>
  );
}

export default CreateExam;
