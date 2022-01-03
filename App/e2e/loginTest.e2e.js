const config = require('../.detoxrc.json').configurations['android'];
import detox from 'detox';


describe('Login', () => {
  beforeAll(async () => {
    global.studentDevices =[]
    global.studentDevices.push(await detox.init(config, {initGlobals: false}));
  });

  beforeEach(async () => {
    await device.uninstallApp();
    await Promise.all([...global.studentDevices].map((dev) => {return dev.device.uninstallApp()}));
    await device.installApp();
    await Promise.all([...global.studentDevices].map((dev) => {return dev.device.installApp()}));
    await device.launchApp();
    await Promise.all([...global.studentDevices].map((dev) => {return dev.device.launchApp()}));
  });

  it('One faculty and One student should login', async () => {
    const {expect:studentExpect, element: studentElement, by: studentBy, waitFor: studentWaitFor} = global.studentDevices[0];
    const facultyLogin = async () => {
      await expect(element(by.id('loginScreen'))).toBeVisible();
      await element(by.id('loginEmail')).typeText('testfaculty1@gmail.com');
      await element(by.id('loginScreen')).tap();
      await element(by.id('loginPassword')).typeText('testpassword');
      await element(by.id('loginScreen')).tap();
      await element(by.id('loginButton')).tap();
      return await waitFor(element(by.id('dashboard'))).toBeVisible().withTimeout(10000);
    }

    const studentLogin = async () => {
      await studentExpect(studentElement(studentBy.id('loginScreen'))).toBeVisible();
      await studentElement(studentBy.id('loginEmail')).typeText('teststudent1@gmail.com');
      await studentElement(studentBy.id('loginScreen')).tap();
      await studentElement(studentBy.id('loginPassword')).typeText('testpassword');
      await studentElement(studentBy.id('loginScreen')).tap();
      await studentElement(studentBy.id('loginButton')).tap();
      return await studentWaitFor(studentElement(studentBy.id('dashboard'))).toBeVisible().withTimeout(10000);
    }

    await Promise.all([facultyLogin(), studentLogin()]);

  });
});
