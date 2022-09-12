import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react'
import { XCircleIcon } from '@heroicons/react/24/outline'
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';

export default function CartScreen() {
    const { state, dispatch } = useContext(Store);
    const router = useRouter();
    const { cart: { cartItems } } = state;

    const removeItemHandler = (item) => {
        dispatch({ type: 'CART_REMOVE_ITEM', payload: item })
    }

    return (
        <Layout title="Shopping Cart">
            <h1 className='mb-4 text-xl'>Shopping Cart</h1>
            {cartItems.length === 0
                ? (<div>Cart is empty. <Link href="/">Go shopping</Link></div>)
                : (
                    <div className='grid mb:grid-cols-4 mb:gap-5'>
                        <div className='overflow-x-auto md:col-span-3'>
                            <table className='min-w-full'>
                                <thead className='border-b'>
                                    <tr>
                                        <th className='px-5 text-left'>Item</th>
                                        <th className='p-5 text-right'>Quantity</th>
                                        <th className='p-5 text-right'>Price</th>
                                        <th className='p-5'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map(item => (
                                        <tr key={item.slug} className="border-b">
                                            <td>
                                                <Link href={`/product/${item.slug}`}>
                                                    <a className='flex items-center'>
                                                        <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            width={50}
                                                            height={50}
                                                        />
                                                        &nbsp;
                                                        {item.name}
                                                    </a>
                                                </Link>
                                            </td>
                                            <td className='p-5 text-right'>{item.quantity}</td>
                                            <td className='p-5 text-right'>${item.price}</td>
                                            <td className='p-5 text-center'>
                                                <button onClick={() => removeItemHandler(item)}>
                                                    <XCircleIcon className="h-5 w-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='card p-5'>
                            <ul>
                                <li>
                                    <div className='pb-3 text-xl'>
                                        Subtotal ({cartItems.reduce((a,c) => a + c.quantity, 0)} )
                                        {' '}
                                        : ${cartItems.reduce((a,c) => a + c.quantity * c.price, 0)}
                                    </div>
                                </li>
                                <li>
                                    <button className='primary-button w-full' onClick={() => router.push('/shipping')}>
                                        Checkout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                )
            }
        </Layout>
    )
}