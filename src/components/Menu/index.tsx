import { FlatList } from "react-native";

import { products } from "../../mocks/products";

import { ProductContainer, PrductImage, ProductDetails, Separator, AddToCardButton } from "./styles";
import { Text } from "../Text";
import { formatCurrency } from "../../utils/formatCurrency";
import { PlusCircle } from "../Icons/PlusCircle";
import React, { useState } from "react";
import { ProductModal } from "../ProductModal";
import { Product } from "../../types/Product";

export function Menu(){
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ selectedProduct, setSelectedProduct ] = useState<null | Product>(null);

  function handleOpenModal(product: Product){
    setIsModalVisible(true);
    setSelectedProduct(product);
  }

  return (
    <>
      <ProductModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        product={selectedProduct}
      />

      <FlatList
        data={products}
        style={{marginTop: 32}}
        contentContainerStyle={{paddingHorizontal: 24}}
        keyExtractor={product => product._id}
        ItemSeparatorComponent={Separator}
        renderItem={({item: product}) => (
          <ProductContainer onPress={() => handleOpenModal(product)}>
            <PrductImage
              source={{
                uri: `http://10.0.2.8:3001/upload/${product.imagePath}`,
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
          </ProductContainer>
        )}
      />
    </>
  );
}
