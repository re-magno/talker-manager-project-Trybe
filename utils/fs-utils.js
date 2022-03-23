const fs = require('fs/promises');

async function getTakers() {
  const allTalkers = await fs.readFile('./talker.json', 'utf-8')
    .then((fileContent) => JSON.parse(fileContent));
    return allTalkers;
}

async function getTakerById(id) {
  const allTalkers = await getTakers();
  
  return allTalkers.find((talker) => talker.id === +id);
}

async function setTalkers(newTalker) {
  await fs.writeFile('./talker.json', JSON.stringify(newTalker));
}

module.exports = { getTakers, setTalkers, getTakerById };