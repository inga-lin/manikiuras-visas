import Back from "./Components/Back";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Front from "./Components/Front";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Front show="all"/>}/>{/*a.<Link> ir isrusiuoja//a.show yra propsas kuri perduodam i Front.jsx*/}
        <Route path='admin' element={<Back/>}></Route>
        <Route path="klasikinis" element={<Front show="klasikinis"/>} /> {/*a.<Link> ir isrusiuoja//b.show yra propsas kuri perduodam i Front.jsx*/}
        <Route path="prancuziskas" element={<Front show="prancuziskas"/>} /> {/*a.<Link> ir isrusiuoja//b.show yra propsas kuri perduodam i Front.jsx*/}
        <Route path="kombinuotas" element={<Front show="kombinuotas"/>} /> {/*a.<Link> ir isrusiuoja//b.show yra propsas kuri perduodam i Front.jsx*/}
      </Routes>
    </BrowserRouter>
  )
}

export default App;

/* cia paprastai rode fronta ir back be papildomu <Link>u i isrusiutus dalykus
import Back from "./Components/Back";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Front from "./Components/Front";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Front/>}/>
        <Route path='admin' element={<Back/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App;
*/