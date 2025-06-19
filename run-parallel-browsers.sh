#!/bin/bash

BUILD_TIME=$(date +%s)

echo "Starting Chrome parallel group..."
npx cypress run \
  --record \
  --parallel \
  --group "Chrome Tests" \
  --browser chrome \
  --ci-build-id "build-${BUILD_TIME}" &

echo "Starting Firefox parallel group..."
npx cypress run \
  --record \
  --parallel \
  --group "Firefox Tests" \
  --browser firefox \
  --ci-build-id "build-${BUILD_TIME}" &

echo "Starting Electron parallel group..."
npx cypress run \
  --record \
  --parallel \
  --group "Electron Tests" \
  --browser electron \
  --ci-build-id "build-${BUILD_TIME}" &

wait

echo "All parallel browser tests completed!" 