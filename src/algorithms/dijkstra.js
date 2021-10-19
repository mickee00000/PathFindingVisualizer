function dijkshtra(grid, startNode, finishNode){
    const visitedNodesinOrder = []; // Array to be Returned..
    startNode.distance = 0;
    const unvisiteNodes = twoD_array_to_oneD(grid);

    while(!!unvisiteNodes.length){
        sortNodesByDistance(unvisiteNodes);
    }

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
    newNodes.sort((a, b) => a.distance - b.distance)
}

