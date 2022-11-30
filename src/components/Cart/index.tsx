import { FlatList, TouchableOpacity } from "react-native";

import { CartItem } from "../../types/CartItem";

import { Item, ProductContainer, Actions, Image, QuantityContainer, ProductDetails, Summary, TotalContainer } from "./styles";

import { Button } from "../Button";

import { Text } from "../Text";
import { formatCurrency } from "../../utils/formatCurrency";
import { PlusCircle } from "../Icons/PlusCircle";
import { MinusCircle } from "../Icons/MinusCircle";
import { Product } from "../../types/Product";
import { OrderConfimModal } from "../OrderConfimModal";
import { useState } from "react";
import { api } from "../../utils/api";

interface CartProps {
  cartItems: CartItem[];
  onAdd: (product: Product) => void;
  onDecrement: (product: Product) => void;
  onConfirmOrder: () => void;
  selectedTable: string;
}

export function Cart({ cartItems, onAdd, onDecrement, onConfirmOrder, selectedTable }: CartProps) {
  const [isLoading, setIsLoading ] = useState(false);
  const [ isModalVisible, setIsModalVisible ] = useState(false);
  const total = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.quantity * cartItem.product.price;
  }, 0);

  async function handleConfirmOrder(){
    setIsLoading(true);
    const payload = {
      table: selectedTable,
      products: cartItems.map((cartItem) => ({
        product: cartItem.product._id,
        quantity: cartItem.quantity,
      })),
    };
    await api.post("/orders", payload);
    setIsLoading(false);
    setIsModalVisible(true);
  }

  function hanleOk(){
    onConfirmOrder();
    setIsModalVisible(false);
  }
  return (
    <>
      <OrderConfimModal
        visible={isModalVisible}
        onOk={hanleOk}
      />
      {
        cartItems.length > 0 && (
          <FlatList
            data={cartItems}
            keyExtractor={cartItem => cartItem.product._id}
            showsVerticalScrollIndicator={false}
            style={{ marginBottom: 20, maxHeight: 120 }}
            renderItem={({ item: cartItem }) => (
              <Item>
                <ProductContainer>
                  <Image
                    source={{
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
                  <TouchableOpacity
                    style={{ marginRight: 18 }}
                    onPress={() => onAdd(cartItem.product)}
                  >
                    <PlusCircle />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => onDecrement(cartItem.product)}
                  >
                    <MinusCircle />
                  </TouchableOpacity>
                </Actions>
              </Item>
            )}
          />
        )
      }

      <Summary>
        <TotalContainer>
          {cartItems.length > 0 ? (
            <>
              <Text color="#666" weight="600">Total</Text>
              <Text size={20}>{formatCurrency(total)}</Text>
            </>
          ) : (
            <Text color="#999" weight="600">Seu carrinho está vazio</Text>
          )}
        </TotalContainer>

        <Button
          onPress={handleConfirmOrder}
          disabled={cartItems.length === 0}
          loading={isLoading}
        >
          Confirmar Pedido
        </Button>
      </Summary>
    </>
  );
}
