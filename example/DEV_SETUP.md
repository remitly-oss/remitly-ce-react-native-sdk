## Initial setup

All of the CE SDK, Narwhal, and Stargate repos share much in the way of iOS and Android simulation, though they also have their differences. We should strive to share what we learn about getting simulators working and keeping them working.

Running Narwhal's `source setup` command will automatically install `brew`, `nvm`, and `yarn`, all of which we need as well for the CE SDK. Running this command also has the marginal benefit of adding various commands to your `.zshrc` file, such as the following line, which is recommended for making sure `nvm` is available in your terminals:

```
export NVM_DIR="${HOME}/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
```

Also, like them, we recommend using Node version 16. After adding and installing Node 16, make sure to run `nvm alias default 16`, otherwise it may default to another version every time you open up a new terminal.

### iOS on Mac

You will need cocoapods to run the iOS simulator, but you should avoid the `--cask` version which is [deprecated](https://formulae.brew.sh/cask/cocoapods) and avoid the `gems` version that [Narwhal](https://shiny-sniffle-89be26ca.pages.github.io/#/pages/setup/ios-and-android) recommends, at least if you're on a Mac with an M1 chip. Instead, we recommend:

1. Install xcode 13
2. Run `sudo xcodebuild -license accept`
3. Run `brew install cocoapods`

## Local development

When testing changes locally, modify the `@remitly/react-native-remitly-cesdk` path in App.tsx to `../src`, like so:

```
import type { RemittanceApp, NavigationEvent } from "../src";
import { EventTypes, RemittanceUI, logoutRemittanceUI, initializeApp } from "../src";
```

## Troubleshooting

If something is wrong and you can't figure out what, the way to completely refresh the state of modules and caches is to do the following:

First, close all emulators, which have their own caches and may be running code for other repos.

Second, close all terminals. In a fresh terminal, double check that the environment looks good (e.g., check your node version with nvm).

Then run `yarn cache dir` to locate the directory of your yarn cache, delete it, then run `yarn clean:all`.

For iOS in particular, you can nuke pod modules by running the following:

```
rm -rf ~/Library/Developer/Xcode/DerivedData/
pod deintegrate
pod update
```

## Packaging

To create a tarball, instead of running `yarn pack`, run `yarn create-package`.
