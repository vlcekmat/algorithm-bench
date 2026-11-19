#!/bin/zsh
# Run Algorithm Bench locally: serves this folder on localhost and opens it as an app window.
#   algbench          start (if needed) and open
#   algbench stop     stop the local server
#   algbench status   show whether it is running
DIR="${0:A:h}"
PORT="${ALGBENCH_PORT:-8765}"
URL="http://localhost:$PORT/"
LOG="${TMPDIR:-/tmp}/algbench.log"

pid_on_port() { lsof -tiTCP:"$PORT" -sTCP:LISTEN 2>/dev/null | head -1; }

case "$1" in
  stop)
    pid=$(pid_on_port)
    if [[ -n "$pid" ]]; then kill "$pid" && echo "Stopped Algorithm Bench (port $PORT)."; else echo "Algorithm Bench is not running."; fi
    exit 0 ;;
  status)
    pid=$(pid_on_port)
    if [[ -n "$pid" ]]; then echo "Running at $URL (pid $pid)"; else echo "Not running."; fi
    exit 0 ;;
esac

if [[ -z "$(pid_on_port)" ]]; then
  nohup python3 -m http.server "$PORT" --bind 127.0.0.1 --directory "$DIR" >"$LOG" 2>&1 &
  disown
  for i in {1..30}; do [[ -n "$(pid_on_port)" ]] && break; sleep 0.1; done
  if [[ -z "$(pid_on_port)" ]]; then echo "Could not start the server; see $LOG"; exit 1; fi
fi

if [[ -d "/Applications/Google Chrome.app" ]]; then
  open -na "Google Chrome" --args --app="$URL"
else
  open "$URL"
fi
echo "Algorithm Bench is running at $URL  (stop it with: algbench stop)"
