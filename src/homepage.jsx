import { MainPage } from "./Sections/home/mainpage";
import { Gallery } from "./Sections/Gallery/gallery";
import { Poem } from "./Sections/Poem/poem";
import { Konami } from "./Sections/Konami/konami";
import { Greetings } from "./Sections/Greetings/greetings";


function HomePage() {
  return (
    <>
      <MainPage />
      <Gallery></Gallery>
      <Poem/>
      <Gallery></Gallery>
      <Greetings/> 
      <Konami></Konami>
    </>
  );
}
export default HomePage;