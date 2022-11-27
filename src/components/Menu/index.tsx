import { FlatList } from "react-native";

import { products } from "../../mocks/products";

import { Product, PrductImage, ProductDetails, Separator, AddToCardButton } from "./styles";
import { Text } from "../Text";
import { formatCurrency } from "../../utils/formatCurrency";
import { PlusCircle } from "../Icons/PlusCircle";
import React from "react";

export function Menu(){
  return (
    <FlatList
      data={products}
      style={{marginTop: 32}}
      contentContainerStyle={{paddingHorizontal: 24}}
      keyExtractor={product => product._id}
      ItemSeparatorComponent={Separator}
      renderItem={({item: product}) => (
        <Product>
          <PrductImage
            source={{
              uri: `http://10.0.2.8:3001/uploads/${product.imagePath}`,
            }}
          />

          <ProductDetails>
            <Text weight="700">{
              product.name}
            </Text>
            <Text size={14} color="#666" weight="600" style={{ marginVertical: 8}}>
              {product.description}
            </Text>
            <Text size={14} weight="600">
              {formatCurrency(product.price)}
            </Text>
          </ProductDetails>

          <AddToCardButton>
            <PlusCircle />
          </AddToCardButton>
        </Product>
      )}
    />
  );
}
