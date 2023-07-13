export interface ivectorint {
  begin: Int32Array;
}

export interface igraph {
  n: number,
  directed: boolean,
  from: ivectorint,
  to: ivectorint,
}

export interface IGraph {
  ring: (graph: igraph, n: number, directed: boolean, mutual: boolean, circular: boolean) => number;
  empty: (graph: igraph, n: number, directed: boolean) => number;
  edgelist: (graph: igraph, res: ivectorint, bycol: boolean) => number;
  create: (graph: igraph, edges: ivectorint, n: number, directed: boolean) => number;
  famous: (graph: igraph, name: string) => number;

  _module: EmscriptenModule;
}

export default function loadModule(params: any): Promise<IGraph>;