import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Product from './Product';

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY {
    allProducts {
      id
      name
      price
      description
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function Products() {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY);
  console.log(data, error, loading);
  return (
    <div>
      <ProductListStyles>
        {loading && <p>Loading products...</p>}
        {error && <p>Error loading products: {error.message}</p>}
        {data?.allProducts?.length ? (
          data.allProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))
        ) : (
          <p>No products available</p>
        )}
      </ProductListStyles>
    </div>
  );
}
