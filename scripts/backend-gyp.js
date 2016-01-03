/*
 * Script for building the backend Rust source with the correct V8 headers.
 */

'use strict';

const path = require('path');
const child_process = require('child_process');

const electron =  path.normalize(path.join(__dirname, '..', 'node_modules', '.bin', 'electron'));
const backendDir = path.normalize(path.join(__dirname, '..', 'backend'));

// Get electron version so we can lookup correct headers
const version = child_process.execFileSync(electron, ['-v']);

if (process.argv.length == 0)
{
  throw "Must specify a node-gyp command (and arguments)";
}

const gypCommand = process.argv[0];
const gypArgs = process.argv.slice(1);
const gypEnv = JSON.parse(JSON.stringify(process.env));

// NPM sets npm_config_argv when this script is run by it (ie via npm install), to allow it to be run directly we set it
// here if missing.
if (!gypEnv.npm_config_argv)
{
  gypEnv.npm_config_argv = JSON.stringify({"remain":[],"cooked":["install"],"original":["install"]});
}

process.exit(
  child_process.spawnSync(
    'node-gyp',
    [gypCommand, `--target=${version}`, '--arch=x64', '--dist-url=https://atom.io/download/atom-shell'].concat(gypArgs),
    { stdio: 'inherit', env: gypEnv, cwd: backendDir }
  )
  .status
);
