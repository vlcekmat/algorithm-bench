# Algorithm Bench

A scratchpad for wrapping your head around algorithms while you code. Drag data around, draw on it, and step through algorithms one frame at a time with live pseudocode and state.

- **Array**: bubble, insertion, selection, quick and merge sort, binary search, two pointers. Drag bars to change values or reorder them.
- **Graph**: click to add nodes, Shift-drag or use Connect to add edges, double-click to edit labels and weights. BFS, DFS, Dijkstra, Prim, topological sort. Paste an edge list to import.
- **Grid**: paint walls and mud, drag start/end, generate mazes, paste text maps (`#` wall, `~` mud, `S`, `E`). BFS, DFS, Dijkstra, A*, greedy best-first.
- **Your code**: write `run(data, step)` in JavaScript; every `step(msg, pointers, vars)` call becomes a frame, with the current line highlighted.
- **Annotate** (P) draws notes over any view. Space plays, arrow keys step.

Works offline and installs as an app (Chrome/Edge: install icon in the address bar; iPhone: Share → Add to Home Screen; Android: menu → Install app).

No build step: it is plain HTML, CSS and JS. Bump `VERSION` in `sw.js` after changing any file so installed copies pick up the update.
