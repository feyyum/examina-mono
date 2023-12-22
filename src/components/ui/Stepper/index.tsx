import React from "react";
import styles from "./Stepper.module.css";
import Image from "next/image";

import StepperArrow from "@/icons/stepper-arrow.svg";
import StepperArrowGray from "@/icons/stepper-arrow-gray.svg";

type Props = {
  steps: string[];
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

function Stepper({ steps, currentStep, setCurrentStep }: Props) {
  return (
    <div className={styles.container}>
      {steps.map((el, i) => {
        return (
          <div
            key={i}
            className={styles.item_container}
            onClick={() => setCurrentStep(i)}
          >
            <div
              className={`${styles.button_container} ${
                currentStep === i && styles.button_container_active
              }`}
            >
              <h3
                className={`${styles.button_text} ${
                  currentStep === i && styles.button_text_active
                }`}
              >
                Step {i + 1}{" "}
                <span className={styles.button_text_secondary}>{el}</span>
              </h3>
            </div>
            {!(steps.length - 1 === i) && (
              <Image
                src={currentStep === i ? StepperArrow : StepperArrowGray}
                alt=""
                width={24}
                height={24}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Stepper;
