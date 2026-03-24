export const SIDEBAR_CONFIG = [
  {
    group: 'Overview',
    items: [
      { id: 'overview', path: '/', icon: '◻', label: 'Dashboard' }
    ]
  },
  {
    group: 'JavaScript',
    cat: 'js',
    items: [
      { id: 'js1', path: '/js1', icon: '⚡', label: 'Fundamentals' },
      { id: 'js2', path: '/js2', icon: '⚙', label: 'Core Concepts' },
      { id: 'js3', path: '/js3', icon: '▦', label: 'Objects & Arrays' },
      { id: 'js4', path: '/js4', icon: '🧬', label: 'Advanced JS' },
      { id: 'js5', path: '/js5', icon: '🌐', label: 'DOM & Browser' },
      { id: 'js6', path: '/js6', icon: '🔗', label: 'Async JS' },
      { id: 'js7', path: '/js7', icon: '✦', label: 'ES6+ & Extras' },
      { id: 'js8', path: '/js8', icon: '🔒', label: 'Memory & Security' },
      { id: 'js9', path: '/js9', icon: '🔬', label: 'Deep Internals', isNew: true },
    ]
  },
  {
    group: 'TypeScript',
    cat: 'ts',
    items: [
      { id: 'ts1', path: '/ts1', icon: '🔷', label: 'TS Fundamentals' },
      { id: 'ts2', path: '/ts2', icon: '⚡', label: 'Generics & Advanced' },
      { id: 'ts3', path: '/ts3', icon: '🛠', label: 'Utility Types & OOP' },
      { id: 'ts4', path: '/ts4', icon: '🎨', label: 'Decorators & DI', isNew: true },
    ]
  },
  {
    group: 'React + Redux',
    cat: 'react',
    items: [
      { id: 'react1', path: '/react1', icon: '⚛', label: 'React Core' },
      { id: 'react2', path: '/react2', icon: '🪝', label: 'Hooks & Performance' },
      { id: 'react3', path: '/react3', icon: '🔴', label: 'Redux & State' },
      { id: 'react4', path: '/react4', icon: '🧪', label: 'Testing, Styling & Auth' },
      { id: 'react5', path: '/react5', icon: '🚀', label: 'React 19 & Advanced', isNew: true },
    ]
  },
  {
    group: 'Next.js',
    cat: 'next',
    items: [
      { id: 'next1', path: '/next1', icon: '▲', label: 'Next.js Core' },
      { id: 'next2', path: '/next2', icon: '⚡', label: 'Rendering & Data' },
      { id: 'next3', path: '/next3', icon: '🔧', label: 'Advanced & Real-World' },
      { id: 'next4', path: '/next4', icon: '📄', label: 'Pages Router & Config', isNew: true },
    ]
  },
  {
    group: 'Node.js + Express',
    cat: 'node',
    items: [
      { id: 'node1', path: '/node1', icon: '🟢', label: 'Node Core & Internals' },
      { id: 'node2', path: '/node2', icon: '🔀', label: 'Streams & Child Proc' },
      { id: 'node3', path: '/node3', icon: '🚂', label: 'Express & APIs' },
      { id: 'node4', path: '/node4', icon: '🔐', label: 'Auth, Security & Deploy' },
      { id: 'node5', path: '/node5', icon: '🌐', label: 'WS, GraphQL & Arch' },
      { id: 'node6', path: '/node6', icon: '📡', label: 'HTTP Deep Dive', isNew: true },
    ]
  },
  {
    group: 'MongoDB',
    cat: 'mongo',
    items: [
      { id: 'mongo1', path: '/mongo1', icon: '🍃', label: 'MongoDB Core' },
      { id: 'mongo2', path: '/mongo2', icon: '📊', label: 'Aggregation & Design' },
      { id: 'mongo3', path: '/mongo3', icon: '🔒', label: 'Security, Perf & Real-World' },
      { id: 'mongo4', path: '/mongo4', icon: '🗄', label: 'Advanced MongoDB', isNew: true },
    ]
  },
  {
    group: 'DSA',
    cat: 'dsa',
    items: [
      { id: 'dsa1', path: '/dsa1', icon: '🔢', label: 'Arrays & Strings' },
      { id: 'dsa2', path: '/dsa2', icon: '⛓', label: 'Linked List & Stack' },
      { id: 'dsa3', path: '/dsa3', icon: '🌳', label: 'Trees, Heaps & Graphs' },
      { id: 'dsa6', path: '/dsa6', icon: '🌲', label: 'All Tree Types' },
      { id: 'dsa7', path: '/dsa7', icon: '🕸', label: 'All Graph Types' },
      { id: 'dsa4', path: '/dsa4', icon: '⟁', label: 'Searching & Sorting' },
      { id: 'dsa5', path: '/dsa5', icon: '◈', label: 'DP, Greedy & Patterns' },
      { id: 'dsa8', path: '/dsa8', icon: '🔑', label: 'Hashing & Bit Manip' },
      { id: 'dsa9', path: '/dsa9', icon: '📐', label: 'Advanced DSA Concepts' },
    ]
  },
  {
    group: 'SQL / PostgreSQL',
    cat: 'sql',
    items: [
      { id: 'sql1', path: '/sql1', icon: '🐘', label: 'SQL Fundamentals' },
      { id: 'sql2', path: '/sql2', icon: '🔗', label: 'Joins & Relationships' },
      { id: 'sql3', path: '/sql3', icon: '⚡', label: 'Advanced Queries' },
      { id: 'sql4', path: '/sql4', icon: '📊', label: 'Indexes & Performance' },
      { id: 'sql5', path: '/sql5', icon: '🔐', label: 'Transactions & ACID' },
      { id: 'sql6', path: '/sql6', icon: '🐘', label: 'PostgreSQL Specific', isNew: true },
    ]
  }
]

export const OV_META = SIDEBAR_CONFIG
  .flatMap(g => g.items)
  .filter(i => i.id !== 'overview')
  .map(i => ({ ...i }))