import { MainPage } from "./Sections/home/mainpage";
import { Gallery } from "./Sections/Gallery/gallery";
import { Poem } from "./Sections/Poem/poem";
import { Konami } from "./Sections/Konami/konami";
import { Greetings } from "./Sections/Greetings/greetings";
import { Header2, Header1, Header3 } from "./Components/Headers/Headers";
import Button from 'react-bootstrap/Button';


function HomePage() {
  return (
    <>
    <div className="headertop"> If you want you can leave your trolling message for Djalphamusic <Button variant="outline-light" href="https://forms.gle/Nmxx28AjYtV8CPxj9" target="_blank"> Click here to leave a message</Button></div>
      <MainPage />
     
      <div className="large-scale-screen mb-5">
<Header2  headname={"This is for those who will cry and miss Lebron James when he leaves the NBA"}/>
      </div>

      <span className="text-center mt-5">
      <Header1 headname={"Lebron Cry Club #1 Fan"}/>
      <Header2 headname={"DJAlphaMusic"}/>
      </span>
      <Gallery></Gallery>

      <Poem className="mb-5"></Poem>

      <Konami></Konami>
    </>
  );
}
export default HomePage;