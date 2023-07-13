import './App.css';

import React, { useEffect, useState} from 'react'
import loadModule from './jigraph'

import { Graph } from "react-d3-graph";

function App() {
  const [data, setData] = useState({
        nodes: [],
        links: [],
      });
  
  // the graph configuration, just override the ones you need
  const myConfig = {
    nodeHighlightBehavior: true,
    node: {
      color: "lightgreen",
      size: 100,
      highlightStrokeColor: "yellow",
      strokeColor: "yellow",
      fontColor: "white",
      fontSize: 12,
      highlightFontSize: 12
    },
    link: {
      highlightColor: "lightblue",
    },
  };
  
  const onClickNode = function(nodeId) {
  };
  
  const onClickLink = function(source, target) {
  };

  useEffect(() => {
    const worker = new Worker('worker.js');
    worker.postMessage({});

    loadModule({ locateFile: () => require('./jigraph.wasm')}).then((igraph) => {      
      // create empty graph
      const g = new igraph.graph();
      igraph.empty(g, 10, false);

      const edges = [0, 1, 1, 2, 2, 3, 2, 2];

      const v = new igraph.intVector(edges);

      // create graph from edges
      igraph.create(g, v, 10, false);

      // create ring graph
      const ringSize = 15;
      //igraph.ring(g, ringSize, true, false, true);

      //igraph.famous(g, "Noperfectmatching");
      
      igraph.famous(g, "Zachary");

      // create empty int vector - initialize it
      const e = new igraph.intVector([]);

      // get edge list from graph
      igraph.edgelist(g, e, false);

      const edgelist = e.begin
      
      const graphData = {
        nodes: [],
        links: []
      };

      for (let i = 0; i < g.n; ++i) {
        graphData.nodes.push({ id: i });
      }

      for (let i = 0; i < edgelist.length / 2; ++i) {
        graphData.links.push({ source: edgelist[i*2], target: edgelist[i*2+1] });
      }

      setData(graphData);

      // igraph.destroy(g);
      // g.delete();
    })

  }, [])

  return (
    <div className='graph-container'>
      <Graph
      id='graph-id'
      data={data}
      config={myConfig}
      onClickNode={onClickNode}
      onClickLink={onClickLink}
      />
    </div>
  );
}

export default App;
