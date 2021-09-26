# dzi-utils

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/dzi-utils.svg)](https://npmjs.org/package/dzi-utils)
[![Downloads/week](https://img.shields.io/npm/dw/dzi-utils.svg)](https://npmjs.org/package/dzi-utils)
[![License](https://img.shields.io/npm/l/dzi-utils.svg)](https://github.com/@czbiohub/dzi-utils/blob/master/package.json)

Utilities for converting images to the DeepZoom format.

<!-- toc -->
* [dzi-utils](#dzi-utils)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g dzi-utils
$ dzi-utils COMMAND
running command...
$ dzi-utils (-v|--version|version)
dzi-utils/0.1.0 darwin-x64 node-v14.17.3
$ dzi-utils --help [COMMAND]
USAGE
  $ dzi-utils COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`dzi-utils help [COMMAND]`](#dzi-utils-help-command)
* [`dzi-utils single FILE OUT`](#dzi-utils-single-file-out)

## `dzi-utils help [COMMAND]`

display help for dzi-utils

```
USAGE
  $ dzi-utils help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.3/src/commands/help.ts)_

## `dzi-utils single FILE OUT`

convert a single image to dzi

```
USAGE
  $ dzi-utils single FILE OUT

ARGUMENTS
  FILE  input file
  OUT   output path (.dzi file with a folder)

EXAMPLE
  $ dzi-utils single test.tiff
```

_See code: [src/commands/single.ts](https://github.com/czbiohub/dzi-utils/blob/v0.1.0/src/commands/single.ts)_
<!-- commandsstop -->
