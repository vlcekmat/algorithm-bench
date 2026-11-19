# Algorithm Bench

A scratchpad for wrapping your head around algorithms while you code. Drag data around, draw on it, and step through algorithms one frame at a time with live pseudocode and state.

- **Array**: bubble, insertion, selection, quick and merge sort, binary search, two pointers. Drag bars to change values or reorder them.
- **Graph**: click to add nodes, Shift-drag or use Connect to add edges, double-click to edit labels and weights. BFS, DFS, Dijkstra, Prim, topological sort. Paste an edge list to import.
- **Grid**: paint walls and mud, drag start/end, generate mazes, paste text maps (`#` wall, `~` mud, `S`, `E`). BFS, DFS, Dijkstra, A*, greedy best-first.
- **Your code**: write `run(data, step)` in JavaScript; every `step(msg, pointers, vars)` call becomes a frame, with the current line highlighted.
- **Sketch**: a paper-style whiteboard. Pen, eraser, boxes, circles, arrows and text, plus arrays, stacks, queues, tables, linked lists, trees, hash tables, variables and pointers you edit by hand. Double-click or just type to change a cell, drag a value onto another cell to swap, drag from a list node's right slot to point it somewhere, and move pointers with the arrow keys. Arrows stay attached when you move things. **Capture step** saves the board so you can replay a hand simulation with the player. Undo, export PNG.
- **Annotate** (P) draws notes over any view. Space plays, arrow keys step.

Works offline and installs as an app (Chrome/Edge: install icon in the address bar; iPhone: Share → Add to Home Screen; Android: menu → Install app).

No build step: it is plain HTML, CSS and JS. Bump `VERSION` in `sw.js` after changing any file so installed copies pick up the update.

## Run it locally

`./algbench.sh` serves this folder on `http://localhost:8765/` and opens it in a Chrome app window (or your default browser). `./algbench.sh stop` stops the server, `./algbench.sh status` shows whether it is running. Set `ALGBENCH_PORT` to use another port.
