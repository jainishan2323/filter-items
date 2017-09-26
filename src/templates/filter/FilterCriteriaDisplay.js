import React, {Component} from 'react';

export default class FilterCriteriaDisplay extends Component {
    render() {
        if (this.props.filters.length > 0) {
            return (
                <div className="filter-criteria">
                    Applied filters:
                    {
                        this.props.filters.map((filter, index) => <span key={index} className="filter-criteria-item">{filter.toUpperCase()}</span>)
                    }
                </div>
            )
        }
        return null;   
    }
}