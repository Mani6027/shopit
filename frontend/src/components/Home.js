import React, {Fragment, useEffect, useState} from 'react'
import Pagination from 'react-js-pagination';

import MetaData from './layout/MetaData'

import {useDispatch, useSelector} from 'react-redux';
import {getProducts} from '../actions/productActions'

import Product from '../components/product/product'
import Loader from '../components/layout/Loader'

import {useAlert} from 'react-alert';

const Home = () => {
    
    const alert = useAlert();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);

    const {loading, products, error, productsCount, resultPerPage} = useSelector(state => state.products)

 
    useEffect(() => {

        if (error) {
            return alert.error(error);
        }

        dispatch(getProducts(currentPage));
    }, [dispatch, alert, error, currentPage])

    function setCurrentPageNo(pageNumber){
        setCurrentPage(pageNumber)
    }

    return (
        <Fragment>
            {loading ? <Loader />: (
                <Fragment>
                    <MetaData title={'Buy Best Products Online'}></MetaData>
                    <h1 id="products_heading">Latest Products</h1>

                    <section id="products" className="container mt-5">
                        <div className="row">
                            {products && products.map(product =>(
                            <Product key={product._id} product={product}/>
                            ))}
                        </div>
                    </section>
                    {resultPerPage <= productsCount && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    )}
                </Fragment>
            )}
        </Fragment>
    )
}

export default Home
