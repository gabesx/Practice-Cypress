#!/bin/bash

# Set the record key
export CYPRESS_RECORD_KEY=cffb1feb-17d9-426e-9a06-e80b0c10274c

# Generate a unique build ID
BUILD_ID="local-test-$(date +%s)"

echo "Running Cypress tests with Cloud recording..."
echo "Build ID: $BUILD_ID"

# Run tests with recording
npx cypress run \
  --record \
  --browser chrome \
  --group "Local Test Run" \
  --ci-build-id "$BUILD_ID"

echo "Test run completed! Check your Cypress Cloud dashboard." 