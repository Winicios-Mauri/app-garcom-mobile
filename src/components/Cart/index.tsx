import { FlatList, TouchableOpacity } from "react-native";

import { CartItem } from "../../types/CartItem";

import { Item, ProductContainer, Actions, Image, QuantityContainer, ProductDetails } from "./styles";

import { Text } from "../Text";
import { formatCurrency } from "../../utils/formatCurrency";
import { PlusCircle } from "../Icons/PlusCircle";
import { MinusCircle } from "../Icons/MinusCircle";

interface CartProps {
  cartItems: CartItem[];
}

export function Cart({ cartItems }: CartProps){
  return (
    <FlatList
      data={cartItems}
      keyExtractor={ cartItem => cartItem.product._id}
      showsVerticalScrollIndicator={false}
      renderItem={({ item: cartItem }) => (
        <Item>
          <ProductContainer>
            <Image
              source = {{
                uri: `http://10.0.2.8:3001/upload/${cartItem.product.imagePath}`,
              }}
            />

            <QuantityContainer>
              <Text size={14} color="#666" weight="600">{cartItem.quantity}x</Text>
            </QuantityContainer>

            <ProductDetails>
              <Text size={14}>{cartItem.product.name}</Text>
              <Text
                size={14}
                color="#666"
                weight="600"
                style={{ marginTop: 4 }}
              >
                {formatCurrency(cartItem.product.price)}
              </Text>
            </ProductDetails>

          </ProductContainer>

          <Actions>
            <TouchableOpacity style={{ marginRight: 18}}>
              <PlusCircle />
            </TouchableOpacity>

            <TouchableOpacity>
              <MinusCircle />
            </TouchableOpacity>
          </Actions>
        </Item>
      )}
    />
  );
}
