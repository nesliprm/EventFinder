<h1>EventFinder</h1>

<p><strong>A lightweight React + Chakra UI app</strong> to browse and manage events: search, filter by category (including “Uncategorized”), view details, and add/edit/delete entries. Data is fetched from a simple JSON REST API.</p>

<h2>Stack</h2>
<ul>
  <li><strong>React 18</strong> (Vite)</li>
  <li><strong>Chakra UI</strong> &amp; <strong>@chakra-ui/icons</strong></li>
  <li><strong>Emotion</strong> (styled &amp; react)</li>
  <li><strong>React Router v6</strong></li>
  <li><strong>Framer Motion</strong> (dependency)</li>
  <li>JSON REST API at <code>http://localhost:3000</code> (<code>/events</code>, <code>/categories</code>, <code>/users</code>)</li>
</ul>

<h2>Features</h2>
<ul>
  <li><strong>Events list</strong> with:
    <ul>
      <li>Category filter (includes <em>Uncategorized</em>)</li>
      <li>Text search on title</li>
      <li>Responsive card layout with optional images</li>
    </ul>
  </li>
  <li><strong>Add new event</strong> (modal form)
    <ul>
      <li>Fields: title, createdBy (string or user id), description, start/end time, categories</li>
      <li>Persists via <code>POST</code> to <code>/events</code></li>
    </ul>
  </li>
  <li><strong>Event detail page</strong>
    <ul>
      <li>Creator info: resolves user when <code>createdBy</code> is a number; uses string otherwise</li>
      <li>Edit event (modal) → <code>PUT</code> to <code>/events/:id</code></li>
      <li>Delete with confirm dialog → <code>DELETE</code> to <code>/events/:id</code></li>
      <li>Formatted start/end times and category names</li>
    </ul>
  </li>
  <li><strong>Layout &amp; UI</strong>
    <ul>
      <li>Header with hero image; navigation with search (context-based); footer</li>
      <li>Chakra components throughout</li>
      <li>“Scroll to top” button</li>
    </ul>
  </li>
</ul>
