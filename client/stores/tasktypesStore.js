import alt from 'control'
import TaskTypesActions from 'actions/tasktypesActions';

class TaskTypesStore {
	constructor() {
		this.bindListeners({
			handleStoreTaskTypes: TaskTypesActions.STORE_TASK_TYPES,
			handleShowForm: TaskTypesActions.SHOW_CREATE_TASK_FORM,
			handleHideForm: TaskTypesActions.HIDE_CREATE_TASK_FORM,
		});
		this.taskTypes = null;
		this.showForm = false;
		this.taskType = null;
	}
	handleStoreTaskTypes(res) {
		// update its taskTypes attribute with the resposne
		this.taskTypes = res.resource.task_types;
	}
	handleShowForm(taskType) {
		this.showForm = true;
		this.taskType = taskType;
	}
	handleHideForm() {
		this.showForm = false;
		this.taskType = null;
	}
}

export default alt.createStore(TaskTypesStore);