import * as React from 'react';
import {ListGroup} from 'reactstrap';
import './todo_list.css';
import Todo, {Props as TodoProps} from "../todo/todo";

export interface Props {
    todos: Array<TodoProps>,
    updateCollection: Function,
}

function TodoList({todos, updateCollection}: Props) {
    return (
        <ListGroup>
            {todos.map((todo) => <Todo updateCollection={updateCollection} key={todo.data.item_id} {...todo}/>)}
        </ListGroup>
    );
}

export default TodoList;

// helpers

