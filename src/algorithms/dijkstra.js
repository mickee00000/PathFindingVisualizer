function dijkshtra(grid, startNode, finishNode){
    const visitedNodesInOrder = []; // Array to be Returned..
    startNode.distance = 0;
    const unvisiteNodes = twoD_array_to_oneD(grid);

    while(!!unvisiteNodes.length){
        sortNodesByDistance(unvisiteNodes);
        const closestNode = unvisiteNodes.shift();
        if (closestNode.isWall){
            continue;
        }
        if (closestNode.distance === Infinity){
            return visitedNodesInOrder;
        }

        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);

        if (closestNode === finishNode){
            return visitedNodesInOrder;
        }

        updateUnvisitedNeighbour(closestNode, grid);
    }
}

function updateUnvisitedNeighbour(node, grid){
    const unvisitedNeighbors = findUnvisitedNeighbours(node, grid);
    for (const neighbour in unvisitedNeighbors){
        neighbour.distance = node.distance + 1;
        neighbour.previousNode = node;
    }
}

function findUnvisitedNeighbours(node, grid){
    const neighbours = [];
    const {row, col} = node

    if (row > 0)
        neighbours.push(grid[row - 1][col])  // Upper neighbour

    if (row < grid.length - 1)
        neighbours.push(grid[row + 1][col])  // Bottom neighbour

    if (col > 0)
        neighbours.push(grid[row][col - 1])  // Left Neighbour

    if (col < grid[0].length - 1)
        neighbours.push(grid[row][col + 1])  // Right Neighbour

    return neighbours.filter(neighbour => !neighbour.isVisited);

}

function twoD_array_to_oneD(grid){
    const nodes = [];
    for (const row of grid){
        for (const node of row){
            nodes.push(node)
        }
    }
return nodes;
}

function sortNodesByDistance(unvisitedNodes){
    unvisitedNodes.sort((a, b) => a.distance - b.distance)
}

