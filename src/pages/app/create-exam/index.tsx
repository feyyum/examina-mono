import { useState } from "react";
import styles from "@/styles/app/create-exam/CreateExam.module.css";
import Image from "next/image";
import Calendar from "react-calendar";

import * as Tabs from "@radix-ui/react-tabs";
import * as Dialog from "@radix-ui/react-dialog";

import { useAppSelector, useAppDispatch } from "../../../../hooks";
import { setExam } from "../../../../features/client/exam";

// Components
import { TextInput } from "@/components/ui/FormComponents";
import Close from "@/icons/close_mina_purple.svg";

type Props = {};

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

// const STEPS = ["Basics", "Create Questions", "Check", "Done"];

function CreateExam({}: Props) {
  // const [currentStep, setCurrentStep] = React.useState<number>(0);
  const [startDate, setStartDate] = useState<Value>(new Date());

  console.log(startDate);

  const exam = useAppSelector((state) => state.exam);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      {/* <Stepper
        steps={STEPS}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        className={styles.stepper}
      /> */}

      <Tabs.Root defaultValue="0" className={styles.stepper_container}>
        <Tabs.List
          aria-label="create exam"
          className={styles.stepper_selector_container}
        >
          <Tabs.Trigger className={styles.stepper_selector} value="0">
            <h3 className={styles.stepper_selector_title}>
              <span className={styles.stepper_selector_title_bold}>Step 1</span>{" "}
              Exam Details
            </h3>
          </Tabs.Trigger>
          <Tabs.Trigger className={styles.stepper_selector} value="1">
            <h3 className={styles.stepper_selector_title}>
              <span className={styles.stepper_selector_title_bold}>Step 2</span>{" "}
              Create Questions
            </h3>
          </Tabs.Trigger>
          <Tabs.Trigger className={styles.stepper_selector} value="2">
            <h3 className={styles.stepper_selector_title}>
              <span className={styles.stepper_selector_title_bold}>Step 3</span>{" "}
              Preview
            </h3>
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="0">
          <div className={styles.create_exam_form_container}>
            <div className={styles.form_element_container}>
              <h3 className={styles.form_element_title}>Exam Title</h3>
              <input
                className={styles.form_element_input}
                type="text"
                id="title"
                placeholder="Enter Exam Title"
              />
            </div>
            <div className={styles.create_exam_form_row}>
              <div className={styles.form_element_container}>
                <h3 className={styles.form_element_title}>Start Date</h3>
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <button className="Button violet">Start Date</button>
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay className="DialogOverlay" />
                    <Dialog.Content className="DialogContent">
                      <Dialog.Title className="DialogTitle">
                        Select Date
                      </Dialog.Title>
                      <Dialog.Description className="DialogDescription">
                        Please select date which you want to start exam.
                      </Dialog.Description>
                      <div>
                        <Calendar
                          onChange={setStartDate}
                          value={startDate}
                          minDate={new Date()}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          marginTop: 25,
                          justifyContent: "flex-end",
                        }}
                      >
                        <Dialog.Close asChild>
                          <button className="Button green">Save changes</button>
                        </Dialog.Close>
                      </div>
                      <Dialog.Close asChild>
                        <button className="IconButton" aria-label="Close">
                          <Image src={Close} alt="" />
                        </button>
                      </Dialog.Close>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
              </div>
              <div className={styles.form_element_container}>
                <h3 className={styles.form_element_title}>Duration</h3>
                {/* TODO: Add Select */}
              </div>
            </div>
            <div className={styles.form_element_container}>
              <h3 className={styles.form_element_title}>Exam Description</h3>
              <textarea
                className={styles.form_element_textarea}
                id="description"
                placeholder="Enter Exam Description"
              />
            </div>
            <div className={styles.form_element_button_container}>
              <button className={styles.form_element_button}>Next Step</button>
            </div>
          </div>
        </Tabs.Content>
        <Tabs.Content value="1">Tab two content</Tabs.Content>
        <Tabs.Content value="2">Tab three content</Tabs.Content>
      </Tabs.Root>

      {/* {currentStep === 0 && (
        <div className={styles.exam_details_container}>
          <TextInput
            title="Assessment Title"
            value={exam.title}
            onChange={(e) => {
              dispatch(setExam({ ...exam, title: e }));
              console.log(exam);
            }}
            placeholder="Enter Assessment Title"
          />
          <TextInput
            title="Assessment Description"
            value={exam.description}
            onChange={(e) => {
              dispatch(setExam({ ...exam, description: e }));
              console.log(exam);
            }}
            type="textarea"
            placeholder="Enter Assessment Description"
          />

          <div
            className={styles.button_container}
            // onClick={() => setCurrentStep(currentStep + 1)}
          >
            <h3 className={styles.button_text}>Next Step</h3>
          </div>
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
      )} */}
    </div>
  );
}

export default CreateExam;
