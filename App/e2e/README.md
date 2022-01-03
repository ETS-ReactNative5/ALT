# Detox

## Setting up environment

1. If you are on windows, open `.detoxrc.json` and replace

        "android": {
        "type": "android.apk",
        "binaryPath": "android/app/build/outputs/apk/debug/app-debug.apk",
        "build": "cd android && ./gradlew :app:assembleDebug :app:assembleAndroidTest -DtestBuildType=debug && cd .."
        }

   with

        "android": {
        "type": "android.apk",
        "binaryPath": "android/app/build/outputs/apk/debug/app-debug.apk",
        "build": "cd android && gradlew :app:assembleDebug :app:assembleAndroidTest -DtestBuildType=debug && cd .."
        }

## Setting up the emulator

1. In your terminal go to `$ANDROID_HOME/cmdline-tools/latest/bin`
2. Upgrade emulator: `./sdkmanager --install emulator`
3. Install an emulator image: `./avdmanager create avd -n Pixel_API_28_AOSP -d pixel --package "system-images;android-28;default;x86_64"`

## Running tests

To run tests run the following commands in different terminals

1. `npx react-native start`
2. `detox test --configuraton android`

## Bugs and Issues

Currently all emulators need to be closed manually at the end after all tests are run
