import { Container, Content, OrderHeader, Table } from "./styles";
import { Text } from "../Text";
import { TouchableOpacity } from "react-native";

interface HeaderProps {
  selectedTable: string;
  onCancelOrder: () => void;
}

export function Header({selectedTable, onCancelOrder}: HeaderProps){
  return (
    <Container>
      {
        !selectedTable && (
          <>
            <Text size={14} opacity={0.8}>Bem Vindo(a) ao </Text>

            <Text size={24}>
              GARÇOM
              <Text size={24}  weight="700">APP</Text>
            </Text>
          </>
        )
      }

      {
        selectedTable && (
          <Content>
            <OrderHeader>
              <Text size={24} weight="700">Pedido</Text>
              <TouchableOpacity onPress={onCancelOrder}>
                <Text color="#d73035" weight="700" size={14}>
                  Cancelar Pedido
                </Text>
              </TouchableOpacity>
            </OrderHeader>

            <Table>
              <Text weight="600" color="#666">Mesa {selectedTable}</Text>
            </Table>
          </Content>
        )
      }
    </Container>
  );
}
