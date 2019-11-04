import React from 'react';
import {Link} from "react-router-dom";
import StyledButton from '../common/StyledButton'
import PropTypes from 'prop-types'

//filtering list of our items & find unique category therefore displayed them as buttons
const Categories = ({currentSearch, categoriesList, currentLocation, reset, handleChange}) => {

    /** @namespace product.bsr_category */
    let categoryList = categoriesList;


    //Displaying each item as button
    let mappedCategoryList;
    mappedCategoryList = categoryList && categoryList.map((item) => {
        let result;
        result = item === 'all' ?
            <Link to={'/' + currentSearch}>
                <StyledButton active={!(currentLocation)}
                              item={''}
                >All</StyledButton>
            </Link> :
            <Link to={item.replace(/\s/g, "")+currentSearch}>
                <StyledButton active={currentLocation === item.replace(/\s/g, "")}
                              type="button"
                              value={item}
                              onClick={handleChange}>
                    {item}
                </StyledButton>
            </Link>;
        return result

    });
    return mappedCategoryList
};

export default Categories

Categories.propTypes = {
    products: PropTypes.array,
    currentLocation: PropTypes.string,
    handleChange: PropTypes.func
};