import RequestBase from '../RequestBase';

import { ExamState } from '../../../../features/client/exam';

function getExamList() {
  return new Promise((resolve, reject) => {
    const requestBase = new RequestBase();
    requestBase
      .get('/exams')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function getExamDetails(examID: string) {
  return new Promise((resolve, reject) => {
    const requestBase = new RequestBase();
    requestBase
      .get(`/exams/${examID}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function getExamQuestions(examID: string) {
  return new Promise((resolve, reject) => {
    const requestBase = new RequestBase();
    requestBase
      .get(`/exams/${examID}/questions`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function createExam(exam: ExamState) {
  return new Promise((resolve, reject) => {
    const requestBase = new RequestBase();
    requestBase
      .post('/exams/create', {
        ...exam,
        duration: parseInt(exam.duration),
        rootHash: '0x0',
        secretKey: 'SIOSDajksa',
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

async function submitAnswers(examID: string, answers: number[], questions: string[]) {
  for (let i = 0; i < answers.length; i++) {
    const requestBase = new RequestBase();
    await requestBase.post(`/exams/${examID}/answer/submit`, {
      answer: {
        selectedOption: answers[i],
        questionId: questions[i],
      },
    });
  }
}

function getScore(examID: string) {
  return new Promise((resolve, reject) => {
    const requestBase = new RequestBase();
    requestBase
      .get(`/exams/scores/get_user_score/${examID}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export { getExamList, createExam, getExamDetails, getExamQuestions, submitAnswers, getScore };
