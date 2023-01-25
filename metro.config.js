const path = require('path');

module.exports = {
  projectRoot: path.join(__dirname, 'example'),
  watchFolders: [__dirname],
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};