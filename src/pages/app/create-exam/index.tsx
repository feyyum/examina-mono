import styles from "@/styles/app/create-exam/CreateExam.module.css";
import React, { useState, Ref, useEffect } from "react";
import Image from "next/image";
import Calendar from "react-calendar";
import classnames from "classnames";

// Icons
import ArrowBottom from "@/icons/arrow_bottom.svg";
import Close from "@/icons/close_mina_purple.svg";
import Error from "@/icons/error.svg";

// Classes
import Question from "@/lib/Question";

// Radix Primitives
import * as Tabs from "@radix-ui/react-tabs";
import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";
import * as RadioGroup from "@radix-ui/react-radio-group";

// Redux
import { useAppSelector, useAppDispatch } from "../../../../hooks";
import { setExam } from "../../../../features/client/exam";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
type Preview = Question | undefined;

function CreateExam() {
  const exam = useAppSelector((state) => state.exam);
  const dispatch = useAppDispatch();

  const [currentStep, setCurrentStep] = React.useState<string>("0");
  const [startDate, setStartDate] = useState<Value>(new Date());

  const [currentQuestion, setCurrentQuestion] = useState<Question>(
    new Question()
  );
  const [previewQuestion, setPreviewQuestion] = useState<Preview>(
    exam.questions[0]
  );

  useEffect(() => {
    exam.questions.length > 0
      ? setPreviewQuestion(exam.questions[0])
      : setPreviewQuestion(undefined);
  }, [exam.questions]);

  console.log(previewQuestion);

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
              Exam details
            </h3>
          </Tabs.Trigger>
          <Tabs.Trigger className={styles.stepper_selector} value="1">
            <h3 className={styles.stepper_selector_title}>
              <span className={styles.stepper_selector_title_bold}>Step 2</span>{" "}
              Create questions
            </h3>
          </Tabs.Trigger>
          <Tabs.Trigger
            className={styles.stepper_selector}
            value="2"
            disabled={!previewQuestion}
          >
            <h3 className={styles.stepper_selector_title}>
              <span className={styles.stepper_selector_title_bold}>Step 3</span>{" "}
              Finish
            </h3>
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="0">
          <div className={styles.create_exam_form_container}>
            <div className={styles.form_element_container}>
              <h3 className={styles.form_element_title}>
                Exam title{" "}
                <span className={styles.counter_text}>
                  {exam.title.length}/120
                </span>
              </h3>
              <input
                className={styles.form_element_input}
                type="text"
                id="title"
                placeholder="Enter exam title"
                value={exam.title}
                onChange={(e) =>
                  dispatch(setExam({ ...exam, title: e.target.value }))
                }
                maxLength={120}
              />
            </div>
            <div className={styles.create_exam_form_row}>
              <div className={styles.form_element_container}>
                <h3 className={styles.form_element_title}>Start date</h3>
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <button className="Button violet">Start date</button>
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay className="DialogOverlay" />
                    <Dialog.Content className="DialogContent">
                      <Dialog.Title className="DialogTitle">
                        Select date
                      </Dialog.Title>
                      <Dialog.Description className="DialogDescription">
                        Please select date which you want to start exam.
                      </Dialog.Description>
                      <div>
                        <Calendar
                          onChange={(e) => {
                            setStartDate(e);
                            dispatch(
                              setExam({ ...exam, startDate: e as Date })
                            );
                          }}
                          value={startDate}
                          minDate={new Date()}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          marginTop: "1.25rem",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Dialog.Close asChild>
                          <button className="Button green">Save</button>
                        </Dialog.Close>
                      </div>
                      <Dialog.Close asChild>
                        <button className="IconButton" aria-label="Close">
                          <Image src={Close} alt="" width={24} />
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
                  <Select.Trigger
                    className="SelectTrigger"
                    aria-label="Duration"
                  >
                    <Select.Value placeholder="Select duration" />
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
                Exam description{" "}
                <span className={styles.counter_text}>
                  {exam.description.length}/1200
                </span>
              </h3>
              <textarea
                className={styles.form_element_textarea}
                id="description"
                placeholder="Enter exam description"
                value={exam.description}
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
        <Tabs.Content value="1">
          <div className={styles.create_exam_form_container}>
            <div className={styles.form_element_container}>
              <h3 className={styles.form_element_title}>
                Exam the question{" "}
                <span className={styles.counter_text}>
                  {exam.title.length}/120
                </span>
              </h3>
              <input
                className={styles.form_element_input}
                type="text"
                id="title"
                placeholder="Enter the question"
                value={currentQuestion.question}
                onChange={(e) =>
                  setCurrentQuestion({
                    ...currentQuestion,
                    question: e.target.value,
                  })
                }
                maxLength={120}
              />
            </div>
            <div className={styles.form_element_container}>
              <h3 className={styles.form_element_title}>
                Enter the question details{" "}
                <span className={styles.counter_text}>
                  {exam.description.length}/1200 (Optional)
                </span>
              </h3>
              <textarea
                className={styles.form_element_textarea}
                id="description"
                placeholder="Enter the question details"
                value={currentQuestion.description}
                onChange={(e) =>
                  setCurrentQuestion({
                    ...currentQuestion,
                    description: e.target.value,
                  })
                }
                maxLength={1200}
              />
            </div>
            <div className={styles.form_element_container}>
              <h3 className={styles.form_element_title}>
                Enter the answer options of question and choose correct answer{" "}
                {/* <span className={styles.counter_text}>
                  {exam.description.length}/1200 (Optional)
                </span> */}
              </h3>
              <div className={styles.questions_container}>
                <RadioGroup.Root
                  className="RadioGroupRoot"
                  defaultValue="default"
                  aria-label="View density"
                >
                  {Object.keys(currentQuestion.options).map((el, i) => {
                    return (
                      <div
                        key={i}
                        className={`RadioGruopContainer ${
                          el === currentQuestion.answer &&
                          "RadioGroupContainer__active"
                        }`}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <RadioGroup.Item
                            className="RadioGroupItem"
                            value={el}
                            checked={el === currentQuestion.answer}
                            onClick={() =>
                              setCurrentQuestion({
                                ...currentQuestion,
                                answer: el as "A" | "B" | "C" | "D" | "E",
                              })
                            }
                          >
                            <RadioGroup.Indicator className="RadioGroupIndicator" />
                          </RadioGroup.Item>
                          <input
                            className="RadioInput"
                            type="text"
                            value={`${
                              Object.values(currentQuestion.options)[i]
                            }`}
                            placeholder={`Enter answer ${i + 1}`}
                            onChange={(e) =>
                              setCurrentQuestion({
                                ...currentQuestion,
                                options: {
                                  ...currentQuestion.options,
                                  [["A", "B", "C", "D", "E"][i]]:
                                    e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                    );
                  })}
                </RadioGroup.Root>
              </div>
              <div className={styles.form_element_button_container}>
                <button
                  className={styles.form_element_button}
                  onClick={() => {
                    const list = [...exam.questions];
                    list.push(currentQuestion);
                    dispatch(
                      setExam({
                        ...exam,
                        questions: list,
                      })
                    );
                    setCurrentQuestion(new Question());
                  }}
                >
                  Create Question
                </button>
              </div>
              <div className={styles.preview_table_container}>
                <table className={styles.preview_table}>
                  <tr>
                    <th>Questions List</th>
                  </tr>
                  {exam.questions.map((el, _i) => {
                    return (
                      <tr key={_i}>
                        <td>
                          <div className={styles.preview_table_row}>
                            <p className={styles.preview_table_content}>
                              Question {_i + 1}
                            </p>
                            <Image
                              src={Error}
                              alt=""
                              className={styles.preview_table_error}
                              onClick={() => {
                                const list = exam.questions.filter(
                                  (fel) => fel.id !== el.id
                                );
                                dispatch(
                                  setExam({
                                    ...exam,
                                    questions: list,
                                  })
                                );
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </table>
              </div>
            </div>
            <div className={styles.form_element_button_container}>
              <button
                className={styles.form_element_button}
                onClick={() => {
                  setCurrentStep("2");
                }}
                disabled={!previewQuestion}
              >
                Next Step
              </button>
            </div>
          </div>
        </Tabs.Content>
        <Tabs.Content value="2">
          <div className={styles.preview_container}>
            <div className={styles.preview_question_container}>
              <div className={styles.question_container}>
                <p className={styles.question_describe}>
                  {previewQuestion?.description}
                </p>
                <p className={styles.question_title}>
                  {previewQuestion?.question}
                </p>
              </div>
              <div className={styles.answers_container}>
                <RadioGroup.Root
                  className="RadioGroupRoot"
                  defaultValue="default"
                  aria-label="View density"
                >
                  {previewQuestion &&
                    Object.values(previewQuestion.options).map((el, i) => {
                      return (
                        <div
                          key={i}
                          className={`RadioGruopContainer ${
                            el === currentQuestion.answer &&
                            "RadioGroupContainer__active"
                          } RadioGruopContainerPreview`}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <RadioGroup.Item
                              className="RadioGroupItem"
                              value={el}
                              checked={
                                Object.keys(previewQuestion.options)[i] ===
                                currentQuestion.answer
                              }
                            >
                              <RadioGroup.Indicator className="RadioGroupIndicator" />
                            </RadioGroup.Item>
                            <p className="RadioText">{el}</p>
                          </div>
                        </div>
                      );
                    })}
                </RadioGroup.Root>
              </div>
            </div>
            <div className={styles.preview_selector_container}>
              <div className={styles.selector_container}>
                {exam.questions.map((el, _i) => {
                  return (
                    <div
                      key={_i}
                      className={`${styles.selector_box} ${
                        el.id === previewQuestion?.id &&
                        styles.selector_box_active
                      }`}
                      onClick={() => setPreviewQuestion(el)}
                    >
                      <p
                        className={`${styles.selector_box_text} ${
                          el.id === previewQuestion?.id &&
                          styles.selector_box_text_active
                        }`}
                      >
                        {_i + 1}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Tabs.Content>
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
