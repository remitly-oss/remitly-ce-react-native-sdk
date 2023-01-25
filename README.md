# Connected Experiences SDK for React Native

Remitly Connected Experiences enables businesses to offer cross border money transfers to their customers through a simple and lightweight integration.

## Key Components

`RemitlyCeConfig` is your app's Remittance project configuration. Populate it as follows:

-   `appId: <string>` - required - Unique identifier for your app. Get this from your Remitly contact
-   `languageCode?: <string>` - optional - 2 letter language code. The Remitly UI will render in this language if it is supported. By default it will render in the set device language.
-   `customerEmail?: <string>` - optional - a string containing the customer's email. Used to prepopulate the login/signup form.
-   `defaultSendCountry?: <string>` - optional - 3 letter country code for the default country of origin. Used to prepopulate the signup form.
-   `defaultReceiveCountry?: <string>` - optional - 3 letter country code for the default country a customer wants to send money to. Used to prepopulate the signup form.

`RemitlyCE` is a container for methods for invoking the Remitly UX:

`configure(configuration: RemitlyCeConfig)` Accepts a `RemitlyCeConfig` and must be called prior to presenting the Remitly UX.

`present(props: { transferSubmittedHandler?: () => void; userActivityHandler?: () => void; })` Accepts event callback handler methods, and presents the Remitly UX atop your app in a full-screen modal. `await` this async method to determine when the user has dismissed the Remitly UX.

-   `transferSubmittedHandler` if supplied, will be called when the user submits a transaction to send money

-   `userActivityHandler` if supplied, will be called frequently as the user interacts with the Remitly UX

-   `errorHandler` if supplied, will be called when the user encounters an error

`dismiss(logout: boolean = false)` is an idempotent API to hide any presented Remitly UX and optionally log the user out of Remitly. This must be called (passing `logout: true`) whenever the user logs out of your app.

## Integration Instructions

### 1. Obtain SDK package from your Remitly Contact

You will be provided with a yarn package from your Remitly contact. This pacakge will be a Tarball to install in your project.

### 2. Install in your project

Install in your project with the following command:

```bash
$ yarn add file:<path-to-tarball>/react-native-remitly-cesdk-<version>.tgz
```

#### Gotcha

If using a tarball to install the SDK, your example projects will cache the .tgz. If the name doesnt change, then the cached pacakge will be used instead of the new local version.

`yarn cache clean` will fix this problem.

### 3. Ensure peer dependencies are met

Check package.json for peer dependencies. If any are not met (e.g. react-native-webview), yarn install them.

### 4. Setup RemittanceUI Inputs

#### Initialize your app

```typescript
import React, { useCallback, useEffect } from "react";
import { Button, SafeAreaView } from "react-native";
import { RemitlyCE } from "@remitly/react-native-remitly-cesdk";

export default function ConnectedExperiencesTestHarness() {

    useEffect(() => {
        RemitlyCE.configure({
            appId: "passbook",
            defaultSendCountry: "USA",
            defaultReceiveCountry: "PHL",
        });
    }, [])
```

#### Setup event handlers:

```typescript
const onTransferSubmitted = useCallback(() => {
    console.log("onTransferSubmitted");
}, []);

const onUserActivity = useCallback(() => {
    console.log("onUserActivity");
}, []);

const onError = useCallback((err: RemitlyCeError) => {
    console.log("onError", err);
}, []);
```

### 5. Present the Remitly UX in response to a user interaction

```typescript
const onSendMoney = useCallback(async () => {
    console.log("Presenting Remitly UX");
    await RemitlyCE.present({
        transferSubmittedHandler: onTransferSubmitted,
        userActivityHandler: onUserActivity,
    });
    console.log("Remitly UX dismissed");
}, [onTransferSubmitted, onUserActivity]);

return (
    <SafeAreaView>
        <Button title="Send Money" onPress={onSendMoney} />
    </SafeAreaView>
);
```
