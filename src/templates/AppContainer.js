import React, {Component} from 'react';
import axios from 'axios';

import FilterFacet from './filter/FilterFacet';
import ItemList from './itemlist/ItemList';
import FilterCriteriaDisplay from './filter/FilterCriteriaDisplay';

// Can be simulated like tags api, hardcoded for now
const collectionStatus = [
    "open",
    "closed"
];

const collectionName = [];
// Can be simulated like tags api, hardcoded for now
const createdIn = [
    "2015",
    "2016",
    "2017"
]


export default class AppContainer extends Component {
    constructor() {
        super();        
        this.getTagFilters = this.getTagFilters.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
        this.clearAllCheckbox = this.clearAllCheckbox.bind(this);
        this.onCreatedInFilterSelect = this.onCreatedInFilterSelect.bind(this);
        this.onTagFilterSelect = this.onTagFilterSelect.bind(this);
        this.filterItemList = this.filterItemList.bind(this);

        this.state = {
            initialItemList: [],
            filterdItemList: [],
            filterFacetTagProps: [],
            tagFilters: [],
            createdInFilter: []
        }
    }

    componentWillMount() {
        // Set up filtered item list as initail item list received as data 
        this.setState({
            filterdItemList: this.state.initialItemList
        });
    }

    componentDidMount() {        
        this.getItemList();    
        this.getTagFilters();
    }    

    getItemList() {
        axios.get('/itemlist').then((response) => {
            this.setState({
                initialItemList: response.data.itemlist,
                filterdItemList: response.data.itemlist
            })
        });
    }

    getTagFilters() {
        axios.get('/filters/tags').then((response) => {
            this.setState({
                filterFacetTagProps: response.data.filters
            })
        });
    }

    onTagFilterSelect(e) {
        const filterParam = e.target.value;
        const tagFilterArray = this.state.tagFilters;

        if (e.target.checked) {
            // If checkbox is selected push selected parameter into the list of array params
            tagFilterArray.push(filterParam);
        } else {
            // If unselect the checkbox then remove the paramfrom filter
            const index = tagFilterArray.indexOf(filterParam);
            tagFilterArray.splice(index, 1);
        }

        this.setState({
            tagFilters: tagFilterArray
        });

        this.filterItemList();
    }

    onCreatedInFilterSelect(e) {
        const filterParam = e.target.value;
        const createdInFilterArray = this.state.createdInFilter;

        if (e.target.checked) {
            // If checkbox is selected push selected parameter into the list of array params
            createdInFilterArray.push(filterParam);
        } else {
            // If unselect the checkbox then remove the paramfrom filter
            const index = createdInFilterArray.indexOf(filterParam);
            createdInFilterArray.splice(index, 1);
        }

        this.setState({
            createdInFilter: createdInFilterArray
        });

        this.filterItemList();
    }

    filterItemList() {
        let itemList = this.state.initialItemList;
        if (this.state.createdInFilter.length > 0) {
            itemList = itemList.filter((item) => this.state.createdInFilter.indexOf(item.createdIn.toString()) > -1);
        }

        if (this.state.tagFilters.length > 0) {
            itemList = itemList.filter((item) => this.state.tagFilters.indexOf(item.tag) > -1);
        }

        this.setState({
            filterdItemList: itemList
        });
    }

    clearAllCheckbox() {
        // This part if done with redux can alleviate use of dom manipulation easier to maintain single state
        const checkboxes = document.getElementsByClassName('filter-checkbox');
        for (let i=0; i< checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                checkboxes[i].checked = false;
            }
        }
    }

    clearFilters() {
        this.setState({
            tagFilters: [],
            createdInFilter: [],
            filterdItemList: this.state.initialItemList
        });
        this.clearAllCheckbox()
    }

    render() {
        const selectedFilters = [...this.state.tagFilters, ...this.state.createdInFilter];

        return(
            <div className="container">
                <div className="filter-container">
                    <FilterFacet filterName="Collection Name" filterParams={collectionName} type="disabled" selectedFilters={[]} />
                    <FilterFacet 
                        filterName="Tags" 
                        filterParams={this.state.filterFacetTagProps} 
                        onFilterSelect={this.onTagFilterSelect}
                        selectedFilters = {this.state.tagFilters}
                    />
                    <FilterFacet filterName="Collection Status" filterParams={collectionStatus} selectedFilters={[]} />
                    <FilterFacet 
                        filterName="Created In" 
                        filterParams={createdIn}
                        onFilterSelect={this.onCreatedInFilterSelect}
                        selectedFilters = {this.state.createdInFilter}
                    />
                    {
                        selectedFilters.length > 0 && <button onClick={this.clearFilters} className="clear-filters">clear all filters</button>
                    }                    
                </div>
                <FilterCriteriaDisplay filters={selectedFilters} />
                <ItemList items={this.state.filterdItemList}/>
            </div>
        )
    }
}
