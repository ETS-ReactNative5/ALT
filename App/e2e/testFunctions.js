const facultyLogin = async ({expect, element, by, waitFor}) => {
  await expect(element(by.id('loginScreen'))).toBeVisible();
  await element(by.id('loginEmail')).typeText('testfaculty1@gmail.com');
  await element(by.id('loginScreen')).tap();
  await element(by.id('loginPassword')).typeText('testpassword');
  await element(by.id('loginScreen')).tap();
  await element(by.id('loginButton')).tap();
  return await waitFor(element(by.id('dashboard')))
    .toBeVisible()
    .withTimeout(10000);
};

const studentLogin = async ({expect, element, by, waitFor}, studentNo) => {
  await expect(element(by.id('loginScreen'))).toBeVisible();
  await element(by.id('loginEmail')).typeText(
    'teststudent' + studentNo + '@gmail.com',
  );
  await element(by.id('loginScreen')).tap();
  await element(by.id('loginPassword')).typeText('testpassword');
  await element(by.id('loginScreen')).tap();
  await element(by.id('loginButton')).tap();
  return await waitFor(element(by.id('dashboard')))
    .toBeVisible()
    .withTimeout(10000);
};

//Work in progress, need a way to return passcode
const createCourse = async({expect, element, by, waitFor}) => {
  await element(by.id('courseAddButton')).tap();
  await expect(element(by.id('formAddCourse'))).toBeVisible();
  await element(by.id('courseNameInput')).tap();
  await element(by.id('courseNameInput')).typeText('Test Course');
  await element(by.id('courseCodeInput')).tap();
  await element(by.id('courseCodeInput')).typeText('TEST001');
  await element(by.id('roomInput')).tap();
  await element(by.id('roomInput')).typeText('Room 1');
  await element(by.id('createCourseButton')).tap();
  await element(by.id('facultyCourseCard')).tap();
};

const createSingleChoiceMCQ = async({expect, element, by, waitFor}) => {
  await waitFor(element(by.id('courseCard'))).toBeVisible().withTimeout(10000);
  await element(by.id('courseCard')).tap();
  await waitFor(element(by.id('quizScreenButton')).atIndex(0)).toBeVisible().withTimeout(10000);
  await element(by.id('quizScreenButton')).atIndex(0).tap();
  await waitFor(element(by.id('quizFacultyPage'))).toBeVisible().withTimeout(10000);
  try{
    await element(by.id('quizFacultyPage')).swipe('up');
    await element(by.id('startAnotherQuiz')).tap();
  }catch(e){
    console.log(e);
  }
  await element(by.id('optionC')).tap();
  await element(by.id('quizFacultyPage')).swipe('up');
  return await element(by.id('beginButton')).tap();
};


const answerSingleChoiceMCQ = async ({expect, element, by, waitFor}) => {
  await waitFor(element(by.id('courseCard'))).toBeVisible().withTimeout(10000);
  await element(by.id('courseCard')).tap();
  await waitFor(element(by.id('quizScreenButton')).atIndex(0)).toBeVisible().withTimeout(10000);
  await element(by.id('quizScreenButton')).atIndex(0).tap();
  await waitFor(element(by.id('quizStudentPage'))).toBeVisible().withTimeout(10000);
  await element(by.id('optionA')).tap();
  await element(by.id('quizStudentPage')).swipe('up');
  return await element(by.id('submitButton')).tap();
};

export {facultyLogin, studentLogin, createSingleChoiceMCQ, answerSingleChoiceMCQ};
