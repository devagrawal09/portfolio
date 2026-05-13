#!/usr/bin/env bash
set -euo pipefail

REPO="/home/lucifer/work/portfolio"
STATE_DIR="$REPO/.codex-cron"
LOG_DIR="$STATE_DIR/logs"
COUNT_FILE="$STATE_DIR/run-count"
LOCK_FILE="$STATE_DIR/hourly.lock"
PROMPT_FILE="$STATE_DIR/improvement-prompt.md"
MAX_RUNS=12
CRON_TAG="portfolio-codex-hourly-improve"
CODEX_BIN="/home/lucifer/.bun/bin/codex"

export PATH="/home/lucifer/.nvm/versions/node/v24.15.0/bin:/home/lucifer/.bun/bin:/usr/local/bin:/usr/bin:/bin"

mkdir -p "$LOG_DIR"

remove_cron_entry() {
  local tmp
  tmp="$(mktemp)"
  crontab -l 2>/dev/null | grep -v "$CRON_TAG" > "$tmp" || true
  crontab "$tmp"
  rm -f "$tmp"
}

(
  flock -n 9 || exit 0

  count=0
  if [[ -f "$COUNT_FILE" ]]; then
    count="$(cat "$COUNT_FILE")"
  fi

  if (( count >= MAX_RUNS )); then
    remove_cron_entry
    exit 0
  fi

  run_number=$((count + 1))
  timestamp="$(date +"%Y%m%d-%H%M%S")"
  log_file="$LOG_DIR/run-${run_number}-${timestamp}.log"

  {
    echo "[$(date -Is)] Starting scheduled Codex improvement run ${run_number}/${MAX_RUNS}"
    cd "$REPO"
    set +e
    "$CODEX_BIN" exec \
      --cd "$REPO" \
      --sandbox workspace-write \
      --ask-for-approval never \
      < "$PROMPT_FILE"
    status=$?
    set -e
    echo "[$(date -Is)] Codex exited with status $status"
  } > "$log_file" 2>&1

  echo "$run_number" > "$COUNT_FILE"

  if (( run_number >= MAX_RUNS )); then
    remove_cron_entry
  fi
) 9>"$LOCK_FILE"
