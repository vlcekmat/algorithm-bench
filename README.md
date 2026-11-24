# Algorithm Bench

A scratchpad for wrapping your head around algorithms while you code. Drag data around, draw on it, and step through algorithms one frame at a time with live pseudocode and state.

- **Array**: bubble, insertion, selection, quick and merge sort, binary search, two pointers. Drag bars to change values or reorder them.
- **Graph**: click to add nodes, Shift-drag or use Connect to add edges, double-click to edit labels and weights. BFS, DFS, Dijkstra, Prim, topological sort. Paste an edge list to import.
- **Grid**: paint walls and mud, drag start/end, generate mazes, paste text maps (`#` wall, `~` mud, `S`, `E`). BFS, DFS, Dijkstra, A*, greedy best-first.
- **Your code**: write `run(data, step)` in JavaScript; every `step(msg, pointers, vars)` call becomes a frame, with the current line highlighted.
- **Sketch**: a paper-style whiteboard. Pen, eraser, boxes, circles, arrows and text, plus arrays, stacks, queues, tables, linked lists, trees, hash tables, variables and pointers you edit by hand. Double-click or just type to change a cell, drag a value onto another cell to swap, drag from a list node's right slot to point it somewhere, and move pointers with the arrow keys. Arrows stay attached when you move things. **Capture step** saves the board so you can replay a hand simulation with the player. Undo, export PNG.
- **UML** (in Sketch): classes and interfaces with attribute/operation compartments, notes, actors, use cases and sequence-diagram lifelines. Arrows can be associations, inheritance, realization, dependency, aggregation, composition or return messages, with a label and multiplicities. Insert *Class example* or *Sequence example* to start from a diagram. Select or hover a class and click **+** to add a field or method; type `name: Type`, press Enter to add the next one; double-click a line to edit it. Arrows between classes default to association.
- **Quick add** (in Sketch): select or hover an array, stack, table or list node and click **+** to append a cell, push, add a row/column or add the next node. Enter keeps adding; Esc stops.
- **Arrows** (in Sketch): hover a shape and drag one of its blue dots to connect it to something. Drag an arrow to move it as a whole without changing its direction; ends dropped on a shape stay pinned to that spot.
- **Guide** (`guide.html`): algorithms with their costs; data structures and when to use each; a problem-solving process, signals-to-pattern table and code templates; design principles and all 22 classic design patterns (linked to Refactoring Guru) plus architecture patterns; popular technologies with "pick it when / pick something else when" for each; an interactive **technology picker** that asks a few questions and recommends a stack; and rules for working with AI without losing code quality. *Try it* and *Draw it* links open the matching view in the bench.
- **Todo** (6): several todo lists. Enter adds the next task, Backspace on an empty one removes it, drag the handle or press Alt + ↑/↓ to reorder, tick tasks off, hide or clear finished ones. The selected list also sits in a collapsible card at the top of the side panel in every other workspace.
- **Theme**: the button next to Guide switches between auto (follows your system), dark and light; the choice is remembered on both pages.
- **Annotate** (P) draws notes over any view. Space plays, arrow keys step.

Works offline and installs as an app (Chrome/Edge: install icon in the address bar; iPhone: Share → Add to Home Screen; Android: menu → Install app).

No build step: it is plain HTML, CSS and JS. Bump `VERSION` in `sw.js` after changing any file so installed copies pick up the update.

## Run it locally

`./algbench.sh` serves this folder on `http://localhost:8765/` and opens it in a Chrome app window (or your default browser). `./algbench.sh stop` stops the server, `./algbench.sh status` shows whether it is running. Set `ALGBENCH_PORT` to use another port.
