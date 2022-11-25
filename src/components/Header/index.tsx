import { Container } from "./styles";
import { Text } from "../Text";

export function Header(){
  return (
    <Container>
      <Text size={14} opacity={0.8}>Bem Vindo(a) ao </Text>
      <Text size={24} weight="700">
        GARÇOM
        <Text size={24}>APP</Text>
      </Text>
    </Container>
  );
}
