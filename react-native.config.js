const project = (() => {
  const path = require("path");
  try {
    const { androidManifestPath } = require("react-native-test-app");
    return {
      android: {
        sourceDir: path.join('example', 'android'),
        manifestPath: androidManifestPath(
          path.join(__dirname, 'example', 'android'),
        ),
      },
      ios: {
        sourceDir: path.join('example', 'ios')
      }
    }
  } catch (_) {
    return undefined;
  }
})();

module.exports = {
  ...(project ? { project } : undefined),
  dependencies: {
    // Help rn-cli find and autolink this library
    '@remitly/react-native-remitly-cesdk': {
      root: __dirname,
    },
  }
};
