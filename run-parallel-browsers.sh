#!/bin/bash

BUILD_TIME=$(date +%s)

echo "Starting Chrome parallel group..."
npx cypress run \
  --record \
  --key cffb1feb-17d9-426e-9a06-e80b0c10274c \
  --group 2x-chrome \
  --browser chrome \
  --parallel \
  --ci-build-id "build-${BUILD_TIME}" &

echo "Starting Firefox parallel group..."
npx cypress run \
  --record \
  --key cffb1feb-17d9-426e-9a06-e80b0c10274c \
  --group 2x-firefox \
  --browser firefox \
  --parallel \
  --ci-build-id "build-${BUILD_TIME}" &

echo "Starting Electron parallel group..."
npx cypress run \
  --record \
  --key cffb1feb-17d9-426e-9a06-e80b0c10274c \
  --group 2x-electron \
  --parallel \
  --ci-build-id "build-${BUILD_TIME}" &

wait

echo "All parallel browser tests completed!" 