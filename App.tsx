import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { Main } from "./src/Main";
import { Container } from "./src/Main/styles";

export default function App() {
  const [isFontLoading] = useFonts({
    "GeneralSans-400": require("./src/assets/fonts/GeneralSans-Bold.otf"),
    "GeneralSans-600": require("./src/assets/fonts/GeneralSans-Regular.otf"),
    "GeneralSans-700": require("./src/assets/fonts/GeneralSans-Semibold.otf"),
  });

  if (!isFontLoading){
    return null;
  }

  return (
    <>
      <Container>
        <StatusBar style="dark"/>
        <Main/>
      </Container>
    </>
  );
}
