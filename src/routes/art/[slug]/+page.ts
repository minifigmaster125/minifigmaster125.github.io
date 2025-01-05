
import type { PageLoad } from './$types';
import products from '../../../products.json';

export const load: PageLoad = ({ params }) => {
    const product = products.find(p => p.slug == params.slug)
    console.log(product)
	return product
};