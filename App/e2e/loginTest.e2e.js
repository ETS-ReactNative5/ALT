const config = require('../.detoxrc.json').configurations['ios'];
import detox from 'detox';
import {studentLogin, facultyLogin} from './testFunctions';

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
 
    await Promise.all([facultyLogin({expect,element,by,waitFor}), studentLogin(global.studentDevices[0],1)]);

  });
});
