import React, {Component} from 'react';
import itemView from './itemView';

export default class ItemList extends Component {
    constructor() {
        super();
        this.renderItemList = this.renderItemList.bind(this);
    }

    renderItemList() {
        return this.props.items.map((item) => itemView(item));
    }

    render() {
        return (
            <ul className="item-list">
                {this.renderItemList()}
            </ul>
        );
    }
}