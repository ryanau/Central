import React from 'react';
import { Cell } from 'fixed-data-table';

class TextCell extends React.Component {
  render() {
  	let nestedLevel, rowData, rowDataF
    const {rowIndex, field, data, measureWord, ...props} = this.props;
    nestedLevel = field.length
    if (nestedLevel == 1) {
    	rowData = data[rowIndex][field]
    } else if (nestedLevel == 2) {
    	rowData = data[rowIndex][field[0]][field[1]]
  	} else if (nestedLevel == 3) {
  		rowData = data[rowIndex][field[0]][field[1][field[2]]]
  	}
  	if (measureWord) {
  		rowDataF = rowData.toString() + " " + measureWord
  	} else {
  		rowDataF = rowData.toString()
  	}
    return (
      <Cell {...props}>
        {rowDataF}
      </Cell>
    );
  }
}

export default TextCell;
