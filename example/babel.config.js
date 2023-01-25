
const rootPathConfig = {
  rootPathSuffix: "../src",
  rootPathPrefix: "@remitly/react-native-remitly-cesdk/",
};

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [["babel-plugin-root-import", rootPathConfig]]
};
