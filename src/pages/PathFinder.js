import React, { useEffect, useState } from "react";

import Node from "../components/Node";

import { makeStyles, Button } from "@material-ui/core";
import clsx from 'clsx';

import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra';

const useStyles = makeStyles({
  grid: {
    margin: "100px 0 0 0",
  },
  node: {
    width: "25px",
    height: "25px",
    outline: "1px solid rgb(175, 216, 248)",
    display: "inline-block",
  },
  testVisited: {
    backgroundColor: "red",
  },
  testPath: {
    width: "25px",
    height: "25px",
    outline: "1px solid rgb(175, 216, 248)",
    display: "inline-block",
    backgroundColor: "yellow",
  },
  nodeVisited: {
    animationName: "visitedAnimation",
    animationDuration: "1.5s",
    animationTimingFunction: "ease-out",
    animationDelay: "0",
    animationDirection: "alternate",
    animationIterationCount: "1",
    animationFillMode: "forwards",
    animationPlayState: "running",
  },
  "@keyframes visitedAnimation": {
    "0%": {
      transform: "scale(0.3)",
      backgroundColor: "rgba(0, 0, 66, 0.75)",
      borderRadius: "100%",
    },

    "50%": {
      backgroundColor: "rgba(17, 104, 217, 0.75)",
    },

    "75%": {
      transform: "scale(1.2)",
      backgroundColor: "rgba(0, 217, 159, 0.75)",
    },
    "100%": {
      transform: "scale(1)",
      backgroundColor: "rgba(0, 190, 218, 0.75)",
    },
  },
  nodeShortestPath: {
    width: "25px",
    height: "25px",
    outline: "1px solid rgb(175, 216, 248)",
    display: "inline-block",
    animationName: "shortestPath",
    animationDuration: "1.5s",
    animationTimingFunction: "ease-out",
    animationDelay: "0",
    animationDirection: "alternate",
    animationIterationCount: "1",
    animationFillMode: "forwards",
    animationPlayState: "running",
  },
  "@keyframes shortestPath": {
    "0%": {
      transform: "scale(0.6)",
      backgroundColor: "rgb(255, 254, 106)",
    },

    "50%": {
      transform: "scale(1.2)",
      backgroundColor: "rgb(255, 254, 106)",
    },

    "100%": {
      transform: "scale(1)",
      backgroundColor: "rgb(255, 254, 106)",
    },
  },
});

const START_NODE_ROW = 9;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 9;
const FINISH_NODE_COL = 35;

const createNode = (row, col) => {
  return {
    row: row,
    col: col,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

export default function PathFinder() {
  const [grid, setGrid] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    // create grid
    var cells = [];
    for (let row = 0; row < 20; row++) {
      var currentRow = [];
      for (let col = 0; col < 50; col++) {
        var node = createNode(row, col);
        currentRow.push(node);
      }
      cells.push(currentRow);
    }

    console.log(cells);

    setGrid(cells);
  }, []);

  const handleDijkstra = () => {
    // create pointers as shortcut
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    console.log(visitedNodesInOrder);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    
    // render animation
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
              const node = nodesInShortestPathOrder[i];
              console.log(node.row, node.col);
              document.getElementById(
                `node-${node.row}-${node.col}`
              ).className = classes.testPath;
            }, 50 * i);
          }
        }, 10 * i);
        break;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          clsx(classes.node, classes.testVisited);
      }, 10 * i);
    }
  }

  return (
    <div>
      <h1>Path finder</h1>
      <Button onClick={handleDijkstra}>Dijkstra</Button>
      <div className={classes.grid}>
        {grid.map((row, rowIndex) => {
          return (
            <div key={rowIndex}>
              {row.map((node, nodeIndex) => {
                const { row, col, isStart, isFinish } = node;
                return (
                  <Node
                    key={nodeIndex}
                    row={row}
                    col={col}
                    isStart={isStart}
                    isFinish={isFinish}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}




