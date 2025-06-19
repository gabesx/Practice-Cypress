#!/bin/bash

# Generate a unique build ID timestamp
BUILD_TIME=$(date +%s)

# Run Chrome tests in parallel
echo "Starting Chrome parallel group..."
npx cypress run \
  --record \
  --key cffb1feb-17d9-426e-9a06-e80b0c10274c \
  --group 2x-chrome \
  --browser chrome \
  --parallel \
  --ci-build-id "build-${BUILD_TIME}" &

# Run Firefox tests in parallel
echo "Starting Firefox parallel group..."
npx cypress run \
  --record \
  --key cffb1feb-17d9-426e-9a06-e80b0c10274c \
  --group 2x-firefox \
  --browser firefox \
  --parallel \
  --ci-build-id "build-${BUILD_TIME}" &

# Run Electron tests in parallel
echo "Starting Electron parallel group..."
npx cypress run \
  --record \
  --key cffb1feb-17d9-426e-9a06-e80b0c10274c \
  --group 2x-electron \
  --parallel \
  --ci-build-id "build-${BUILD_TIME}" &

# Wait for all parallel test runs to complete
wait

echo "All parallel browser tests completed!" 