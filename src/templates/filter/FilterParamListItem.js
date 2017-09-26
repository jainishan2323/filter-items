import React, {Component} from 'react';

export default class FilterParamListItem extends Component {
    render() {
        return (
            <div className="checkbox">
                <input type="checkbox" value={this.props.value} onChange={this.props.clickHandler} className="filter-checkbox"/>
                <label htmlFor={this.props.value}>{this.props.value}</label>
            </div>
        )
    }
}