const path = require('path');
const fs = require('fs');

const BASE_DIR = path.dirname(__dirname);

const files = {
  start: 'start.txt',
  sacredRules: 'sacred_rules.md',
  tenCommandments: '10_commandments.md',
  phaseRules: path.join(__dirname, 'phase_rules')
};

function getFilePath(name) {
  return path.join(BASE_DIR, files[name]);
}

function readFile(name) {
  const filePath = getFilePath(name);
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, 'utf8');
  }
  return null;
}

function listPhaseRules() {
  const phaseRulesDir = files.phaseRules;
  if (fs.existsSync(phaseRulesDir)) {
    return fs.readdirSync(phaseRulesDir).filter(f => f.endsWith('.md')).sort();
  }
  return [];
}

module.exports = {
  files,
  readFile,
  listPhaseRules,
  getFilePath,
  BASE_DIR
};

console.log('Speed Loop Framework loaded.');
console.log('Available files: start, sacredRules, tenCommandments, phaseRules');
console.log('Use require("speed-loop-framework").readFile("start") to read a file.');
