#!/bin/bash

# Prints an information block (aka header)
function printInfoBlock() {
  LINES="\n========================================\n";

  printf "$LINES";
  printf "$1"
  printf "$LINES \n";
}

if [ ! -d "./dist" ]; then
  printInfoBlock "This might take a while (1-5 min. - depending on the hardware)...";
  npm run build && printInfoBlock "FINISHED"; # The && is must, else for some reason the printing func breaks.
else
  printInfoBlock "dist folder exists, please remove it first, then call this command again - cancelling";
fi;
