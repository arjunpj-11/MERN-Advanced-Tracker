import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import MockTest from './pages/MockTest'

// JS Pages
import JS1 from './pages/tracker/JS1'
import JS2 from './pages/tracker/JS2'
import JS3 from './pages/tracker/JS3'
import JS4 from './pages/tracker/JS4'
import JS5 from './pages/tracker/JS5'
import JS6 from './pages/tracker/JS6'
import JS7 from './pages/tracker/JS7'
import JS8 from './pages/tracker/JS8'
import JS9 from './pages/tracker/JS9'

// TS Pages
import TS1 from './pages/tracker/TS1'
import TS2 from './pages/tracker/TS2'
import TS3 from './pages/tracker/TS3'
import TS4 from './pages/tracker/TS4'

// React Pages
import React1 from './pages/tracker/React1'
import React2 from './pages/tracker/React2'
import React3 from './pages/tracker/React3'
import React4 from './pages/tracker/React4'
import React5 from './pages/tracker/React5'

// Next Pages
import Next1 from './pages/tracker/Next1'
import Next2 from './pages/tracker/Next2'
import Next3 from './pages/tracker/Next3'
import Next4 from './pages/tracker/Next4'

// Node Pages
import Node1 from './pages/tracker/Node1'
import Node2 from './pages/tracker/Node2'
import Node3 from './pages/tracker/Node3'
import Node4 from './pages/tracker/Node4'
import Node5 from './pages/tracker/Node5'
import Node6 from './pages/tracker/Node6'

// Mongo Pages
import Mongo1 from './pages/tracker/Mongo1'
import Mongo2 from './pages/tracker/Mongo2'
import Mongo3 from './pages/tracker/Mongo3'
import Mongo4 from './pages/tracker/Mongo4'

// DSA Pages
import DSA1 from './pages/tracker/DSA1'
import DSA2 from './pages/tracker/DSA2'
import DSA3 from './pages/tracker/DSA3'
import DSA4 from './pages/tracker/DSA4'
import DSA5 from './pages/tracker/DSA5'
import DSA6 from './pages/tracker/DSA6'
import DSA7 from './pages/tracker/DSA7'
import DSA8 from './pages/tracker/DSA8'
import DSA9 from './pages/tracker/DSA9'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="mock-test" element={<MockTest />} />
          <Route path="js1" element={<JS1 />} />
          <Route path="js2" element={<JS2 />} />
          <Route path="js3" element={<JS3 />} />
          <Route path="js4" element={<JS4 />} />
          <Route path="js5" element={<JS5 />} />
          <Route path="js6" element={<JS6 />} />
          <Route path="js7" element={<JS7 />} />
          <Route path="js8" element={<JS8 />} />
          <Route path="js9" element={<JS9 />} />
          <Route path="ts1" element={<TS1 />} />
          <Route path="ts2" element={<TS2 />} />
          <Route path="ts3" element={<TS3 />} />
          <Route path="ts4" element={<TS4 />} />
          <Route path="react1" element={<React1 />} />
          <Route path="react2" element={<React2 />} />
          <Route path="react3" element={<React3 />} />
          <Route path="react4" element={<React4 />} />
          <Route path="react5" element={<React5 />} />
          <Route path="next1" element={<Next1 />} />
          <Route path="next2" element={<Next2 />} />
          <Route path="next3" element={<Next3 />} />
          <Route path="next4" element={<Next4 />} />
          <Route path="node1" element={<Node1 />} />
          <Route path="node2" element={<Node2 />} />
          <Route path="node3" element={<Node3 />} />
          <Route path="node4" element={<Node4 />} />
          <Route path="node5" element={<Node5 />} />
          <Route path="node6" element={<Node6 />} />
          <Route path="mongo1" element={<Mongo1 />} />
          <Route path="mongo2" element={<Mongo2 />} />
          <Route path="mongo3" element={<Mongo3 />} />
          <Route path="mongo4" element={<Mongo4 />} />
          <Route path="dsa1" element={<DSA1 />} />
          <Route path="dsa2" element={<DSA2 />} />
          <Route path="dsa3" element={<DSA3 />} />
          <Route path="dsa4" element={<DSA4 />} />
          <Route path="dsa5" element={<DSA5 />} />
          <Route path="dsa6" element={<DSA6 />} />
          <Route path="dsa7" element={<DSA7 />} />
          <Route path="dsa8" element={<DSA8 />} />
          <Route path="dsa9" element={<DSA9 />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}