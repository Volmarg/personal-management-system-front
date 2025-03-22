#!/bin/bash

ENV_MODE=$1

# Prints an information block (aka header)
function printInfoBlock() {
  LINES="\n========================================\n";

  printf "$LINES";
  printf "$1"
  printf "$LINES \n";
}

START=$(date +%s) && \
 \
printInfoBlock "Executing VITE build process" && \
npx vite build --mode "${ENV_MODE}" && \
 \
# This allows some browsers to take the gzip version (smaller one)
printInfoBlock "Compressing files" && \
gzip --keep dist/assets/*.js && \
 \
 \
END=$(date +%s) && \
RUNTIME=$(($END- $START)) && \
 \
printInfoBlock "Script was running ${RUNTIME} second/s";
