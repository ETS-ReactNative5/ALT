const config = require('../.detoxrc.json').configurations['android'];
import detox from 'detox';
import {studentLogin, facultyLogin, createSingleChoiceMCQ, answerSingleChoiceMCQ} from './testFunctions';

describe('singleChoiceMCQ', () => {
  beforeAll(async () => {
    global.studentDevices =[]
    global.noOfStudentDevices = 1
    for (let i = 0; i < global.noOfStudentDevices; i++) {
      global.studentDevices.push(await detox.init(config, {initGlobals: false}));
    }
  });

  beforeEach(async () => {
    await device.uninstallApp();
    await Promise.all([...global.studentDevices].map((dev) => {return dev.device.uninstallApp()}));
    await device.installApp();
    await Promise.all([...global.studentDevices].map((dev) => {return dev.device.installApp()}));
    await device.launchApp();
    await Promise.all([...global.studentDevices].map((dev) => {return dev.device.launchApp()}));
  });

  it('Faculty should start mcq and student should answer it', async () => {
    let loginPromises = []
    loginPromises.push(facultyLogin({expect,element,by,waitFor}));
    for (let i = 0; i < global.noOfStudentDevices; i++) {
      loginPromises.push(studentLogin(global.studentDevices[i],i+1));
    }
    await Promise.all(loginPromises);

    await createSingleChoiceMCQ({expect,element,by,waitFor});
    let quizAnswerPromises = [];
    for (let i = 0; i < global.noOfStudentDevices; i++) {
      quizAnswerPromises.push(answerSingleChoiceMCQ(global.studentDevices[i]));
    }
    await Promise.all(quizAnswerPromises);
    await waitFor(element(by.id('quizResultGraph'))).toBeVisible().withTimeout(2*60*1000);
  });
  
});
