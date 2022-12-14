
import { Container, CategoriesContainer, MenuContainer, Footer, FooterContainer, CenteredContainer } from "./styles";
import { Header } from "../components/Header";
import { Categories } from "../components/Categories";
import { Menu } from "../components/Menu";
import { Button } from "../components/Button";
import { TableModal } from "../components/TableModal";
import { useEffect, useState } from "react";
import { Cart } from "../components/Cart";
import { CartItem } from "../types/CartItem";
import { Product } from "../types/Product";
import { ActivityIndicator } from "react-native";
import { Empty } from "../components/Icons/Empty";
import { Text } from "../components/Text";
import { Category } from "../types/Category";

import { api } from "../utils/api";

export function Main() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isTableModalVisible, setisTableModalVisible] = useState(false);
  const [selectedTable, setselectedTable] = useState("");
  const [cartItems, setcartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    Promise.all([
      api.get("/categories"),
      api.get("/products"),
    ]).then(([categoriesResponse, productsResponse]) => {
      setCategories(categoriesResponse.data);
      setProducts(productsResponse.data);
      setIsLoading(false);
    });
  }, []);

  async function handleSelectCategory(categoryId: string) {
    const route = !categoryId
      ? "/products"
      : `/categories/${categoryId}/products`;

    setIsLoadingProducts(true);
    const { data } = await api.get(route);
    setProducts(data);
    setIsLoadingProducts(false);
  }

  function handleAddToCart(product: Product) {
    if (!selectedTable) {
      setisTableModalVisible(true);
    }

    setcartItems((prevState) => {
      const itemIndex = prevState.findIndex(
        cartItem => cartItem.product._id === product._id);

      if (itemIndex < 0) {
        return prevState.concat({
          quantity: 1,
          product,
        });
      }

      const newCartItem = [...prevState];
      const item = newCartItem[itemIndex];
      newCartItem[itemIndex] = {
        ...item,
        quantity: item.quantity + 1,
      };

      return newCartItem;
    });
  }

  function handleDecrementCartItem(product: Product) {
    setcartItems((prevState) => {
      const itemIndex = prevState.findIndex(
        cartItem => cartItem.product._id === product._id);

      const item = prevState[itemIndex];
      const newCartItem = [...prevState];

      if (item.quantity === 1) {
        newCartItem.splice(itemIndex, 1);

        return newCartItem;
      }

      newCartItem[itemIndex] = {
        ...item,
        quantity: item.quantity - 1,
      };

      return newCartItem;
    });
  }

  function handleSaveTable(table: string) {
    setselectedTable(table);
  }

  function handleResetOrder() {
    setselectedTable("");
    setcartItems([]);
  }

  return (
    <>
      <Container>

        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleResetOrder}
        />

        {isLoading && (
          <CenteredContainer>
            <ActivityIndicator color="#d73035" size="large" />
          </CenteredContainer>
        )}

        {
          !isLoading && (
            <>
              <CategoriesContainer>
                <Categories
                  categories={categories}
                  onSelectCategory={handleSelectCategory}
                />
              </CategoriesContainer>

              {
                isLoadingProducts ? (
                  <CenteredContainer>
                    <ActivityIndicator color="#d73035" size="large" />
                  </CenteredContainer>
                ) : (
                  <>
                    {products.length > 0 && (
                      <MenuContainer>
                        <Menu
                          onAddToCard={handleAddToCart}
                          products={products}
                        />
                      </MenuContainer>
                    )}

                    {products.length <= 0 && (
                      <CenteredContainer>
                        <Empty />
                        <Text color="#666" weight="600" style={{ marginTop: 24 }}>Nenhum produto encontrado</Text>
                      </CenteredContainer>
                    )}
                  </>
                )
              }
            </>
          )
        }

      </Container>

      <Footer>
        <FooterContainer>
          {
            !selectedTable && (
              <Button onPress={() => setisTableModalVisible(true)} disabled={isLoading}>
                Novo Pedido
              </Button>
            )
          }

          {selectedTable && (
            <Cart
              cartItems={cartItems}
              onAdd={handleAddToCart}
              onDecrement={handleDecrementCartItem}
              onConfirmOrder={handleResetOrder}
              selectedTable={selectedTable}
            />
          )}
        </FooterContainer>
      </Footer>

      <TableModal
        visible={isTableModalVisible}
        onClose={() => setisTableModalVisible(false)}
        onSave={handleSaveTable}
      />
    </>
  );
}
