// jest.config.js
module.exports = {
  testEnvironment: "jsdom", // Հատկապես անհրաժեշտ է React ծրագրերի համար
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"], // Փնտրում է բոլոր .test.js ֆայլերը
  moduleFileExtensions: ["js", "jsx"],
};
