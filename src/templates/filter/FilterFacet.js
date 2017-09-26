import React, {Component} from 'react';
import FilteredParamList from './FilteredParamList';

export default class FilterFacet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterParams: [],
            searchFilterParam: [],
            status: ''
        }
        this.searchFilters = this.searchFilters.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }

    componentWillMount() {
        // To set initial list value
        this.setState({
            searchFilterParam: this.state.filterParams,
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            filterParams: nextProps.filterParams,
            searchFilterParam: nextProps.filterParams
        });
    }

    searchFilters(event) {
        const searchValue = event.target.value.toLowerCase();
        const filteredArray = this.state.filterParams.filter((val) => val.toLowerCase().indexOf(searchValue) > -1);
        this.setState({
            searchFilterParam: filteredArray
        });
    }

    toggleDropdown() {
        const status = this.state.status;
        if (status === 'active') {
            this.setState({
                status: ''
            })
        } else {
            this.setState({
                status: 'active'
            })
        }
    }
    
    render() {
        const isActive = this.props.type ? this.props.type : '';
        return(
            <div className={`filter-facet hover card-level-1 ${isActive}`}>
                <button value={this.props.filterName} className={`filter-dropdown ${this.state.status} ${isActive}`} onClick={this.toggleDropdown}>
                    {this.props.filterName}
                </button>
                <div className={`filter-list card-level-2 ${this.state.status}`}>
                    <input type="text" onChange={this.searchFilters} placeholder="Search..."/>
                    <FilteredParamList 
                        filters={this.state.searchFilterParam} 
                        onFilterSelect={this.props.onFilterSelect} 
                        selectedFilters={this.props.selectedFilters}
                    />
                </div>
            </div>            
        );
    }
}