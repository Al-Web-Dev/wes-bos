import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Product from './Product';
import { perPage } from '../config';

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    allProducts(first: $first, skip: $skip) {
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

export default function Products({ page }) {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      skip: page * perPage - perPage,
      first: perPage,
    },
  });
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
