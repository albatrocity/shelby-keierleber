import React, { useContext } from 'react'
import { Box } from 'grommet'

import ShopItem from './ShopItem'

const Shop = ({ data }) => {
  console.log(data)
  return (
    <Box direction="row-responsive" gap="medium" wrap={true}>
      {[
        ...data.allContentfulSaleItem.edges,
        ...data.allContentfulSaleItem.edges,
        ...data.allContentfulSaleItem.edges,
        ...data.allContentfulSaleItem.edges,
        ...data.allContentfulSaleItem.edges,
      ].map((x) => (
        <ShopItem key={x.node.id} {...x.node} />
      ))}
    </Box>
  )
}

export default Shop
