const keyMap = require('./trackKeyMap');

const parseTrackKey = (key) => {
  const keyData = {
    harmonicKey: key
  };
  if (keyMap.hasOwnProperty(key)) {
    keyData.camelotKey = keyMap[key].camelotKey;
    keyData.altHarmonicKey = keyMap[key].altHarmonicKey;
  }
  return keyData;
};

module.exports = parseTrackKey;
