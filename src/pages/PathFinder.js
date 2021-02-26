import React, { useEffect, useState } from "react";

import Node from "../components/Node";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  grid: {
    margin: "100px 0 0 0",
  },
});

const START_NODE_ROW = 9;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 9;
const FINISH_NODE_COL = 35;

export default function PathFinder() {
  const [grid, setGrid] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    // create grid
    var cells = [];
    for (let row = 0; row < 20; row++) {
      var currentRow = [];
      for (let col = 0; col < 50; col++) {
        var node = { row: row, col: col, isStart: false, isFinish: false };
        currentRow.push(node);
      }
      cells.push(currentRow);
    }

    // insert start and finish nodes
    cells[START_NODE_ROW][START_NODE_COL].isStart = true;
    cells[FINISH_NODE_ROW][FINISH_NODE_COL].isFinish = true;

    console.log(cells[0].length);

    setGrid(cells);
  }, []);

  return (
    <div>
      <h1>Path finder</h1>
      <div className={classes.grid}>
        {grid.map((row, rowIndex) => {
          return (
            <div key={rowIndex}>
              {row.map((node, nodeIndex) => {
                const { row, col, isStart, isFinish} = node;
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
