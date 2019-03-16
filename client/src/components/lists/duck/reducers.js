import { combineReducers } from "redux";
import { handleActions } from "redux-actions";

import { 
    createListSuccess,
    updateListSuccess,
    deleteListSuccess,
    addList,
    editList
} from "./actions";

import { loadUserData } from "../../user/duck/actions";
import { addTask } from "../../tasks/duck/actions";

export const byId = handleActions(
    {
        [loadUserData]: (state, { payload }) => addLists(state, payload),
        [addList]: (state, { payload }) => addLists(state, payload),
        [addTask]: (state, { payload }) => updateListTasks(state, payload),
        [editList]: (state, { payload }) => updateList(state, payload),
        [deleteListSuccess]: (state, { payload }) => removeList(state, payload)
    }, {}
);

export const allIds = handleActions(
    {
        [loadUserData]: (state, { payload }) => addListIds(state, payload),
        [addList]: (state, { payload }) => addListIds(state, payload),
        [deleteListSuccess]: (state, { payload }) => removeListId(state, payload)
    }, []
);

const addLists = (state, { entities }) => {
    const { lists } = entities;
    return { ...state, ...lists };
}

const addListIds = (state, { entities }) => {
    const { lists } = entities;
    if (lists) return [ ...state, ...Object.keys(lists) ];
    return state;
}

const updateList = (state, { entities, result: listId }) => {
    const { lists } = entities;
    const updatedList = lists[listId];
    const list = { ...state[listId] };
    list.name = updatedList.name;
    return { ...state, [listId]: list };
}

const updateListTasks = (state, { entities, result: taskId }) => {
    const { tasks } = entities;
    const task = tasks[taskId]
    const { list: listId } = task;
    const list = { ...state[listId] };
    if (!list.tasks) {
        list.tasks = [];
    }
    list.tasks.push(taskId)
    return { ...state, [listId]: list };
}

const removeList = (state, { result: listId }) => {
    const { [listId]: deletedList, ...rest } = state;
    return rest;
}

const removeListId = (state, { result: listId }) => {
    return state.filter(id => id !== listId);
}

export default combineReducers({
    byId,
    allIds,
});