export function dijkstra(grid, startNode, finishNode) {
  // check if nodes exist
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }

  // startNode pointer, distance set to 0
  startNode.distance = 0;

  const visitedNodesInOrder = [];
  const unvisitedNodes = getAllNodes(grid);

  // while we still have unvisited nodes
  while(unvisitedNodes.length !== 0) {

    // sort nodes by distance first
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
    
    // take first one
    const closestNode = unvisitedNodes.shift();
    
    // skip walls
    if (closestNode.isWall) continue;

    // if closest node is infinity we can't move anywhere
    // note: first loop only one node has non-infinite distance (start)
    // hence won't trigger on first loop
    if (closestNode.distance === Infinity) return visitedNodesInOrder;

    closestNode.isVisited = true;

    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    
    updateUnvisitedNeighbors(closestNode, grid);
  }
}

const getAllNodes = (grid) => {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
};

// scan around node to neighbors
function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

const updateUnvisitedNeighbors = (node, grid) => {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
};

// after visted all nodes
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}