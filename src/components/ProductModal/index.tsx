import { FlatList, Modal } from "react-native";
import { Product } from "../../types/Product";
import {
  Image,
  CloseButton,
  ModalBody,
  Header,
  IngredientsContainer,
  Ingredient,
  Footer,
  FooterContainer,
  PriceContainer
} from "./styles";

import { Close } from "../Icons/Close";

import { Button } from "../Button";
import { Text } from "../Text";
import { formatCurrency } from "../../utils/formatCurrency";

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  product: null | Product;
}

export function ProductModal({ visible, onClose, product }: ProductModalProps) {
  if (!product) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <Image
        source={{
          uri: `http://10.0.2.8:3001/upload/${product.imagePath}`,
        }}
      >
        <CloseButton onPress={onClose}>
          <Close />
        </CloseButton>
      </Image>

      <ModalBody>
        <Header>
          <Text size={24}>{product.name}</Text>
          <Text style={{ marginTop: 8 }} color="#666" weight="600">{product.description}</Text>
        </Header>

        {
          product.ingredients.length > 0 && (
            <IngredientsContainer>
              <Text color="#666">Ingredients</Text>
              <FlatList
                style={{ marginTop: 16 }}
                data={product.ingredients}
                keyExtractor={ingredient => ingredient._id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item: ingredient }) => (
                  <Ingredient>
                    <Text>{ingredient.icon}</Text>
                    <Text
                      weight="600"
                      size={14}
                      color="#666"
                      style={{ marginLeft: 20 }}
                    >
                      {ingredient.name}
                    </Text>
                  </Ingredient>
                )}
              />
            </IngredientsContainer>
          )
        }

        <Footer>
          <FooterContainer>
            <PriceContainer>
              <Text color="#666" weight="600">Preço</Text>
              <Text size={20}>{formatCurrency(product.price)}</Text>
            </PriceContainer>
            <Button onPress={() => alert("Adicionar ao Pedido")}>
              Adicionar ao Pedido
            </Button>
          </FooterContainer>
        </Footer>
      </ModalBody>
    </Modal>
  );
}
