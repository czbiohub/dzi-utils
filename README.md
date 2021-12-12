# dzi-utils

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)

Utilities for converting images to the DeepZoom format.

<!-- toc -->
* [dzi-utils](#dzi-utils)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g @czbiohub/dzi-utils
$ dzi-utils COMMAND
running command...
$ dzi-utils (-v|--version|version)
@czbiohub/dzi-utils/0.1.6 darwin-x64 node-v14.17.3
$ dzi-utils --help [COMMAND]
USAGE
  $ dzi-utils COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`dzi-utils help [COMMAND]`](#dzi-utils-help-command)
* [`dzi-utils list JSONFILE OUT`](#dzi-utils-list-jsonfile-out)
* [`dzi-utils multi FOLDER OUT`](#dzi-utils-multi-folder-out)
* [`dzi-utils multidir FOLDER OUT`](#dzi-utils-multidir-folder-out)
* [`dzi-utils portal FOLDER PREFIXURL OUT`](#dzi-utils-portal-folder-prefixurl-out)
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

## `dzi-utils list JSONFILE OUT`

export a csv with a list of dzi file names, from a json exported from the "mutli" command

```
USAGE
  $ dzi-utils list JSONFILE OUT

ARGUMENTS
  JSONFILE  json file
  OUT       output path (.csv file)

EXAMPLE
  $ dzi-utils list test.json out.csv
```

_See code: [src/commands/list.ts](https://github.com/czbiohub/dzi-utils/blob/v0.1.6/src/commands/list.ts)_

## `dzi-utils multi FOLDER OUT`

convert multiple images in a folder to dzi

```
USAGE
  $ dzi-utils multi FOLDER OUT

ARGUMENTS
  FOLDER  input folder of images
  OUT     output path (.dzi files with folders corresponding to them)

EXAMPLE
  $ dzi-utils multi test_folder test_out_folder
```

_See code: [src/commands/multi.ts](https://github.com/czbiohub/dzi-utils/blob/v0.1.6/src/commands/multi.ts)_

## `dzi-utils multidir FOLDER OUT`

run multi command for multiple directories

```
USAGE
  $ dzi-utils multidir FOLDER OUT

ARGUMENTS
  FOLDER  input folder of directories of images
  OUT     output path (folders of .dzi files)

EXAMPLE
  $ dzi-utils multidir test_folder test_out_folder
```

_See code: [src/commands/multidir.ts](https://github.com/czbiohub/dzi-utils/blob/v0.1.6/src/commands/multidir.ts)_

## `dzi-utils portal FOLDER PREFIXURL OUT`

create a .json file for tabula portals. script will run through multiple dzi directories, so input folder has to contain at least one directory of dzi folders.

```
USAGE
  $ dzi-utils portal FOLDER PREFIXURL OUT

ARGUMENTS
  FOLDER     input folder
  PREFIXURL  prefix url
  OUT        output path (.json file)

EXAMPLE
  $ dzi-utils portal input_folder_with_dzi_directories https://example.com/crops/1 out.json
```

_See code: [src/commands/portal.ts](https://github.com/czbiohub/dzi-utils/blob/v0.1.6/src/commands/portal.ts)_

## `dzi-utils single FILE OUT`

convert a single image to dzi

```
USAGE
  $ dzi-utils single FILE OUT

ARGUMENTS
  FILE  input file
  OUT   output path (.dzi file with a folder)

EXAMPLE
  $ dzi-utils single test.tiff test_out_folder
```

_See code: [src/commands/single.ts](https://github.com/czbiohub/dzi-utils/blob/v0.1.6/src/commands/single.ts)_
<!-- commandsstop -->
