const fs = require('fs-extra');
const chalk = require('chalk');
const nodeID3 = require('node-id3');
const parseTrackKey = require('./parseTrackKey');
const CliProgress = require('cli-progress');

const mp3DirPath = './mp3';
const progress = new CliProgress.Bar({}, CliProgress.Presets.shades_classic);

async function readDir() {
  try {
    const files = await fs.readdir(mp3DirPath);
    console.log(chalk.blue(' Files have been read \n'));
    return files;
  } catch (err) {
    console.error(chalk.red(err));
  }
}

readDir().then((files) => {
  progress.start(files.length, 0);
  const output = files.map((file, i) => {
    progress.update(i);
    const fileData = nodeID3.read(`${mp3DirPath}/${file}`);
    console.log('fileData:\n', fileData);
    const metadata = {};
    metadata.title = fileData.title;
    metadata.artist = fileData.artist;
    metadata.key = parseTrackKey(fileData.initialKey);
    metadata.bpm = fileData.bpm;
    return metadata;
  });
  fs.writeFile('data.json', JSON.stringify(output), 'utf8', (err) => {
    if (err) {
      console.error(chalk.red(err));
      throw err;
    }
    progress.stop();
    console.log(chalk.green('\n Process run complete'),chalk.blue('\n\n Output saved to ./data.json\n'));
  });
});
