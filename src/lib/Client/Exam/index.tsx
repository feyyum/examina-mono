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

export { getExamList, createExam };
