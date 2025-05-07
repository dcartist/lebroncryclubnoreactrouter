import { useState } from 'react'
import { Header1 } from './Components/Headers/Headers'
import './App.css'
import { MainPage } from './Sections/home/mainpage'
import { Gallery } from "./Sections/Gallery/gallery"
import {Poem} from "./Sections/Poem/poem"
import Button from 'react-bootstrap/Button';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <MainPage/>
    <Gallery></Gallery>
    <Poem></Poem>
    <Header1  headname="test"/>
     
    </>
  )
}

export default App
