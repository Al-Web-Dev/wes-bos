import { useRouter } from 'next/dist/client/router';
import Pagination from '../../components/Pagination';
import Products from '../../components/Products';

export default function ProductsPage() {
  const { query } = useRouter();
  const page = parseInt(query.page);
  return (
    <div>
      <Pagination page={page || 1} />
      <p>some stuff on index,,,,</p>
      <Products />
      <Pagination page={page || 1} />
    </div>
    // make the same thing show up on home page - see index.js
  );
}
