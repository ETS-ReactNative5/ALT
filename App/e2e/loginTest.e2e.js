describe('Login', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.uninstallApp();
    await device.installApp();
    await device.launchApp();
  });

  it('User should be able to login', async () => {
    await expect(element(by.id('loginScreen'))).toBeVisible();
    await element(by.id('loginEmail')).typeText('testaccount@gmail.com');
    await element(by.id('loginScreen')).tap();
    await element(by.id('loginPassword')).typeText('testaccountpassword');
    await element(by.id('loginScreen')).tap();
    await element(by.id('loginButton')).tap();
    console.time('Login');
    await waitFor(element(by.id('dashboard'))).toBeVisible().withTimeout(10000);
    console.timeEnd('Login');
  });
});
