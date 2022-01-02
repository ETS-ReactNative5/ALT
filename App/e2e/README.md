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

## Running tests

To run tests run the following commands in different terminals

1. `npx react-native start`
2. `detox test --configuraton android`
