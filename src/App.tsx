import 'clearblade-js-client';
import './App.css';
import {clearBladeConfig, collectionID} from './config.js';
import { Props as TodoProps, dataObj as TodoDataObj } from './components/todo/todo';
import * as React from 'react';

const clearblade = (window as any).ClearBlade;
import TodoList from "./components/todo_list/todo_list";

interface AppState {
    todoCollection: Array<TodoProps>,
}

interface Collection {
    fetch: Function,
}

interface Query {
    ascending: Function,
}

class App extends React.Component<{}, AppState> {
    collection: Collection;
    query: Query;
    constructor(props: any) {
        super(props);
        this.state = {
          todoCollection: [],
        };
        this.onClearbladeInit = this.onClearbladeInit.bind(this);
        this.refreshCollection = this.refreshCollection.bind(this);
        this.updateCollection = this.updateCollection.bind(this);

        if (clearblade) {
            clearblade.prototype.init({...clearBladeConfig, callback: this.onClearbladeInit});
        }
    }

    updateCollection(err: boolean, newDataObj: TodoDataObj) {
        if(err){
            console.log('Error in update collection');
            return;
        }
        //TODO: Instead of refreshing manually on the client side, re-fetch the entire collection? Currently using this to avoid multiple API requests.
        const {todoCollection: currentCollection} = this.state;
        currentCollection.some((todo) => {
            if(todo.data.item_id === newDataObj.item_id) {
                todo.data = newDataObj;
                return true;
            }
            return false;
        });
        this.refreshCollectionState(currentCollection);
    }

    refreshCollection() {
        if(this.collection){
            this.collection.fetch(this.query, (err: boolean, response: any) => {
                if(err){
                    console.log('Error in Fetch');
                    return;
                }
                this.refreshCollectionState(response);
            });
        }
    }

    refreshCollectionState(collection: Array<TodoProps>) {
        this.setState({
            todoCollection: collection,
        })
    }

    onClearbladeInit(error: boolean, response: object) {
        if(error) {
            console.log('Error in init');
            return;
        }
        const collectionOptions = {
            collectionID,
        };
        this.collection = clearblade.prototype.Collection(collectionOptions);
        this.query = clearblade.prototype.Query(collectionOptions);
        this.query.ascending('item_id'); //TODO: Add created on field and sort in ascending order wrt to that field.
        this.refreshCollection();
    }

    public render() {
        return (
            <div className="App container">
                {/*<p className="App-intro">*/}
                    <TodoList todos={this.state.todoCollection} updateCollection={this.updateCollection}/>
                {/*</p>*/}
            </div>
        );
    }
}

export default App;
