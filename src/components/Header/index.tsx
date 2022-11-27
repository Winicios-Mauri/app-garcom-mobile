import { Container } from "./styles";
import { Text } from "../Text";

export function Header(){
  return (
    <Container>
      <Text style={{ paddingHorizontal: 20 }} size={14} opacity={0.8}>Bem Vindo(a) ao </Text>
      <Text style={{ paddingHorizontal: 20 }} size={24}>
        GARÇOM
        <Text size={24}  weight="700">APP</Text>
      </Text>
    </Container>
  );
}
