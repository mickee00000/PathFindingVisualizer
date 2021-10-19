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
            nodes: [],
        };
    }

    createNode(col, row){
        return {col, row, isStart: row === START_NODE_ROW && col === START_NODE_COL, isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL, distance: Infinity, isVisited: false, isWall: false, previousNode: null }
    }

    getInitialGrid(){
        const grid = [];

    }

    componentDidMount() {


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
                                    <Node key={nodeIdx} isStart={isStart} isFinish={isFinish}/>
                                )
                            })}
                        </div>
                    }
                )}
                <button className="baseBtn">Visualize Dijkstra's Algorithm</button>
                <button className="baseBtn">Clear Board</button>

            </div>
        );
    }
}