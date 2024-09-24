import styles from '@/styles/app/create-exam/CreateExam.module.css';
import React, { useState, useRef, useEffect } from 'react';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import Image from 'next/image';
import DateTimePicker from 'react-datetime-picker';
import 'react-clock/dist/Clock.css';
import classnames from 'classnames';
import { CodeToggle, MDXEditor } from '@mdxeditor/editor';
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  imagePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  InsertImage,
} from '@mdxeditor/editor';
import { pinata } from '../../../../utils/config';

import '@mdxeditor/editor/style.css';

// Icons
import ArrowBottom from '@/icons/arrow_bottom.svg';
import Close from '@/icons/close_mina_purple.svg';
import Error from '@/icons/error.svg';
import RArrow from '@/icons/arrow-right-circle.svg';
import Duplicate from '@/icons/document-duplicate.svg';
import Trash from '@/icons/trash.svg';
import QMark from '@/icons/question-mark-circle.svg';
import PCircle from '@/icons/plus-circle.svg';
import BCircle from '@/icons/arrow-right-circle-black.svg';
import CDown from '@/icons/chevron-down.svg';

// Classes
import Question from '@/lib/Question';

// API
import { createExam } from '@/lib/Client/Exam';

// Radix Primitives
import * as Tabs from '@radix-ui/react-tabs';
import * as Dialog from '@radix-ui/react-dialog';
import * as Select from '@radix-ui/react-select';
import * as RadioGroup from '@radix-ui/react-radio-group';

// Redux
import { useAppSelector, useAppDispatch } from '../../../../hooks';
import { setExam } from '../../../../features/client/exam';
import DashboardHeader from '@/components/ui/DashboardHeader';
import toast from 'react-hot-toast';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
type Preview = Question | undefined;

const uploadFile = async (file: any) => {
  if (!file) {
    alert('No file selected');
    return;
  }

  try {
    const keyRequest = await fetch('/api/key');
    const keyData = await keyRequest.json();
    const upload = await pinata.upload.file(file).key(keyData.JWT);
    const ipfsUrl = await pinata.gateways.convert(upload.IpfsHash);
    console.log(ipfsUrl);
    return ipfsUrl;
  } catch (e) {
    console.log(e);
    alert('Trouble uploading file');
  }
};

function CreateExam() {
  const exam = useAppSelector((state) => state.exam);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const mdRef = useRef<any>(null);

  const mutationOptions: UseMutationOptions<any, any, any, any> = {
    mutationFn: createExam,
    // other options like onSuccess, onError, etc.
    onSuccess: (data) => {
      //console.log(data);
      setQuestionID(1);
      dispatch(
        setExam({
          id: '',
          title: '',
          description: '',
          startDate: new Date(),
          duration: '',
          questions: [],
        })
      );
      setCurrentQuestion(new Question(questionID));
      router.replace('/app');
    },
    onError: (error) => {
      console.log('Error', error);
    },
  };
  const { mutate: saveExam, isPending } = useMutation(mutationOptions);

  const [currentStep, setCurrentStep] = React.useState<string>('0');
  const [startDate, setStartDate] = useState<Value>();

  //! Temporary solution for question ID
  const [questionID, setQuestionID] = useState<number>(1);
  const [pointer, setPointer] = useState<number>(0);

  const [currentQuestion, setCurrentQuestion] = useState<Question>(new Question(questionID));

  useEffect(() => {
    if (exam.questions.length === 0) {
      setCurrentQuestion(new Question(questionID));
    }

    if (exam.questions.length > 0 && exam.questions[pointer]) {
      setCurrentQuestion(exam.questions[pointer]);
    }

    // if (exam.questions.length > 0 && !exam.questions[pointer]) {
    //   setQuestionID((prev) => prev + 1);
    //   setCurrentQuestion(new Question(questionID));
    //   dispatch(setExam({ ...exam, questions: [...exam.questions, currentQuestion] }));
    // }
  }, [pointer]);

  useEffect(() => {
    const temp = [...exam.questions];
    temp[pointer] = currentQuestion;
    dispatch(setExam({ ...exam, questions: temp }));
    mdRef.current?.setMarkdown(currentQuestion.description);
  }, [currentQuestion]);

  const createQuestionRef = useRef<any>(null);
  //console.log('REF', createQuestionRef);

  //console.log(exam);

  console.log(pointer);
  console.log(currentQuestion);

  return (
    <div className={styles.container}>
      <DashboardHeader withoutNav />

      {currentStep === '0' && (
        <div className={styles.stepper_container}>
          <div className={styles.create_exam_header}>
            <div>
              <h3 className={styles.create_exam_header_title}>Quiz details</h3>
              <p className={styles.create_exam_header_desc}>
                Enter quiz details before creating questions, this will give participants
                information about the quiz.
              </p>
            </div>
            <div>
              <Image src={BCircle} alt="" />
            </div>
          </div>
          <div className={styles.create_exam_form_container}>
            <div className={styles.create_exam_form_inner_container}>
              <div className={styles.form_element_container}>
                <h3 className={styles.form_element_title}>
                  Quiz title <span className={styles.counter_text}>{exam?.title?.length}/120</span>
                  {/* Quiz title */}
                </h3>
                <input
                  className={styles.form_element_input}
                  type="text"
                  id="title"
                  placeholder="Enter exam title"
                  value={exam.title}
                  onChange={(e) => dispatch(setExam({ ...exam, title: e.target.value }))}
                  maxLength={120}
                />
                <p className={styles.from_element_sub_desc}>
                  A descriptive title will give participants an indication of what the quiz is
                  about.
                </p>
              </div>
              <div className={styles.create_exam_form_row}>
                <div className={styles.form_element_container}>
                  <h3 className={styles.form_element_title}>Start date</h3>
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <button className="Button violet">
                        {startDate instanceof Date ? startDate.toLocaleDateString() : 'Select date'}
                      </button>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                      <Dialog.Overlay className="DialogOverlay" />
                      <Dialog.Content className="DialogContent">
                        <Dialog.Title className="DialogTitle">Select date</Dialog.Title>
                        <Dialog.Description className="DialogDescription">
                          Please select date which you want to start exam.
                        </Dialog.Description>
                        <div>
                          {/* <Calendar
                          onChange={(e) => {
                            setStartDate(e);
                            dispatch(setExam({ ...exam, startDate: e as Date }));
                          }}
                          value={startDate}
                          minDate={new Date()}
                        /> */}
                          <DateTimePicker
                            onChange={(e) => {
                              setStartDate(e);
                              dispatch(setExam({ ...exam, startDate: e as Date }));
                            }}
                            value={startDate}
                            minDate={new Date()}
                          />
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            marginTop: '1.25rem',
                            justifyContent: 'flex-end',
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
                    onValueChange={(e) => dispatch(setExam({ ...exam, duration: e }))}
                    value={exam.duration}
                  >
                    <Select.Trigger className="SelectTrigger" aria-label="Duration">
                      <Select.Value placeholder="Select duration" />
                      <Select.Icon className="SelectIcon">
                        <Image src={ArrowBottom} alt="" width={12} />
                      </Select.Icon>
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Content className="SelectContent">
                        <Select.Viewport className="SelectViewport">
                          <Select.Group>
                            <SelectItem value="10">10 Minutes</SelectItem>
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
                  Quiz information for participants{' '}
                  <span className={styles.counter_text}>{exam?.description?.length}/480</span>
                </h3>
                <textarea
                  className={styles.form_element_textarea}
                  id="description"
                  placeholder="Enter exam description"
                  value={exam.description}
                  onChange={(e) => dispatch(setExam({ ...exam, description: e.target.value }))}
                  maxLength={480}
                />
                <p className={styles.from_element_sub_desc}>
                  A good description will help participants get accurate information about the quiz.
                </p>
              </div>
              <div className={styles.form_element_button_container}>
                <button
                  className={styles.form_element_button}
                  onClick={() => {
                    if (
                      exam.title === '' ||
                      exam.description === '' ||
                      exam.startDate === null ||
                      exam.duration === ''
                    ) {
                      toast.error('Please fill all the fields.');
                      return;
                    }
                    setCurrentStep('1');
                  }}
                >
                  Next Step <Image src={RArrow} alt="" width={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentStep === '1' && (
        <div className={styles.container_secondary}>
          <div className={styles.stepper_container_secondary}>
            <div className={styles.create_exam_form_container}>
              <div className={styles.create_exam_form_inner_container}>
                <div className={styles.form_element_container_question_first}>
                  <h3 className={styles.form_element_title}>
                    <Image src={QMark} alt="" /> Question Type
                  </h3>
                  <Select.Root
                    onValueChange={(e) => {
                      setCurrentQuestion({
                        ...currentQuestion,
                        type: e as 'mc' | 'tf',
                        options:
                          e === 'mc'
                            ? [
                                {
                                  number: 1,
                                  text: '',
                                },
                                {
                                  number: 2,
                                  text: '',
                                },
                              ]
                            : [
                                {
                                  number: 1,
                                  text: 'True',
                                },
                                {
                                  number: 2,
                                  text: 'False',
                                },
                              ],
                      });
                    }}
                    value={currentQuestion.type}
                  >
                    <Select.Trigger className="SelectTrigger" aria-label="Type">
                      <Select.Value placeholder="Select question type" />
                      <Select.Icon className="SelectIcon">
                        <Image src={CDown} alt="" width={12} />
                      </Select.Icon>
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Content className="SelectContent">
                        <Select.Viewport className="SelectViewport">
                          <Select.Group>
                            <SelectItem value="mc">Multiple Choices</SelectItem>
                            <SelectItem value="tf">True - False</SelectItem>
                          </Select.Group>
                        </Select.Viewport>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                </div>
                <div className={styles.form_element_container}>
                  <h3 className={styles.form_element_title}>
                    Enter the question{' '}
                    {/* <span className={styles.counter_text}>
                      {currentQuestion.description.length}/1200 (Optional)
                    </span> */}
                  </h3>
                  {/* <textarea
                    className={styles.form_element_textarea}
                    id="description"
                    placeholder="Enter the question details"
                    value={currentQuestion.description}
                    onChange={(e) =>
                      setCurrentQuestion({
                        ...currentQuestion,
                        description: e.target.value,
                        text: e.target.value,
                      })
                    }
                    maxLength={1200}
                  /> */}
                  <MDXEditor
                    ref={mdRef}
                    markdown={currentQuestion.description}
                    onChange={(e) =>
                      setCurrentQuestion({ ...currentQuestion, description: e, text: e })
                    }
                    plugins={[
                      headingsPlugin(),
                      listsPlugin(),
                      quotePlugin(),
                      thematicBreakPlugin(),
                      markdownShortcutPlugin(),
                      imagePlugin({
                        imageUploadHandler: async (image) => {
                          toast.loading('Uploading image...');
                          const url = await uploadFile(image);
                          toast.remove();
                          if (!url) {
                            toast.error('Error uploading image.');
                            return Promise.reject();
                          }
                          return Promise.resolve(url);
                        },
                        // imageAutocompleteSuggestions: [
                        //   'https://picsum.photos/200/300',
                        //   'https://picsum.photos/200',
                        // ],
                      }),
                      toolbarPlugin({
                        toolbarContents: () => (
                          <>
                            <UndoRedo />
                            <BoldItalicUnderlineToggles />
                            <CodeToggle />
                            <InsertImage />
                          </>
                        ),
                      }),
                    ]}
                  />
                </div>
                <div className={styles.form_element_container_questions}>
                  <h3 className={styles.form_element_title}>
                    Enter the answer options of question and choose correct answer{' '}
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
                      {currentQuestion.options.map((el, i) => {
                        return (
                          <div
                            key={i}
                            className={`RadioGruopContainer ${
                              el.number === currentQuestion.correctAnswer &&
                              'RadioGroupContainer__active'
                            }`}
                          >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <RadioGroup.Item
                                className="RadioGroupItem"
                                value={el.text}
                                checked={el.number === currentQuestion.correctAnswer}
                                onClick={() =>
                                  setCurrentQuestion({
                                    ...currentQuestion,
                                    correctAnswer: el.number,
                                  })
                                }
                              >
                                <RadioGroup.Indicator className="RadioGroupIndicator" />
                              </RadioGroup.Item>
                              <input
                                className="RadioInput"
                                type="text"
                                value={`${currentQuestion.options[i].text}`}
                                placeholder={`Enter answer ${i + 1}`}
                                disabled={currentQuestion.type === 'tf'}
                                onChange={(e) => {
                                  const updatedOptions = [...currentQuestion.options];
                                  updatedOptions[i] = {
                                    number: (i + 1) as 1 | 2 | 3 | 4 | 5,
                                    text: e.target.value,
                                  };
                                  setCurrentQuestion({
                                    ...currentQuestion,
                                    options: updatedOptions,
                                  });
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}

                      {currentQuestion.type === 'mc' && currentQuestion.options.length !== 5 && (
                        <div className={`RadioGruopContainerSecondary`}>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              opacity: 0.25,
                            }}
                          >
                            <RadioGroup.Item
                              className="RadioGroupItem"
                              value={'Answer'}
                              checked={false}
                              disabled
                            >
                              <RadioGroup.Indicator className="RadioGroupIndicator" />
                            </RadioGroup.Item>
                            <input
                              className="RadioInput"
                              type="text"
                              value={`Answer`}
                              placeholder={`Enter answer`}
                              disabled
                            />
                          </div>
                          <Image
                            src={PCircle}
                            alt=""
                            className={styles.add_option_image}
                            onClick={() => {
                              setCurrentQuestion({
                                ...currentQuestion,
                                options: [
                                  ...currentQuestion.options,
                                  {
                                    number: (currentQuestion.options.length + 1) as
                                      | 1
                                      | 2
                                      | 3
                                      | 4
                                      | 5,
                                    text: '',
                                  },
                                ],
                              });
                            }}
                          />
                        </div>
                      )}
                    </RadioGroup.Root>
                  </div>
                  <div className={styles.form_element_button_container}>
                    <button
                      className={styles.form_element_button_back}
                      onClick={() => {
                        setCurrentStep('0');
                      }}
                    >
                      Back
                    </button>
                    <button
                      className={styles.form_element_button_create}
                      onClick={() => {
                        const questionsList = [...exam.questions];

                        // Eğer currentQuestion henüz questionsList'e eklenmediyse ekle
                        if (!questionsList[pointer]) {
                          questionsList[pointer] = currentQuestion;
                        }

                        // Yeni soru numarasını hesapla
                        const lastQuestionNumber =
                          questionsList.length > 0
                            ? Math.max(...questionsList.map((q) => q.number))
                            : 0;
                        const newQuestionNumber = lastQuestionNumber + 1;

                        // Yeni soru oluştur
                        const newQuestion = new Question(newQuestionNumber);

                        // Soruları güncelle
                        setPointer(questionsList.length);
                        setCurrentQuestion(newQuestion);
                        dispatch(setExam({ ...exam, questions: questionsList }));
                      }}
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.sidebar_container}>
            <div className={styles.questions_sidebar_container}>
              <h3 className={styles.questions_sidebar_header}>Question List</h3>
              <div className={styles.questions_sidebar_questions_container}>
                {exam.questions.map((el, _i) => {
                  return (
                    <div
                      className={
                        pointer === _i
                          ? styles.question_sidebar_question_item_active
                          : styles.question_sidebar_question_item
                      }
                      key={_i}
                      onClick={() => setPointer(_i)}
                    >
                      <div className={styles.question_sidebar_question_item_inner}>
                        <p className={styles.question_sidebar_question_item_text}>
                          Question {_i + 1}
                        </p>
                        <div className={styles.question_sidebar_question_item_controller_container}>
                          <Image
                            src={Duplicate}
                            alt=""
                            className={styles.question_sidebar_question_item_controller}
                            onClick={() => {
                              const list = [...exam.questions];

                              // Seçili sorunun bir kopyasını oluştur
                              const duplicatedQuestion = JSON.parse(JSON.stringify(list[_i]));

                              // Yeni ID ata
                              duplicatedQuestion.number = list[_i].number + 1;

                              // Çoğaltılan soruyu orijinal sorunun hemen sonrasına ekle
                              list.splice(_i + 1, 0, duplicatedQuestion);

                              // Sonraki soruların ID'lerini bir arttır
                              for (let j = _i + 2; j < list.length; j++) {
                                list[j].number += 1;
                              }

                              // Durumu güncelle
                              dispatch(
                                setExam({
                                  ...exam,
                                  questions: list,
                                })
                              );

                              // İşaretçiyi çoğaltılan soruya ayarla
                              setPointer(_i + 1);
                            }}
                          />
                          {exam.questions.length > 1 && (
                            <Image
                              src={Trash}
                              alt=""
                              className={styles.question_sidebar_question_item_controller}
                              onClick={() => {
                                const list = [...exam.questions];
                                list.splice(_i, 1);
                                dispatch(
                                  setExam({
                                    ...exam,
                                    questions: list,
                                  })
                                );
                                if (_i > 0) {
                                  setPointer(_i - 1); // Move to the previous question if possible
                                } else {
                                  setPointer(0); // Stay at the first question
                                }
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              className={styles.create_button_container}
              onClick={() => {
                if (isPending) return;

                if (exam.questions.length <= 1) {
                  toast.error('You need to create at least 2 questions to create a quiz.');
                  return;
                }

                for (let i = 0; i < exam.questions.length; i++) {
                  const question = exam.questions[i];

                  if (!question.text || question.text.trim() === '') {
                    toast.error(`Please fill in the text for question ${i + 1}.`);
                    return;
                  }

                  if (question.type === 'mc') {
                    const emptyOptions = question.options.filter(
                      (option) => !option.text || option.text.trim() === ''
                    );
                    if (emptyOptions.length > 0) {
                      toast.error(`Please fill all options for question ${i + 1}.`);
                      return;
                    }
                  }

                  if (!question.correctAnswer) {
                    toast.error(`Please select the correct answer for question ${i + 1}.`);
                    return;
                  }
                }

                saveExam(exam);
              }}
            >
              <p className={styles.create_button_text}>{isPending ? 'Loading' : 'Create Quiz'}</p>
            </div>
          </div>
        </div>
      )}
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
        className={classnames('SelectItem', className)}
        disabled={disabled}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="SelectItemIndicator" />
      </Select.Item>
    );
  }
);

SelectItem.displayName = 'SelectItem';

export default CreateExam;
