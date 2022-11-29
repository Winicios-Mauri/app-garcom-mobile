import { StatusBar } from "expo-status-bar";
import { Modal } from "react-native";
import { CheckCircle } from "../Icons/CheckCircle";
import { Container, OkButton } from "./styles";
import { Text } from "../Text";


interface OrderConfimModalProps {
  visible: boolean;
  onOk: () => void;
}

export function OrderConfimModal({ visible, onOk }: OrderConfimModalProps) {
  return (
    <Modal visible={visible} animationType="fade">

      <StatusBar style="light"/>

      <Container>
        <CheckCircle />
        <Text color="#fff" size={20} weight="700" style={{ marginTop: 12 }}>Pedido Confirmado</Text>
        <Text color="#fff" opacity={0.9} weight="600" style={{ marginTop: 4 }}>Pedido já entrou na fila de produção</Text>

        <OkButton onPress={onOk}>
          <Text color="#d73035" weight="700">OK</Text>
        </OkButton>
      </Container>

    </Modal>
  );
}
