import Link from 'next/link'
import Image from 'next/image'
import { formatter } from '@/utils/helpers'

const ProductCard = ({ product }) => {
  const { handle, title } = product.node

  const price = product.node.priceRange.minVariantPrice.amount;
  const { altText, originalSrc } = product.node.images.edges[0].node;
  return (
    <Link href={`/products/${handle}`}>

            <div className='w-full bg-gray-200 rounded-3xl overflow-hidden'>
                <div className='relative group-hover:opacity-70 h-72'>
                    <Image src={originalSrc} alt={altText} objectFit='cover' width={300} height={200}/>
                </div>

            </div>
            <h3 className='mt-4 text-lg font-medium text-gray-900'>{title}</h3>
            <p className='mt-1 text-sm font-medium text-gray-700'>{formatter.format(price)}</p>
    </Link>
  )
}

export default ProductCard