import * as React from 'react';
import {Input, InputGroup, ListGroupItem, InputGroupAddon, InputGroupText} from 'reactstrap';

import './todo.css';

export interface dataObj {
    item_id: boolean,
    done: boolean,
    task: string,
}

export interface Props {
    data: dataObj,
    save: Function,
    refresh: Function,
    destroy: Function,
    key?: any,
    updateCollection?: Function,
}

class Todo extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.onSave = this.onSave.bind(this);
        this.onTodoToggle = this.onTodoToggle.bind(this);
    }

    onSave(err: boolean, response: any, newData: dataObj) {
        if (this.props.updateCollection) {
            this.props.updateCollection(err, newData);
        }
    }

    onTodoToggle() {
        const {data, save} = this.props;
        const newData = {
            ...this.props.data,
            done: !data.done,
        };
        save.call({...this.props, data: newData}, (err: boolean, response: any) => this.onSave(err, response, newData));
    }

    render() {
        const {data} = this.props;
        return (
            <ListGroupItem>
                <InputGroup>
                    <InputGroupAddon addonType="prepend" className='input-group-prepend-custom'>
                        <InputGroupText>
                            <Input type="checkbox" addon checked={data.done} onChange={this.onTodoToggle}/>
                        </InputGroupText>
                    </InputGroupAddon>
                    <span>{data.task}</span>
                </InputGroup>
            </ListGroupItem>
        );
    }
}


export default Todo;

// helpers


