import React, { useState, Ref, useEffect } from "react";
import styles from "@/styles/app/create-exam/CreateExam.module.css";
import Image from "next/image";
import Calendar from "react-calendar";
import classnames from "classnames";

import * as Tabs from "@radix-ui/react-tabs";
import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";

import ArrowBottom from "@/icons/arrow_bottom.svg";

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
  const exam = useAppSelector((state) => state.exam);
  const dispatch = useAppDispatch();

  const [currentStep, setCurrentStep] = React.useState<string>("0");
  const [startDate, setStartDate] = useState<Value>(new Date());

  // Change the exam state when the start date is changed
  useEffect(() => {
    dispatch(setExam({ ...exam, startDate: startDate as Date }));
  }, [startDate]);

  console.log(exam);

  return (
    <div className={styles.container}>
      <Tabs.Root
        value={currentStep}
        onValueChange={(value) => setCurrentStep(value)}
        className={styles.stepper_container}
      >
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
              <h3 className={styles.form_element_title}>
                Exam Title{" "}
                <span className={styles.counter_text}>
                  {exam.title.length}/120
                </span>
              </h3>
              <input
                className={styles.form_element_input}
                type="text"
                id="title"
                placeholder="Enter Exam Title"
                onChange={(e) =>
                  dispatch(setExam({ ...exam, title: e.target.value }))
                }
                maxLength={120}
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
                          <button className="Button green">Save</button>
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
                <Select.Root
                  onValueChange={(e) =>
                    dispatch(setExam({ ...exam, duration: e }))
                  }
                >
                  <Select.Trigger className="SelectTrigger" aria-label="Food">
                    <Select.Value placeholder="Duration" />
                    <Select.Icon className="SelectIcon">
                      <Image src={ArrowBottom} alt="" width={12} />
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="SelectContent">
                      <Select.Viewport className="SelectViewport">
                        <Select.Group>
                          <SelectItem value="30">30 Minutes</SelectItem>
                          <SelectItem value="60">60 Minutes</SelectItem>
                          <SelectItem value="90">90 Minutes</SelectItem>
                          <SelectItem value="120">120 Minutes</SelectItem>
                        </Select.Group>
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </div>
            </div>
            <div className={styles.form_element_container}>
              <h3 className={styles.form_element_title}>
                Exam Description{" "}
                <span className={styles.counter_text}>
                  {exam.description.length}/1200
                </span>
              </h3>
              <textarea
                className={styles.form_element_textarea}
                id="description"
                placeholder="Enter Exam Description"
                onChange={(e) =>
                  dispatch(setExam({ ...exam, description: e.target.value }))
                }
                maxLength={1200}
              />
            </div>
            <div className={styles.form_element_button_container}>
              <button
                className={styles.form_element_button}
                onClick={() => {
                  setCurrentStep("1");
                }}
              >
                Next Step
              </button>
            </div>
          </div>
        </Tabs.Content>
        <Tabs.Content value="1">Tab two content</Tabs.Content>
        <Tabs.Content value="2">Tab three content</Tabs.Content>
      </Tabs.Root>
    </div>
  );
}

const SelectItem = React.forwardRef(
  (
    {
      children,
      className,
      value,
      disabled,
      ...props
    }: {
      children: React.ReactNode;
      className?: string;
      value: string;
      disabled?: boolean;
      props?: any;
    },
    forwardedRef: any
  ) => {
    return (
      <Select.Item
        value={value} // Add the 'value' property here
        className={classnames("SelectItem", className)}
        disabled={disabled}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="SelectItemIndicator">
          {/* <CheckIcon /> */}
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

SelectItem.displayName = "SelectItem";

export default CreateExam;
