import React from "react";
import './PathfinderVisualizer.css';
import Node from './node';
import {dijkshtra, findShortestPath} from "../algorithms/dijkstra";
import {unweightedSearchAlgorithm} from "../algorithms/unweightedSearchAlgorithm";
import {BFS} from "../algorithms/BFS";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class PathfinderVisualizer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
/*            isMousePressed: false,*/

        };
    }

    createNode(row, col){
        return {col, row, isStart: row === START_NODE_ROW && col === START_NODE_COL, isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL, distance: Infinity, isVisited: false, isWall: false, previousNode: null }
    }

    getInitialGrid(){
        const grid = [];
        for (let i=0; i<20; i++){
        const tempRow = [];
            for (let j=0; j<50; j++){
                tempRow.push(this.createNode(i,j))
            }
            grid.push(tempRow);
        }
        return grid;
    }

    componentDidMount() {
        const grid = this.getInitialGrid();
        this.setState({grid});

    }

    visualizeDijkstra(){
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];

        const StoredVisitedNodes = dijkshtra(grid, startNode, finishNode)
        const ShortestPathNodes = findShortestPath(finishNode);

        this.animateDijkstra(StoredVisitedNodes,ShortestPathNodes);
    }

    visualizeBFS(){
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];

        const StoredVisitedNodes = BFS(grid, startNode, finishNode)
        const ShortestPathNodes = findShortestPath(finishNode);

        this.animateDijkstra(StoredVisitedNodes,ShortestPathNodes);
    }

    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder);
                }, 30 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
            }, 30 * i);
        }
    }

    animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path';
            }, 50 * i);
        }
    }

    handleMouseDown(row, col) {
        const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({grid: newGrid, mouseIsPressed: true});
    }

    getNewGridWithWallToggled(grid, row, col){
        const newGrid = grid.slice();
        const node = newGrid[row][col];
        const newNode = {
            ...node,
            isWall: !node.isWall,
        };
        newGrid[row][col] = newNode;
        return newGrid;
    };

    clearBoard(){
        window.location.reload(false);
    }

    render() {
        const {grid} = this.state;
        console.log(grid)

        return (
            <div className="grid">
                {grid.map((row, rowIdx) => {
                        return <div key={rowIdx}>
                            {row.map((node, nodeIdx) =>{
                                const {row, col, isFinish, isStart, isWall} = node;
                                return(
                                    <Node
                                        key={nodeIdx}
                                        col={col}
                                        isFinish={isFinish}
                                        isStart={isStart}
                                        isWall={isWall}
                                        onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                        row={row}/>
                                )
                            })}
                        </div>
                    }
                )}
                <button className="baseBtn" onClick={() => this.visualizeDijkstra()}>Visualize Dijkstra's Algorithm</button>
                <button className="baseBtn" onClick={() => this.visualizeBFS()}>Visualize BFS</button>
                <button className="baseBtn" onClick={() => this.visualizeDFS()}>Visualize DFS</button>
                <button className="baseBtn" onClick={() => this.clearBoard()}>Clear Board</button>

            </div>
        );
    }
}

