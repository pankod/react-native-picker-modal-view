module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module-resolver",
        {
          root: [
            "./"
          ],
          alias: {
            "@Components": "./src/Components",
            "@Interfaces": "./src/Interfaces",
            "@Assets": "./src/Assets",
          }
        }
      ]
    ]
  };
};
