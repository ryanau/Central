import React from 'react';
import { Table, Column, Cell } from 'fixed-data-table';

import TextCell from 'components/tables/TextCell';

class UserCheckedInTable extends React.Component {
	constructor(props) {
		super(props);
	}
	componentWillMount() {
	  this.setState({
	  	checkedInResponses: this.props.checkedInResponses,
			windowWidth: window.innerWidth - 300,
	  })
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			checkedInResponses: nextProps.checkedInResponses,
		})
	}
	componentDidMount() {
	}
	render() {
		let checkedInResponses
		checkedInResponses = this.props.checkedInResponses
		return (
			<div>
				<Table
				  rowHeight={30}
				  rowsCount={checkedInResponses.length}
				  width={this.state.windowWidth}
				  height={checkedInResponses.length * 30 + 100}
				  headerHeight={30}>
				  <Column
				    header={<Cell>First Name</Cell>}
				    fixed={true}
				    cell={
				      <TextCell
				        data={checkedInResponses}
				        field={["first_name"]}/>}
				    width={150}/>
				  <Column
				    header={<Cell>Last Name</Cell>}
				    fixed={true}
				    cell={
				      <TextCell
				        data={checkedInResponses}
				        field={["last_name"]}/>}
				    width={150}/>
				</Table>
			</div>
		)
	}
};

export default UserCheckedInTable;
