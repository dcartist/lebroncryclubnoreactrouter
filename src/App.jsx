import { useState } from 'react'
import { Header1 } from './Components/Headers/Headers'
import './App.css'
import { MainPage } from './Sections/home/mainpage'
import { Gallery } from "./Sections/Gallery/gallery"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <MainPage/>
    <Gallery></Gallery>
    <Header1  headname="test"/>
     
    </>
  )
}

export default App
