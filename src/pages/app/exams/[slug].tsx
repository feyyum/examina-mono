import styles from '@/styles/app/exams/ExamScreen.module.css';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

// Types
import Question from '@/lib/Question';
import { ExamState } from '../../../../features/client/exam';

// Custom Layout
import Layout from './layout';

// Import Icons
import Clock from '@/icons/clock_red.svg';

// Radix Primitives
import * as RadioGroup from '@radix-ui/react-radio-group';

// API
import { getExamQuestions } from '@/lib/Client/Exam';
import Link from 'next/link';

const exam: ExamState = {
  id: 'id',
  title: 'Exam Title Example',
  description: 'Description',
  startDate: new Date(),
  duration: '120',
  questions: [
    {
      number: 1,
      text: 'Soru',
      description: 'Açıklama',
      correctAnswer: 1,
      options: [
        {
          number: 1,
          text: 'Cevap 1',
        },
        {
          number: 2,
          text: 'Cevap 2',
        },
        {
          number: 3,
          text: 'Cevap 3',
        },
        {
          number: 4,
          text: 'Cevap 4',
        },
        {
          number: 5,
          text: 'Cevap 5',
        },
      ],
    },
    {
      number: 2,
      text: 'Soru',
      description: 'Açıklama',
      correctAnswer: 1,
      options: [
        {
          number: 1,
          text: 'Cevap 1',
        },
        {
          number: 2,
          text: 'Cevap 2',
        },
        {
          number: 3,
          text: 'Cevap 3',
        },
        {
          number: 4,
          text: 'Cevap 4',
        },
        {
          number: 5,
          text: 'Cevap 5',
        },
      ],
    },
    {
      number: 3,
      text: 'Soru',
      description: 'Açıklama',
      correctAnswer: 1,
      options: [
        {
          number: 1,
          text: 'Cevap 1',
        },
        {
          number: 2,
          text: 'Cevap 2',
        },
        {
          number: 3,
          text: 'Cevap 3',
        },
        {
          number: 4,
          text: 'Cevap 4',
        },
        {
          number: 5,
          text: 'Cevap 5',
        },
      ],
    },
    {
      number: 4,
      text: 'Soru',
      description: 'Açıklama',
      correctAnswer: 1,
      options: [
        {
          number: 1,
          text: 'Cevap 1',
        },
        {
          number: 2,
          text: 'Cevap 2',
        },
        {
          number: 3,
          text: 'Cevap 3',
        },
        {
          number: 4,
          text: 'Cevap 4',
        },
        {
          number: 5,
          text: 'Cevap 5',
        },
      ],
    },
    {
      number: 5,
      text: 'Soru',
      description: 'Açıklama',
      correctAnswer: 1,
      options: [
        {
          number: 1,
          text: 'Cevap 1',
        },
        {
          number: 2,
          text: 'Cevap 2',
        },
        {
          number: 3,
          text: 'Cevap 3',
        },
        {
          number: 4,
          text: 'Cevap 4',
        },
        {
          number: 5,
          text: 'Cevap 5',
        },
      ],
    },
    {
      number: 6,
      text: 'Soru',
      description: 'Açıklama',
      correctAnswer: 1,
      options: [
        {
          number: 1,
          text: 'Cevap 1',
        },
        {
          number: 2,
          text: 'Cevap 2',
        },
        {
          number: 3,
          text: 'Cevap 3',
        },
        {
          number: 4,
          text: 'Cevap 4',
        },
        {
          number: 5,
          text: 'Cevap 5',
        },
      ],
    },
    {
      number: 7,
      text: 'Soru',
      description: 'Açıklama',
      correctAnswer: 1,
      options: [
        {
          number: 1,
          text: 'Cevap 1',
        },
        {
          number: 2,
          text: 'Cevap 2',
        },
        {
          number: 3,
          text: 'Cevap 3',
        },
        {
          number: 4,
          text: 'Cevap 4',
        },
        {
          number: 5,
          text: 'Cevap 5',
        },
      ],
    },
    {
      number: 8,
      text: 'Soru',
      description: 'Açıklama',
      correctAnswer: 1,
      options: [
        {
          number: 1,
          text: 'Cevap 1',
        },
        {
          number: 2,
          text: 'Cevap 2',
        },
        {
          number: 3,
          text: 'Cevap 3',
        },
        {
          number: 4,
          text: 'Cevap 4',
        },
        {
          number: 5,
          text: 'Cevap 5',
        },
      ],
    },
    {
      number: 9,
      text: 'Soru',
      description: 'Açıklama',
      correctAnswer: 1,
      options: [
        {
          number: 1,
          text: 'Cevap 1',
        },
        {
          number: 2,
          text: 'Cevap 2',
        },
        {
          number: 3,
          text: 'Cevap 3',
        },
        {
          number: 4,
          text: 'Cevap 4',
        },
        {
          number: 5,
          text: 'Cevap 5',
        },
      ],
    },
    {
      number: 10,
      text: 'Soru',
      description: 'Açıklama',
      correctAnswer: 1,
      options: [
        {
          number: 1,
          text: 'Cevap 1',
        },
        {
          number: 2,
          text: 'Cevap 2',
        },
        {
          number: 3,
          text: 'Cevap 3',
        },
        {
          number: 4,
          text: 'Cevap 4',
        },
        {
          number: 5,
          text: 'Cevap 5',
        },
      ],
    },
  ],
};

type CurrentQuestion = Question | undefined;
type Answer = 0 | 1 | 2 | 3 | 4 | 5;
type Choices = Answer[];

function ExamDetails() {
  const router = useRouter();
  const examID: string = router.query.slug as string;

  const [currentQuestion, setCurrentQuestion] = useState<CurrentQuestion>(exam.questions[0]);
  const [choices, setChoices] = useState<Choices>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['exams'],
    queryFn: () => {
      getExamQuestions(examID);
    },
    refetchOnWindowFocus: false,
    enabled: !!examID,
  });

  console.log('DATA', data);
  console.log('ISLOADING', isLoading);
  console.log('ISERROR', isError);

  if (!isLoading || isError) {
    return (
      <Layout>
        <div className={styles.container}>
          <div className={styles.exam_header_container}>
            <div className={styles.exam_header_container}>
              <h1 className={styles.exam_header_title}>
                An error occured when fetching questions &#128534;
              </h1>
            </div>
          </div>
          <p className={styles.error_description}>
            Sorry, we couldn't process your request at the moment. This may be due to several
            reasons: the exam session may have ended, you may not have the necessary authorization
            to access the exam, or you may not have logged into the application. Please check your
            credentials and try again later. If the issue persists, please contact support for
            assistance. We apologize for any inconvenience this may have caused.
          </p>
          <div className={styles.error_func_container}>
            <p onClick={() => router.reload()}>Try again</p>
            <Link href="/" prefetch={false} replace>
              Go to homepage
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.exam_header_container}>
          <h1 className={styles.exam_header_title}>Exam Title</h1>
          <div className={styles.timer_container}>
            <Image src={Clock} alt="" />
            <p className={styles.timer_content}>22:05</p>
          </div>
        </div>
        <div className={styles.content_container}>
          <div className={styles.preview_container}>
            <div className={styles.preview_question_container}>
              <div className={styles.question_container}>
                <p className={styles.question_describe}>{currentQuestion?.description}</p>
                <p className={styles.question_title}>{currentQuestion?.text}</p>
              </div>
              <div className={styles.answers_container}>
                <RadioGroup.Root
                  className="RadioGroupRoot"
                  defaultValue="default"
                  aria-label="View density"
                >
                  {currentQuestion &&
                    currentQuestion.options.map((el, i) => {
                      return (
                        <div
                          key={i}
                          className={`RadioGruopContainer ${
                            el.number === choices[currentQuestion.number - 1] &&
                            'RadioGroupContainer__active'
                          } RadioGruopContainerPreview`}
                        >
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <RadioGroup.Item
                              className="RadioGroupItem"
                              value={el.text}
                              checked={
                                currentQuestion.options[i].number ===
                                choices[currentQuestion.number - 1]
                              }
                              onClick={() => {
                                const newChoices = [...choices];
                                newChoices[currentQuestion.number - 1] = el.number;
                                setChoices(newChoices);
                              }}
                            >
                              <RadioGroup.Indicator className="RadioGroupIndicator" />
                            </RadioGroup.Item>
                            <p className="RadioText">{el.text}</p>
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
                        el.number === currentQuestion?.number && styles.selector_box_active
                      }`}
                      onClick={() => setCurrentQuestion(el)}
                    >
                      <p
                        className={`${styles.selector_box_text} ${
                          el.number === currentQuestion?.number && styles.selector_box_text_active
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
          <div className={styles.form_element_button_container}>
            <button
              className={styles.form_element_button}
              onClick={() => {
                // setCurrentStep("2");
                // saveExam(exam);
              }}
            >
              {'Save and Finish'}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ExamDetails;
