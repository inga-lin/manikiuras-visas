import ManikiuroListoAtvaizdavimasFronte from "./Front/ManikiuroListoAtvaizdavimasFronte";
import { useEffect,useReducer, useState } from 'react';//2.-22. bendraujam su serveriu//101 useReducer  rusiuojam su serveriu
import axios from 'axios';//2.-22. bendraujam su serveriu
import { Link } from "react-router-dom";//susiimportint <Link>
import '../Front.css'; 
import { getDataFromServer } from "../Actions"; //101 nepamirst susiimportint is Actions
import reducer from "../Reducers/reducer";//101 rusiuojam su serveriu

function Front({ show }) {

    //cia taip atrode be rusiavimo vardo ir kainos
    //const [manikiuras, setManikiuras] = useState([]);//2.-22. -----sitas buvo kol nebuvo rusiavimas reikalingas
    //Read //2.-22.
    //useEffect(() => { //2 bendraujam su serveriu ir issitraukiam info is savo D.B.///////
    //axios.get('http://localhost:3003/manikiuro-list/' + show)//a.pridedam linku rusiavima -list/' + show
    // .then(res => {
    //   console.log(res.data);//2.-22. bendraujam su serveriu ir issitraukiam info 
    //  setManikiuras(res.data);//2.-22. bendraujam su serveriu ir issitraukiam info 
    // })
    //},[show]);//{/*a.<Link> ir isrusiuoja//.show yra propsas kuri perduodam i Front.jsx*/}
    

    //101 cia pasikeite setManikiuras(res.data) i (getDataFromServer(res.data)); eilute del rusiavimo vardo ir kainos
    const [manikiuras, setManikiuras] = useReducer(reducer, []); //101----sitas atsirado del rusiavimo serverio puseje
    //101 cia atsirado rusiavimas vardo ir kainos
    //Read //2.-22.
    useEffect(() => { //2 bendraujam su serveriu ir issitraukiam info is savo D.B.///////
    axios.get('http://localhost:3003/manikiuro-list/' + show)//a.pridedam linku rusiavima -list/' + show
    .then(res => {
      console.log(res.data);//2.-22. bendraujam su serveriu ir issitraukiam info 
      setManikiuras(getDataFromServer(res.data));//101 getDataFromServer(res.data) 
    })
  },[show]);//{/*a.<Link> ir isrusiuoja//.show yra propsas kuri perduodam i Front.jsx*/}


    //101 serverio puseje rusiavimas vardo ir kainos
    const serverSort = (by, dir) => {
    axios.get('http://localhost:3003/manikiuro-list-sorted/?dir='+ dir + '&by=' + by)
    .then(res => {
        setManikiuras(getDataFromServer(res.data));//getDataFromServer pasiimam is Action/index.js
    });
    }



    //202 search
    const [search, setSearch] = useState('');
    //202 search
    const doSearch = e => {
        setSearch(e.target.value); //cia yra reiksme kurios ieskosim (e.target.value)
        axios.get('http://localhost:3003/manikiuro-list-search/?s='+ e.target.value) //ieskom e.target.value
        .then(res => {
            setManikiuras(getDataFromServer(res.data));//getDataFromServer pasiimam is Action/index.js
        });
    }

    return(
    <>
        <div className="p-contai con-pagri">
        <div className="container1 ">
            <nav className="navbar">
                <a className="nav-linkk" href="/">Manikiūras Tau...</a>
                <div className="navbar-man ">
                     <Link className="nav-link" to="/">Visi</Link>  {/*//a.butinas linkams (<Link className="nav-link" to="/">Home</Link>)*/}
                    <Link className="nav-link" to="/klasikinis">Klasikinis</Link>{/*//a.butinas linkams /leaf nurodo kaip i ji patekti i http://localhost:3000/leaf*/}
                    <Link className="nav-link" to="/prancuziskas">Prancūziškas</Link>{/*a.<Link> ir isrusiuoja */}
                    <Link className="nav-link" to="/kombinuotas">Kombinuotas</Link>{/* a.<Link> ir isrusiuoja */}
                </div>   
            </nav>
        </div>
            <div className="stulpeliu-tevass">
                <div className="stulpeliu-vaikas1">
                    <div className="titleee titleees">
                        <h2>Manikiūrai</h2>
                    </div>
                    <div className="search">{/*202 search*/}
                       {/*<label>Search</label>*/}
                       <input type="text" className="form-control" onChange={doSearch} value={search} placeholder="Ieškoti pagal vardą" />
                    </div>
                    <div className="sarasass sar">
                        <ul className="ull">
                            {
                                manikiuras.map(m => <ManikiuroListoAtvaizdavimasFronte key={m.id} manikiuras={m}></ManikiuroListoAtvaizdavimasFronte>)//2 bendraujam su serveriu ir issitraukiam info//5. ManikiuroListoAtvaizdavimas//6.setIstrintiId istrinsim eilutes info
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container3">
                <div className="rusiuojam ">
                    <div className="col-2">{/*101 rusiuojam su serveriu*/}
                        <span>Išrūšuoti pagal vardą <small>server</small>:</span>
                        <div className="rus-button">
                            <button type="button" className="manikiuro-buttons istrinti"  onClick={() => serverSort('vardas', 'asc')}>Vardas nuo abc</button>
                            <button type="button" className="manikiuro-buttons istrinti"  onClick={() => serverSort('vardas', 'desc')}>Vardas nuo cba</button>
                        </div>
                    </div>
                    <div className="col-2">{/*101 rusiuojam su serveriu*/}
                        <span>Išrūšuoti pagal kainą <small>server</small>:</span>
                            <div className="rus-button">
                                <button type="button" className="manikiuro-buttons istrinti"  onClick={() => serverSort('kaina', 'asc')}>Nuo maziausios kainos</button>
                                <button type="button" className="manikiuro-buttons istrinti"  onClick={() => serverSort('kaina', 'desc')}>Nuo didziausios kainos</button>
                            </div>
                         </div> 
                    </div>
                </div>
            </div>
    </>
    )
}
 export default Front;

 /*BUVO BE RUSIUOJAMU <LINK>
 IR NEREIKEJO NIEKO PAPILDOMAI DARYTI SERVERIO DALYJE app.js kad atvaizduotu lista jam uzrteko Read dalies serveryje
 CIA ATVAIZDAVOM TIK SARASA SUKURTA BACK.JSX
 import ManikiuroListoAtvaizdavimasFronte from "./Front/ManikiuroListoAtvaizdavimasFronte";
import { useEffect, useState } from 'react';//2.-22. bendraujam su serveriu
import axios from 'axios';//2.-22. bendraujam su serveriu
import '../Front.css'; 
function Front() {
    const [manikiuras, setManikiuras] = useState([]);//2.-22.
    
    
    //Read //2.-22.
    useEffect(() => { //2 bendraujam su serveriu ir issitraukiam info is savo D.B.///////
    axios.get('http://localhost:3003/manikiuro-salonas')
    .then(res => {
      console.log(res.data);//2.-22. bendraujam su serveriu ir issitraukiam info 
      setManikiuras(res.data);//2.-22. bendraujam su serveriu ir issitraukiam info 
    })
  },[]);
  return(
    <>
        <div className="p-contai con-pagri">
            <div className="stulpeliu-tevass">
                <div className="stulpeliu-vaikas1">
                    <div className="titleee titleees">
                        <h2>Manikiūrai</h2>
                    </div>
                    <div className="sarasass sar">
                        <ul className="ull">
                            {
                                manikiuras.map(m => <ManikiuroListoAtvaizdavimasFronte key={m.id} manikiuras={m}></ManikiuroListoAtvaizdavimasFronte>)//2 bendraujam su serveriu ir issitraukiam info//5. ManikiuroListoAtvaizdavimas//6.setIstrintiId istrinsim eilutes info
                            }
                        </ul>
                    </div>
                </div>
            </div>
      </div>
    </>
    )
}
 */







/*
                    <div className="col-2"> *102 rusiuojam su Reducer
                    /<span>By name <small>client</small>:</span>
                    <div className="arrows">
                    <svg className="up" onClick={() => dispachTrees(sortClientNameAsc())}>*102 sortClientNameAsc() jis ateina is Action/index.js
                        <use xlinkHref="#arrow"></use>
                    </svg>
                    <svg className="down"  onClick={() => dispachTrees(sortClientNameDesc())}>{/*102 sortClientNameDesc() jis ateina is Action/index.js
                        <use xlinkHref="#arrow"></use>
                    </svg>
                    </div>
                </div>
                <div className="col-2">{/*102 rusiuojam su Reducer
                    <span>By height <small>client</small>:</span>
                    <div className="arrows">
                    <svg className="up"  onClick={() => dispachTrees(sortClientHeightAsc())}>{/*102 sortClientHeightAsc() jis ateina is Action/index.js
                        <use xlinkHref="#arrow"></use>
                    </svg>
                    <svg className="down"  onClick={() => dispachTrees(sortClientHeightDesc())}>{/*102 sortClientHeightDesc() jis ateina is Action/index.js
                        <use xlinkHref="#arrow"></use>
                    </svg>
                    </div>
                </div>
*/