import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {connect} from 'react-redux';
import {requestProduct} from './reducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Input from './components/Input';
import ProductsList from './components/ProductsList';
import Categories from "./components/Categories";
import {style} from './common/style/style.css'
import * as productReducer from './reducer'

//Creating our component
class App extends Component {

    componentDidMount() {
        this.props.loadProducts();
    }

    render() {

        // save location category from address bar
        let currentLocation = this.props.location.pathname.replace('/', '');
        let search = this.props.location.search;
        const addressSearch = search.slice(search.indexOf('=') + 1, search.length);
        const {products, categoriesList} = this.props;

        return (
            //Displaying our layout
            (<Container>
                <Row>
                    <Col xs={5} sm={5} md={4} lg={3}>
                        <div align="center">Filter by category</div>
                        <Col className={'paddingNull'}>
                            <ul className={'paddingNull'}>
                                <Categories
                                    currentSearch={search}
                                    categoriesList={categoriesList}
                                    currentLocation={currentLocation}
                                />
                            </ul>
                        </Col>
                    </Col>
                    <Col xs={7} sm={7} md={8} lg={9}>

                        <Input
                            currentLocation={currentLocation}
                            onChangeHandler={(event) => {
                                this.onChangeHandler(event);
                                this.props.inputProducts(event)
                            }}
                            resetField={(event) => {
                                this.props.inputProducts(event)
                            }}
                            input={addressSearch}
                        />
                        {
                            products &&
                            <ProductsList
                                products={products}
                                category={currentLocation}
                                input={addressSearch}
                            />
                        }
                    </Col>
                </Row>
            </Container>)
        );
    }

    //function which set new state of input field
    onChangeHandler(e) {
        this.setState({
            inputValue: e.target.value,
        });
        this.props.history.push({
            search: `?searchInput=${e.target.value}`
        });
    }
}

const mapStateToProps = ({loading, products, inputValue, categoriesList}) => ({
    loading: loading,
    products: products,
    inputValue: inputValue,
    categoriesList: categoriesList
});

//Connect Redux
const mapDispatchToProps = dispatch => ({
    loadProducts: () => dispatch(
        requestProduct()
    ),
    inputProducts: (event) => dispatch(productReducer.onInputSearch(event.target.value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);

