#!/bin/zsh

set -euo pipefail

export JAVA_HOME="/usr/local/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home"
export PATH="/usr/local/opt/openjdk@21/bin:$PATH"

npm run build
npx cap sync android
cd android
./gradlew assembleDebug
