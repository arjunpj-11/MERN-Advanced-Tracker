export const MOCK_CATEGORIES = [
  { id: 'javascript', icon: '⚡', name: 'JavaScript', topics: ['Closures', 'Event Loop', 'Promises', 'Prototypes', 'this keyword', 'Hoisting', 'Async/Await', 'ES6+', 'DOM', 'Memory Management'] },
  { id: 'typescript', icon: '🔷', name: 'TypeScript', topics: ['Types & Interfaces', 'Generics', 'Utility Types', 'Type Guards', 'Decorators', 'Advanced Types'] },
  { id: 'react', icon: '⚛', name: 'React', topics: ['Hooks', 'Virtual DOM', 'State Management', 'Performance', 'React 18/19', 'Patterns', 'Testing'] },
  { id: 'nextjs', icon: '▲', name: 'Next.js', topics: ['SSR vs SSG', 'ISR', 'App Router', 'Server Components', 'Middleware', 'Rendering Methods'] },
  { id: 'nodejs', icon: '🟢', name: 'Node.js', topics: ['Event Loop', 'Streams', 'Cluster', 'Express Middleware', 'Authentication', 'Performance'] },
  { id: 'mongodb', icon: '🍃', name: 'MongoDB', topics: ['Aggregation', 'Indexing', 'Schema Design', 'Transactions', 'Sharding', 'Mongoose'] },
  { id: 'dsa', icon: '📐', name: 'DSA', topics: ['Arrays & Strings', 'Linked Lists', 'Trees', 'Graphs', 'Dynamic Programming', 'Sorting', 'Binary Search', 'Hashing'] },
  { id: 'mixed', icon: '🎯', name: 'Mixed (All)', topics: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'MongoDB', 'DSA', 'System Design'] },
  { id: 'sql', icon: '🐘', name: 'SQL & PostgreSQL', topics: ['SELECT queries', 'JOINs', 'Aggregations', 'Indexes', 'Transactions', 'Window Functions', 'CTEs', 'ACID'] },
]

export const COMPLETED_TOPICS_CARD = {
  id: 'completed',
  icon: '🏆',
  name: 'Completed Topics Test',
  desc: 'Test your knowledge from topics you have already completed.'
}

export const DIFFICULTIES = [
  { id: 'easy',   label: 'Easy',   desc: 'Basic concepts & definitions' },
  { id: 'medium', label: 'Medium', desc: 'Practical usage & tricky behavior' },
  { id: 'hard',   label: 'Hard',   desc: 'Edge cases & advanced patterns' },
]

export const QUESTION_COUNTS = [5, 10, 15, 20]