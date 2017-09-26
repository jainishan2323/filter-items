import React, {Component} from 'react';
import FilterParamListItem from './FilterParamListItem';

export default class FilteredParamList extends Component {
    constructor() {
        super();
        this.renderFilterList = this.renderFilterList.bind(this);
    }

    renderFilterList() {
        return this.props.filters.map((filter, index) => {
            const isChecked = this.props.selectedFilters.indexOf(filter) ? true : false;
            return <FilterParamListItem value={filter} clickHandler={this.props.onFilterSelect} key={index} status={isChecked}/>
        })
    }

    render() {
        return (
            <div className="filter-param-list">
                {this.renderFilterList()}
            </div>
        );
    }
}