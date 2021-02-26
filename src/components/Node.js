import React from 'react'
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles({
  node: {
    width: "25px",
    height: "25px",
    outline: "1px solid rgb(175, 216, 248)",
    display: "inline-block",
  },
  nodeStart: {
    width: "25px",
    height: "25px",
    outline: "1px solid rgb(175, 216, 248)",
    display: "inline-block",
    backgroundColor: "green"
  },
  nodeFinish: {
    width: "25px",
    height: "25px",
    outline: "1px solid rgb(175, 216, 248)",
    display: "inline-block",
    backgroundColor: "red",
  },
});

export default function Node(props) {


  const classes = useStyles();
  const {row, col, isFinish, isStart} = props;

  const classType = () => {
    if (isFinish) {
      return classes.nodeFinish;
    } else if (isStart) {
      return classes.nodeStart;
    } else {
      return classes.node;
    }
  }

  return (
    <div id={`node-${row}-${col}`} className={classType()}>
      
    </div>
  )
}
