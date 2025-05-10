import "./App.css";
import { MainPage } from "./Sections/home/mainpage";
import { Gallery } from "./Sections/Gallery/gallery";
import { Poem } from "./Sections/Poem/poem";
import { Konami } from "./Sections/Konami/konami";
import { Greetings } from "./Sections/Greetings/greetings";

function App() {

  console.log(import.meta.env.VITE_API_URL);
  return (
    <>
   
      <MainPage />
      <Gallery></Gallery>
      <Poem/>
      <Greetings/> 
      <Konami></Konami>
    </>
  );
}

export default App;
