import React from 'react';
import {Button, Table, Row, Col} from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation} from '../../slices/productsApiSlice';
import {toast } from 'react-toastify';


const ProductList = () => {
    const {data: products, error, isLoading, refetch} = useGetProductsQuery();


    const [createProduct, {isLoading: loadingCreate}] = useCreateProductMutation();

    const [deleteProduct, {isLoading: loadingDelete}] = useDeleteProductMutation();






    // const createProductHandler = () => {
    //     createProduct({name: 'Sample name', price: 0, image: '/images/sample.jpg', brand: 'Sample brand', category: 'Sample category', countInStock: 0, description: 'Sample description'});
    // }

    const createProductHandler = async () => {
        if (window.confirm('Are you sure?')) {
            try {
                await createProduct();
                // refetch();
            } catch (error) {
                toast.error(error.message);                
            }
        }
    }

    const deleteProductHandler = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await deleteProduct(id);
                toast.success('Product deleted successfully');
                refetch();
            } catch (error) {
                toast.error(error.message);
            }
        }
    }




    return (
        <>
            <Row>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-end">
                    {/* <Link to="/admin/product/create"> */}
                        <Button className="btn-sm m-3 p-1" onClick={createProductHandler}>
                            <FaPlus/>
                            Create Product
                        </Button>
                    {/* </Link> */}
                </Col>

            </Row>
            {loadingCreate && <Loader/>}
           
            {isLoading ? <Loader/> : error ? <Message variant="danger">{error}</Message> : (
                <>
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <Link to={`/admin/product/${product._id}/edit`}>
                                            <Button className="btn-sm m-1 p-1" >
                                                <FaEdit/>
                                            </Button>
                                        </Link>
                                        <Button className="btn-sm m-1 p-1" onClick={() => deleteProductHandler(product._id)} >
                                            <FaTrash/>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}        
        </>
    );
};

export default ProductList;