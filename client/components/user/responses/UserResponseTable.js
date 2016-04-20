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
	  	objects: this.props.objects,
	  	verbs: this.props.verbs,
			windowWidth: window.innerWidth - 350,
	  })
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			attendeeResponses: nextProps.attendeeResponses,
	  	objects: this.props.objects,
	  	verbs: this.props.verbs,
		})
	}
	componentDidMount() {
	}
	render() {
		let attendeeResponses, objects, verbs, objectTags, verbTags, tagS
		attendeeResponses = this.props.attendeeResponses
		objects = this.props.objects
		verbs = this.props.verbs
		if (this.props.attendeeResponses != null && objects != null) {
			objectTags = objects.map((tag) => {
				return (
				  <Column
				    header={<Cell>Bring {tag}?</Cell>}
				    cell={
				      <TextCell
				        data={attendeeResponses}
				        field={["object_tags", tag]}/>}
				    width={150}/>
				)
			});
		}
		if (this.props.attendeeResponses != null && verbs != null) {
			verbTags = verbs.map((tag) => {
				return (
				  <Column
				    header={<Cell>{tag}?</Cell>}
				    cell={
				      <TextCell
				        data={attendeeResponses}
				        field={["verb_tags", tag]}/>}
				    width={150}/>
				)
			});
		}
		return (
			<div>
				<Table
				  rowHeight={30}
				  rowsCount={attendeeResponses.length}
				  width={this.state.windowWidth}
				  height={attendeeResponses.length * 30 + 100}
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
				    {objectTags}
				    {verbTags}
				</Table>
			</div>
		)
	}
};

export default UserResponseTable;
