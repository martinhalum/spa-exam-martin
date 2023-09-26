module.exports = {
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.svelte$": "svelte-jester",
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
  },
  moduleFileExtensions: ["svelte", "js"],
  testEnvironment: "jsdom",
  // setupFilesAfterEnv: [
  //   "<rootDir>/node_modules/@testing-library/jest-dom/extend-expect",
  // ],
};
