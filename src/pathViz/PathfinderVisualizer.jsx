import React from "react";
import './PathfinderVisualizer.css';
import Node from './node';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class PathfinderVisualizer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            isMousePressed: false,

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

    }

    render() {
        const {nodes} = this.state;
        console.log(nodes)

        return (
            <div className="grid">
                {nodes.map((row, rowIdx) => {
                        return <div key={rowIdx}>
                            {row.map((node, nodeIdx) =>{
                                const {isStart, isFinish} = node;
                                return(
                                    <Node key={nodeIdx}
                                          isStart={isStart}
                                          isFinish={isFinish}
                                    />
                                )
                            })}
                        </div>
                    }
                )}
                <button className="baseBtn" onClick={() => this.visualizeDijkstra()}>Visualize Dijkstra's Algorithm</button>
                <button className="baseBtn">Clear Board</button>

            </div>
        );
    }
}