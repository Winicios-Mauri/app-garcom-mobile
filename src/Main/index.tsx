
import { Container, CategoriesContainer, MenuContainer, Footer, FooterContainer } from "./styles";
import { Header } from "../components/Header";
import { Categories } from "../components/Categories";
import { Menu } from "../components/Menu";
import { Button } from "../components/Button";
import { TableModal } from "../components/TableModal";
import { useState } from "react";
import { Cart } from "../components/Cart";
import { CartItem } from "../types/CartItem";
import { products } from "../mocks/products";

export function Main() {
  const [ isTableModalVisible, setisTableModalVisible] = useState(false);
  const [ selectedTable, setselectedTable] = useState("");
  const [ cartItems, setcartItems ] = useState<CartItem[]>([
    {
      quantity: 1,
      product: products[0],
    },
    {
      quantity: 2,
      product: products[1],
    },
    {
      quantity: 2,
      product: products[2],
    },
    {
      quantity: 2,
      product: products[3],
    }
  ]);

  function handleSaveTable(table: string){
    setselectedTable(table);
  }

  function handleCancelOrder(){
    setselectedTable("");
  }

  return (
    <>
      <Container>

        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleCancelOrder}
        />

        <CategoriesContainer>
          <Categories />
        </CategoriesContainer>

        <MenuContainer>
          <Menu />
        </MenuContainer>

      </Container>

      <Footer>
        <FooterContainer>
          {
            !selectedTable && (
              <Button onPress= {() => setisTableModalVisible(true)}>
                Novo Pedido
              </Button>
            )
          }

          {selectedTable && (
            <Cart cartItems={cartItems}/>
          )}
        </FooterContainer>
      </Footer>

      <TableModal
        visible={isTableModalVisible}
        onClose= {() => setisTableModalVisible(false)}
        onSave={handleSaveTable}
      />
    </>
  );
}
