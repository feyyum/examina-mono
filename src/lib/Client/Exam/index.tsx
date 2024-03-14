import RequestBase from '../RequestBase';

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

export { getExamList };
