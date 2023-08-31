import {Link} from 'react-router-dom';
import { Carousel, Image} from 'react-bootstrap';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';
import Loader from './Loader';
import Message from './Message';

const ProductCarosel = () => {
    const { data: products, isLoading, isError } = useGetTopProductsQuery();

    return isLoading ? (<Loader/>) : isError ? (<Message variant={'danger'} />) : (
        <Carousel pause='hover' className='bg-dark'>
            {products.map((product) => (
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <Image src={product.image} alt={product.name} fluid/>
                        <Carousel.Caption className='carousel-caption'>
                            <h2>{product.name} (${product.price})</h2>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}

            </Carousel>
    )
}

export default ProductCarosel