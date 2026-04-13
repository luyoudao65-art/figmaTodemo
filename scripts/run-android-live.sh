#!/bin/zsh

set -euo pipefail

ANDROID_SDK_CANDIDATES=(
  "${ANDROID_SDK_ROOT:-}"
  "${ANDROID_HOME:-}"
  "/usr/local/share/android-commandlinetools"
  "$HOME/Library/Android/sdk"
)

JAVA_HOME_CANDIDATES=(
  "${JAVA_HOME:-}"
  "/usr/local/opt/openjdk@21"
  "/usr/local/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home"
  "/opt/homebrew/opt/openjdk@21"
  "/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home"
  "/usr/local/opt/openjdk@17"
  "/usr/local/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home"
  "/opt/homebrew/opt/openjdk@17"
  "/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home"
)

for sdk_path in "${ANDROID_SDK_CANDIDATES[@]}"; do
  if [[ -n "$sdk_path" && -d "$sdk_path" ]]; then
    export ANDROID_SDK_ROOT="$sdk_path"
    export ANDROID_HOME="$sdk_path"
    break
  fi
done

for java_path in "${JAVA_HOME_CANDIDATES[@]}"; do
  if [[ -n "$java_path" && -x "$java_path/bin/java" ]]; then
    export JAVA_HOME="$java_path"
    export PATH="$JAVA_HOME/bin:$PATH"
    break
  fi
done

find_host_ip() {
  local candidate=""

  for iface in en0 en1 en2; do
    candidate="$(ipconfig getifaddr "$iface" 2>/dev/null || true)"
    if [[ -n "$candidate" ]]; then
      echo "$candidate"
      return 0
    fi
  done

  candidate="$(ifconfig | awk '/inet / && $2 != "127.0.0.1" { print $2; exit }' || true)"
  if [[ -n "$candidate" ]]; then
    echo "$candidate"
    return 0
  fi

  return 1
}

HOST_IP="${CAP_LIVE_HOST:-$(find_host_ip || true)}"
PORT="${CAP_LIVE_PORT:-5173}"

if [[ -z "$HOST_IP" ]]; then
  echo "Could not detect a LAN IP address automatically."
  echo "Run with CAP_LIVE_HOST=<your-laptop-ip> npm run android:live"
  exit 1
fi

if [[ -z "${ANDROID_SDK_ROOT:-}" ]]; then
  echo "Could not detect an Android SDK installation."
  echo "Set ANDROID_SDK_ROOT or ANDROID_HOME and retry."
  exit 1
fi

if [[ -z "${JAVA_HOME:-}" ]]; then
  echo "Could not detect a Java installation."
  echo "Set JAVA_HOME to a Java 17 installation and retry."
  exit 1
fi

echo "Starting Android live reload against http://${HOST_IP}:${PORT}"
npx cap run android -l --host "$HOST_IP" --port "$PORT" --forwardPorts "${PORT}:${PORT}"
