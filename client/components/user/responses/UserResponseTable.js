import React from 'react';
import { Table, Column, Cell } from 'fixed-data-table';

import TextCell from 'components/tables/TextCell';

class UserResponseTable extends React.Component {
	constructor(props) {
		super(props);
	}
	componentWillMount() {
	  this.setState({
	  	attendeeResponses: this.props.attendeeResponses,
			windowWidth: window.innerWidth - 30,
	  })
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			attendeeResponses: nextProps.attendeeResponses,
		})
	}
	componentDidMount() {
		this.setState({
		})
	}
	render() {
		let attendeeResponses
		attendeeResponses = this.props.attendeeResponses
		return (
			<div>
				<Table
				  rowHeight={30}
				  rowsCount={attendeeResponses.length}
				  width={this.state.windowWidth}
				  height={attendeeResponses.length * 30 + 35}
				  headerHeight={30}>
				  <Column
				    header={<Cell>First Name</Cell>}
				    fixed={true}
				    cell={
				      <TextCell
				        data={attendeeResponses}
				        field={["volunteer", "first_name"]}/>}
				    width={150}/>
				  <Column
				    header={<Cell>Last Name</Cell>}
				    fixed={true}
				    cell={
				      <TextCell
				        data={attendeeResponses}
				        field={["volunteer", "last_name"]}/>}
				    width={150}/>
				  <Column
				    header={<Cell>Bringing</Cell>}
				    fixed={true}
				    cell={
				      <TextCell
				        data={attendeeResponses}
				        field={["content"]}
				        measureWord="ppl"/>}
				    width={80}/>
				  <Column
				    header={<Cell>Driver?</Cell>}
				    cell={
				      <TextCell
				        data={attendeeResponses}
				        field={["volunteer", "driver"]}/>}
				    width={100}/>
				  <Column
				    header={<Cell>Heavy Lifting?</Cell>}
				    cell={
				      <TextCell
				        data={attendeeResponses}
				        field={["volunteer", "heavy_lifting"]}/>}
				    width={150}/>
				  <Column
				    header={<Cell>Phone</Cell>}
				    cell={
				      <TextCell
				        data={attendeeResponses}
				        field={["volunteer", "phone_number"]}/>}
				    width={150}/>
				  <Column
				    header={<Cell>Zipcode</Cell>}
				    cell={
				      <TextCell
				        data={attendeeResponses}
				        field={["volunteer", "zipcode"]}/>}
				    width={100}/>
				</Table>
			</div>
		)
	}
};

export default UserResponseTable;
