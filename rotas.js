// JavaScript program to print all
// paths from a source to
// destination.

let v;
let adjList;
let price = 6.596;
// A directed graph using
// adjacency list representation
function Graph(vertices) {
  // initialise vertex count
  v = vertices;

  // initialise adjacency list
  initAdjList();
}

// utility method to initialise
// adjacency list
function initAdjList() {
  adjList = new Array(v);

  for (let i = 0; i < v; i++) {
    adjList[i] = [];
  }
}

// add edge from u to v
function addEdge(u, v, p) {
  // Add v to u's list.
  adjList[u].push({ v, p });
}

// Prints all paths from
// 's' to 'd'
function printAllPaths(s, d) {
  let isVisited = new Array(v);
  for (let i = 0; i < v; i++) isVisited[i] = false;

  let pathList = [];
  let weight = [];

  // add source to path[]
  pathList.push(s);

  // Call recursive utility
  printAllPathsUtil(s, d, isVisited, pathList, weight);
}

// A recursive function to print
// all paths from 'u' to 'd'.
// isVisited[] keeps track of
// vertices in current path.
// localPathList<> stores actual
// vertices in the current path
function printAllPathsUtil(u, d, isVisited, localPathList, weight) {
  if (u == d) {
    total = weight.reduce((acc, curr) => {
      acc += curr;
      return acc;
    }, 0);
    localPathList = localPathList.map((item) => item + 1);

    document.write(
      `Rota que passa pelos vertices: ${localPathList} - custo: ${(
        total * price
      ).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })} <br>`
    );

    // if match found then no need to
    // traverse more till depth
    return;
  }

  // Mark the current node
  isVisited[u] = true;

  // Recur for all the vertices
  // adjacent to current vertex
  for (let i = 0; i < adjList[u].length; i++) {
    if (!isVisited[adjList[u][i].v]) {
      // store current node
      // in path[]

      localPathList.push(adjList[u][i].v);
      weight.push(adjList[u][i].p);

      printAllPathsUtil(adjList[u][i].v, d, isVisited, localPathList, weight);

      // remove current node
      // in path[]
      localPathList.splice(localPathList.indexOf(adjList[u][i].v), 1);
      weight.splice(weight.indexOf(adjList[u][i].p), 1);
    }
  }

  // Mark the current node
  isVisited[u] = false;
}

// Driver program
// Create a sample graph
Graph(5);
addEdge(0, 1, 2);
addEdge(0, 2, 2);
addEdge(1, 3, 1);
addEdge(1, 4, 3);
addEdge(2, 1, 3);
addEdge(2, 4, 1);
addEdge(3, 4, 9);

// arbitrary source
let s = 0;

// arbitrary destination
let d = 4;

document.write(
  `Caminhos de ${s + 1} para ${
    d + 1
  }. O preço atual da gasolina é ${price}<br><br>`
);
printAllPaths(s, d);
