import Back from "./Components/Back";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Front from "./Components/Front";
import LoginPage from "./Components/LoginPage";//505 reikalingas admino paskyrai su slaptazodziu
import LogoutPage from "./Components/LogoutPage";//505 reikalingas admino paskyrai su slaptazodziu
import RequireAuth from "./Components/RequireAuth";//505 reikalingas admino paskyrai su slaptazodziu

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Front show="all"/>}/>{/*a.<Link> ir isrusiuoja//a.show yra propsas kuri perduodam i Front.jsx*/}
        <Route path="/login" element={<LoginPage />} />{/*//505 reikalingas admino paskyrai su slaptazodziu*/}
        <Route path="/logout" element={<LogoutPage />} />{/*//505 reikalingas admino paskyrai su slaptazodziu*/}
        
        <Route path="klasikinis" element={<Front show="klasikinis"/>} /> {/*a.<Link> ir isrusiuoja//b.show yra propsas kuri perduodam i Front.jsx*/}
        <Route path="prancuziskas" element={<Front show="prancuziskas"/>} /> {/*a.<Link> ir isrusiuoja//b.show yra propsas kuri perduodam i Front.jsx*/}
        <Route path="kombinuotas" element={<Front show="kombinuotas"/>} /> {/*a.<Link> ir isrusiuoja//b.show yra propsas kuri perduodam i Front.jsx*/}
        <Route
              path="/admin"
              element={
                <RequireAuth>
                  <Back/>
                </RequireAuth>
              }
            />      
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

/*
taip atrode be prisijungimo
import Back from "./Components/Back";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Front from "./Components/Front";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Front show="all"/>}/>{/*a.<Link> ir isrusiuoja//a.show yra propsas kuri perduodam i Front.jsx*
        //<Route path='admin' element={<Back/>}></Route>
        //<Route path="klasikinis" element={<Front show="klasikinis"/>} /> {/*a.<Link> ir isrusiuoja//b.show yra propsas kuri perduodam i Front.jsx
        //<Route path="prancuziskas" element={<Front show="prancuziskas"/>} /> {/*a.<Link> ir isrusiuoja//b.show yra propsas kuri perduodam i Front.jsx
        //<Route path="kombinuotas" element={<Front show="kombinuotas"/>} /> {/*a.<Link> ir isrusiuoja//b.show yra propsas kuri perduodam i Front.jsx
     // </Routes>
   // </BrowserRouter>
  //)
//}
*/












/*
Xsampp. Ctr+ c
Egzas:
SU SITUO JAU ATEITI I EGZA

Pasiruosti vsc kad veiktu:
Susikutri folderi: Egzaminas
1:36 js the end
Githubo sukialimas:
(Repositories)New -> (repository name) Egzaminas
Description: Mano egzaminas -> create repository
Einam I vsc ir ten susikuriam failiuka readme.txt ir ten parasom labas(paziuresim ar jis atsivaizduos githube

Ir copinam I VSC:
git init(atsiranda info kad galim ja pusint i githuba bet dar nepusinam nieko, jei kas nors neveikia bando iseit is VSC ir vel ieiti)
git branch -M main
git remote add origin https://github.com/inga-lin/bandymas.git
git push -u origin main
(ismes erora-tai pati paprastai supusinu per vsc)
ir dabar jis automatiskai supusins ie einam githube patikrint ar atvaizdavo readmy failiuka
(jeigu nepavyksta pati supusinu paprastai per VSC)
------------------------------------------------------------------
Egzaminas, folderyje butinai turi buti:
       Server folder ir jame .gitignore failiuka
      React folder ir jame .gitignore failiuka
      Readmy failiuka
      Idedam Duomenu bazes failiuka sql is duomenu bazes
----------------------------------------------------------------------------------------
2022.06.01
(jei neveikia duomenu baze, iseinam pro duris ir ieinam I namuka)
Kaip issiusti is duomenu bazes failiuka I githuba:
Paspaudziam ant savo duomenu bazes pagrindinio pavadinimo -> export -> GO
--------------------------------------------------------------------------------------
Server folderyje susiinstaliuojam:

npm init -y      (sukurs package.json)                ?????
npm install express    
npm i nodemon
npm i cors
npm i mysql
npm install js-md5
npm install uuid   arba npm i uuid
npm start
react folderyje susiinstaliuojam:
npx create-react-app react
cd react
npm start 
npm i axios
npm i sass  jeigu reik scss o ne css
npm install react-router-dom@6
npm start
   
Server folderyje susiinstaliuojam:

npm init -y      (sukurs package.json)   
npm install express    
susikuriam App.js server folderyje
ir .gitignore su /node_modules
I app.js isidadam koda ir jame pakeiciam porta is port = 3000 i port = 3003
https://expressjs.com/en/starter/hello-world.html
const express = require('express')
const app = express()
const port = 3003

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


node app.js   ismes tik tiek Example app listening on port 3003
ir http://localhost:3003/ turim matyti Hello World

npm i nodemon
server folderyje sukuriam .gitignore su   /node_modules
ir package.json irasom prie script:
"start": "nodemon app.js"
npm start(pasileis serveris)
npm i cors
app.js irasom const cors = require('cors');   app.use(cors());
npm i mysql
app.js irasom:
const mysql = require('mysql');

const con = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: 'sernas',    <-duomenu bazes pavadinimas
});

app.use(express.urlencoded({
extended: true
}));

app.use(express.json());

app.get('/trees-manager', (req, res) => {        <- http://localhost:3003/trees-manager api puslapio pavadinimas
// SELECT column1, column2, ...
// FROM table_name;
const sql = `
SELECT
*
FROM trees     <- lenteles pavadinimas(issitrint komentara sita nes nepasileis)
`;
con.query(sql, function(err, result) {
if (err) throw err;
res.json(result);
});
});

npm start    ir susirandam puslapi http://localhost:3003/trees-manager pasiziurim ar gaunam info is duomenu bazes
npm install js-md5
app.js isirsom md5 = require('js-md5'); 
npm install uuid   arba npm i uuid
app.js isirsom const uuid = require('uuid');

npm start


React folderyje susikuriam per komanda ir tada susiinstaliuojam ko reik:
cd ..
spaudziam terminale desineje +
npx create-react-app my-react
cd my-react
npm start    (atidarys puslapi su reacto zenkliuku)
einam i my-react -> src -> index.js
terminale apatineje juostoje paspaudziam ant JavaScript ir pasirenkam JavaScript React ir uzkomentuojam 9 ir 11eilutes  //
ir uzdarom index.js

my-react -> src -> App.js pervadinam i App.jsx
ir istrinam pirma importa ir istrinam <div></div> vidu
terminale:
npm start (paziurim ar veikia pakeitimai)
npm i axios
npm i sass  jeigu reik scss o ne css
npm install react-router-dom@6
npm start

SU SITUO JAU ATEITI I EGZA

Public index.html pasikeisti <title>
Ir srifta cia isimesti<link> I <heada>
Sukelti sql folder I duomenu baze:
PhpMyAdmin susikuri foderi sernas ir insert norima sql failiuka
/* kaip pasileisti projekta
xamp start-> start-> Admin
http://localhost/phpmyadmin/
phpMyAdmin
New -> irasom pavadinima i pirma laukeli(turi buti pavadinime mazosios raides):
sernas -> Create
Name: trees(daugiskaita pavadinimas); Number of columns: 4 (kiek stulpeliu norim);
GO

Name     Type             Length      Anttributes        Index        A_I     
id       int                           UNSIGNED           PRIMARY     x(varnele)
name     VARCHAR           50
heigt    DECIMAL           4,2 (bus 4skaiciai ir du is ju po kablelio)
type     TINYINT                      UNSIGNED
Name:photo,Type:LONGETEXT,Default:NULL(LONGETEXT kad tilptu visa nuotrauka kuri bus paversta i raides simbolius)(Default: NULL-jei nieko neirasysim(foto) nieko ir nerodys)
	(REDAGAVIMAS EILUTES CHANGE )
SAVE

Jei reiktu skiaciaus be kablelio, kiekio-INT
Komentarai-Varchar (500)
Kaina, skaiciai su , decimal(5,2)
Nuotrauka-longtext

Insert
Column     Function    Value  
id                    
name                    Egle
heigt                   8.22
type                    2

Column     Function    Value  
id                    
name                    Pusis
heigt                   6.12
type                    2
GO (pirma o ne paskutini)
Browse -paziuresim ka irasem
Insert- galim dar irasyti

Column     Function    Value  
id                    
name                    Kriause
heigt                   1.22
type                    1

Column     Function    Value  
id                    
name                    Berzas
heigt                   23.45
type                    1
GO (pirma o ne paskutini)
(jei norim paredaguoti einam i Structure -> change(sruktura keisim); Browse ->edit (medzius paredaguoti))

JEI NORETUMEM PAPILDOMAI IDETI KA NORS PRIE LENTELES(balsavimas ir balsu apskaiciavimas)
2022-05-24
	einam i savo http://localhost/phpmyadmin/index.php?route=/sql&server=1&db=sernas&table=trees&pos=0
	(sernas) trees ir ten pridesim prie trees lenteles dar 2stulpelius
	sernas -> trees -> Structure(virsuje)
	Addd 2 <- irasom kiek norim stulpeliu  GO
	
	NAME        TYPE       DEFAULT
	count       INT        Asdefined
	                           0       <-pradine reiksme nulis
	sum       INT        Asdefined
	                           0       <-pradine reiksme nulis
	
	SAVE
	
	Pasiziurim Browsw ar atsirado papildomi stulpeliai

Dvieju lenteliu apjungimas ir komentarai
	einam i http://localhost/phpmyadmin/index.php?route=/sql&server=1&db=sernas&table=trees&pos=0
	savo serne spaudziam New -> 
	table name: komentarai
	NAME          TYPE         Length     ATRIBUTES   INDEX     A_I
	id            int                                 PRIMARY    x
	                                  
	medziai_id    int                     UNSIGNED 
	-------sita medziu_id type ir atributes turi sutapti su trees id kur nurodem type ir atributes !!!--------------
	com            varchar         500
	(com- komentars)
	SAVE
	
	LENTELIU APJUNGIMAS 404
	virsuje spaudziam ant Relation view
	ON DELETE pasirenkam CASCADE(istrynus medi issitrins ir jo komentaras)
	Column nustatom ant medziu_id
	Database - sernas
	Table - trees
	colum - automatiskai parinko id
	SAVE
	jeigu viskas teisingai tai ismeta salotines spalvos uzrasa Display column was successfuly update(jeigu ne tai reik grysti atgal ir tvargyti tos antros lenteles nustatymus pagai id pirmos lenteles)
	einam paziuret ar atsirado tarp dvieju lenteliu virvute id sujunginejom su medziai_id:
	spaudziam ant sernas(kaireje puseje) -> Designer(virsuje) ir turi matytis tos dvi lenteles su virvute(vadinasi viskas ok)

LENTELIU SUJUNGIMAS
Ant lenteliu sujungimo rinktis:
ON DELETLE : SET NULL(kai negalim istrint kokiu nors kategoriju ar ar pvz dydziu lentele)
Arba
CASKADE(trindami medi istrinam ir komentarus jo)
Dar Kitos lenteles prijngimas

VSC
Boostrepo irasymas:
My-react -> src -> susikuriam failiuka bootstrap.css ir ikopinam info is 
https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css 
ir 7 eilute istrinti
ctrl+f susirandam color-adjust ir pakeiciam I print-color-adjust
App.jsx susiimportuojam virsuje import './bootstrap.css';
https://getbootstrap.com/docs/4.6/components/buttons/ sablonas
darom puslapi Manikiuras
spalvu derinimas :
https://colors.muz.li/palette/c2e1ff/889db3/ffc2d7/b38897/fffac2
susimetam I :root {
  --pirma-spalva: #c2e1ff;
  --antra-spalva: #889db3;
  --trecia-spalva: #ffc2d7;
  --trecia-spalva: #b38897;
}


Srifto pakeitimas:
https://fonts.google.com/specimen/Lobster#type-tester
 Einam I public -> index.html ir ten ikopinam <link> I <heado> vidu is fonto puslapio
Ir css nuoroda isdeti I savo App.css body{} vidu
---------------------------------------------
Pirmiausiai, susikuriam 2)App.jsx info kad atvaizduotu ka nors, tada susikuriam Components ir jame 3)Create.jsx su visa info(Add new list) ir <Create> patalpinam App.jsx

Create.jsx apsirasau returne html failiuka ka ten noriu matyti is pasidarau jo stiliu. Tada kiek laukeliu tik pasidarau useState, tada nurodau prie tu laukeliu returne ju visu value={}, tada apsirasom inputHandler kas I ji eina is useState ir tada prei kiekvienos values prirasom :
onChange={e => inputHandler(e, 'vardas')}
 
3.Tada einam I savo App.jsx ir apsirasom Creato.jsx mygtuko paspaudima, kad kai ji paspaus info issisiustu I server ir issisaugotu
3.apsirasom ji dar ir server -> app.js
Nepamirstam kad kai darom App.jsx ir ji paverciam I Back.jsx o App.jsxe nurodom Routus tai Back bus jau nebe cia http://localhost:3000/ o sitame puslapyje http://localhost:3000/admin






//a.<Link> isrusiavimas I atskirus ir visus:
App.jsx 
Front.jsx


//101 sortinimas:
Front.jsx
Server -> App.js
src -> Constants -> index.js
src -> Reducers -> reducer.js
src -> Actions -> index.js 

//202 search
Server -> App.jx
Front.jsx
/// KOMENTARAI 4004
Back.jsx , ManikiuroListoAtvaizdavimas.jsx
App.jsx tai pakeiciam esamus 
////////////////////////////
////////////////////////////
//ATVAIZDUOJA BE SUJUNGTOS LENTELES
//Read //2 bendraujam su serveriu ir issitraukiam info is savo D.B.///////
//app.get('/manikiuro-salonas', (req, res) => { //2 bendraujam su serveriu   //1-pati pradzia     <- http://localhost:3003/trees-manager api puslapio pavadinimas
// SELECT column1, column2, ...
// FROM table_name;       trees <- lenteles pavadinimas(issitrint komentara sita nes nepasileis)
//const sql = `
//SELECT
//*
//FROM salonas
//`;
//con.query(sql, function(err, result) {
//if (err) throw err;
//res.json(result);
//});
//});

//ATVAIZDUOJA SU SUJUNGTA LENTELE
//komntarai 40004
//Read //2 bendraujam su serveriu ir issitraukiam info is savo D.B.///////
app.get('/manikiuro-manager', (req, res) => {//900//1000 dadejau dj.size,  LEFT JOIN dydziai as dj ON m.dydziai_id = dj.id
  // SELECT column1, column2, ...
  // FROM table_name; FROM (trees- duomenu bazes pavadinimas)
  //AS cid - yra komentaro id
  const sql = `
  SELECT
  m.id AS id, m.nuotrauka, m.vardas, m.trukme, m.kaina, m.tipas, GROUP_CONCAT(k.com, '-^o^-') AS comments,GROUP_CONCAT(k.id) AS cid 
  FROM salonas AS m
  LEFT JOIN komentarai AS k
  ON m.id = k.salonas_id
  GROUP BY m.id
`;
  con.query(sql, function(err, result) {
      if (err) throw err;
      res.json(result);
  });

});




//////////////////////////
///700 komentaru istrinimas is beckendo puses+
app.delete("/manikiuro-delete-comment/:id", (req, res) => { //delytinam is trees lnteles kurio id yra ?(kazkoks)
  const sql = `
     DELETE FROM komentarai
      WHERE id = ?
      `;
  con.query(sql, [req.params.id], (err, result) => { //[req.params.id] yra = '/trees-manager/:id'
      if (err) {
          throw err;
      }
      res.send(result);
  })
})







Fronto puseje komentarai
Front.jsx ManikiuroListoAtvaizdavimasFronte.jsx
O cia App.js fronto puse
//BE LENTELIU SUJUNGIMO IR KOMENTARU ATRODE TAIP
//a reikalingas <Link> kad all rodytu visus ManikiuroListoAtvaizdavimasFronte o :manotipas tik pagal atitinkama tipa
//app.get('/manikiuro-list/all', (req, res) => { // <- http://localhost:3003/ 
  // SELECT column1, column2, ...
  // FROM table_name;       trees <- lenteles pavadinimas(issitrint komentara sita nes nepasileis)
 // const sql = `
 // SELECT
 // *
  //FROM salonas
 // `;
 // con.query(sql, function(err, result) {
  //if (err) throw err;
 // res.json(result);
 // });
  //});


  /////////////////////////////////// 404//+KOMENTARAI aprasymas fronte//505 ir cia isidedam m.photo,
//???? is kur tas cid - k.id AS cid- cia mes pervadinom savo k.id i cid
//m.id AS id - irgi pervadinom (kazkodel neitraukem i ta sarasa medziai_id)
//FROM table1 <- is lentels trees 
///LEFT JOIN table2 <- prijungiam lentele komentarai(ji turi buti kaireje puseje phpMyAdmin kur su virvute jungiam)
//ON table1.column_name = table2.column_name; <- nusakom taisykle pagal ka jas jungiam ON m.id = k.medziai_id (trees.id ir komentarai.medziai_id)
///m.id AS id, m.name, m.height, m.type, m.count, m.sum, k.con, k.id AS cid
//m.id AS id, m.name, m.height, m.type, m.count, m.sum, GROUP_CONCAT(k.com, '-^o^-') AS comments, k.id AS cid !!! pas mane con o ne com
//kodel rasom (k.con, '-^o^-') nes kitaip komentaru gale raso kableli ir tada viskas sugriuva(jis dabar tai ides i gala, Front/TreeLine.jsx nusiimsim ta kartinuka)
app.get('/manikiuro-list/all', (req, res) => {//all atskiras routas visu medziu gavimui
  const sql = `
  SELECT
  m.id AS id, m.nuotrauka, m.vardas, m.trukme, m.kaina, m.tipas, GROUP_CONCAT(k.com, '-^o^-') AS comments, k.id AS cid 
  FROM salonas AS m
  LEFT JOIN komentarai AS k
  ON m.id = k.salonas_id
  GROUP BY m.id
`;
  con.query(sql, (err, result) => {
  if (err) throw err;
  res.send(result);
});

}) 
//40004 comentaras+
//komentarai- tai antros lenteles pavadinimas is phpMyAdmin
app.post("/manikiuro-comment/:id", (req, res) => {
  const sql = `
    INSERT INTO komentarai
    (com, salonas_id)
    VALUES (?, ?)
    `;
  con.query(
    sql,
    [req.body.comment, req.params.id],//comment atejo is Front/TreeLine.jsx const [comment, setComment] = useState('');
    (err, results) => {
      if (err) {
        throw err;
      }
      res.send(results);
    }
  );
});
////////////////////
////////////////////////


//505 adminas -loginas
https://md5.gromweb.com/?string=inga
Components/RequireAuth.jsx
Components/LoginPage.jsx
Components/LogoutPage.jsx
src/Functions/auth.js
server/App.js pridedam admin zodeli:
app.get('/manikiuro-manager', (req, res) => {
bus: app.get('/admin/manikiuro-manager', (req, res) => {
ir isimetam sita:

/////505 apsirasom ko reik administratorio prisijungimui------>
//https://www.md5hashgenerator.com/ slaptazodzio pavertimas i koda
//jeigu yra /admin' tada tikrinam ['authorization'] (prisijungima jeigu nera /admin tai atidarom paprastai vartotojui)
const doAuth = function(req, res, next) {
  if (0 === req.url.indexOf('/admin')) {
      const sql = `
      SELECT
      name
      FROM users
      WHERE session = ?
  `;
      con.query(
          sql, [req.headers['authorization'] || ''],
          (err, results) => {
              if (err) throw err;
              if (!results.length) {
                  res.status(401).send({});
                  req.connection.destroy();
              } else {
                  next();
              }
          }
      );
  } else {
      next();
  }
}
app.use(doAuth)



app.get("/admin/hello", (req, res) => {
  res.send("Hello Admin!");
});

app.get("/login-check", (req, res) => {
  const sql = `
  SELECT
  name
  FROM users
  WHERE session = ?
  `;
  con.query(sql, [req.headers['authorization'] || ''], (err, result) => {
      if (err) throw err;
      if (!result.length) {
          res.send({ msg: 'error' });
      } else {
          res.send({ msg: 'ok' });
      }
  });
});

        //jeigu suvedant slaprazodi su name sutampa tai mums uzkraus puslapi(res.send({ msg: 'ok', key });) jei ne, neatidarysres.send({ msg: 'error', key: '' });
        //musu vedamas slaprazodis tikrinamas su musu serveryje uzkuoduotu kodu is https://www.md5hashgenerator.com/
         // md5(req.body.pass) sitoje vietoje uzkuoduoja musu paprasta slaptazodi
app.post("/login", (req, res) => {
  const key = uuid.v4();
  const sql = `
  UPDATE users
  SET session = ?
  WHERE name = ? AND pass = ?
`;
  con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
      if (err) throw err;
      if (!result.affectedRows) {
          res.send({ msg: 'error', key: '' });
      } else {
          res.send({ msg: 'ok', key });
      }
  });
});
/////////505 administratoriaus prisijungimo pabaiga-------------------->
//////////////////////////////



Back.jsx prisideda 
import { authConfig } from '../Functions/auth';
import { Link } from 'react-router-dom';//505

          <div className="container">
        <div className="row">
          <div className="col-12">
            <Link to="/logout">Log OUT</Link>{/*505 prisijungimui
            </div>
            </div>
          </div>
    
    pasikeicia
     axios.get('http://localhost:3003/admin/manikiuro-manager', authConfig())
    
    src/ App.jsx deadedam:
    import LoginPage from "./Components/LoginPage";//505 reikalingas admino paskyrai su slaptazodziu
    import LogoutPage from "./Components/LogoutPage";//505 reikalingas admino paskyrai su slaptazodziu
    import RequireAuth from "./Components/RequireAuth";//505 reikalingas admino paskyrai su slaptazodziu
    
    <Route path="/login" element={<LoginPage />} />505 reikalingas admino paskyrai su slaptazodziu
            <Route path="/logout" element={<LogoutPage />} />//505 reikalingas admino paskyrai su slaptazodziu
           
    
     pakeiciam:
    <Route path='admin' element={<Back/>}></Route>
    I :
    <Route
                  path="/admin"
                  element={
                    <RequireAuth>
                      <Back/>
                    </RequireAuth>
                  }
                /> 
    
    
    
    
    
    
    //606 foto-nuotrauka
    Server/App.js virsuje isimesti:
    app.use(express.json({limit: '50mb'}));//505 per cia bus galima didele foto ideti
    app.use(express.urlencoded({limit: '50mb'}));//505 per cia bus galima didele foto ideti
    
    susikuriam Back/getBase64.js 
    Create.jsx prirasom:
    import { useState , useRef } from "react";//606 useRef
    import getBase64 from "../Back/getBase64";//606
    const fileInput = useRef(); //606
    
    
        const buttonHandler = () => {
            const file = fileInput.current.files[0];///606
    
            if (file) {//606
                getBase64(file)///606
                .then(nuotrauka => {//606
                    console.log(nuotrauka);//606
                    setCreateData({//606
                        vardas,//606
                        tipas,//606
                        kaina,//606
                        trukme,//606
                        nuotrauka//606
                    });//606
                });//606
            } else {//606
            setCreateData({
                vardas,
                tipas,
                kaina,
                trukme,
                nuotrauka: null,//606
            });
        }//606
    
    
    
    
    <div className="forma">{/*606 per cia idesim nuotraukas
                            <label>Nuotrauka:</label>
                            <input ref={fileInput} type="file" className="forma-foto"/>{/*505 cia butinai dadeti ref={fileInput}-(ateina su getBase64 atsiradimu) o type="file"- su input laukelio kurimu, kad buutonas failo pasirinkimui atsirastu*
                        </div>
    
    Tada apsirasom App.js
    i app.js prie (app.post('/trees-manager', (req, res) => {) idedam photo ir ?,req.body.photo
        ir prie app.get("/trees-list/all", (req, res) => { prirasom m.photo,
       Front/TreeLines.jsx atvaizduosim photo
      ir apsirasom jos dydi front.css
       ir galim paziureti ja http://localhost:3000/
      
    
    
      600 MODALA reik sutvarkyti- kad matytusi nuotraukos ir butu galima jas istrinti 
       (Modalas.jsx labai panasus i Create.jsx)
       Modal.jsx pasitvarkom (nepamirst susiimportint import { useEffect, useState, useRef } from "react";
    import getBase64 from "../Back/getBase64";//600
    
       server/app.js apsirasom
    
    
      ////////////////////////////
    ////////////////////////////
    //edit(redaguoti) mygtukas BE NUOTRAUKOS
    ////8.Create paspaudus redaguoti(edit) Modale keiciami duomenys ir atvaizduojami Creat o liste/////
    //buvo tik saugojimas be nuotraukos MODALO
    //app.put("/manikiuro-manager/:id", (req, res) => {
    //const sql = `
    //UPDATE salonas
    //SET vardas = ?, tipas = ?, kaina = ?, trukme = ? 
    //WHERE id = ?
    //`;
     // con.query(
     // sql,
     // [req.body.vardas, req.body.tipas, req.body.kaina, req.body.trukme,  req.params.id],
     // (err, results) => {
     //   if (err) {
     //     throw err;
     //   }
     //   res.send(results);
      //}
    //);
    //});
    
    //KOREGUOTI
    //edit(redaguoti) mygtukas SU NUOTRAUKOS
    //606+//600 apsirasom kaip plius serveryje istrinam foto
    // UPDATE table_name
    // SET column1 = value1, column2 = value2, ...
    // WHERE condition;
    app.put("/manikiuro-manager/:id", (req, res) => {
      let sql;//606 siunciam foto
      let args;//argsargumentai
        if('' === req.body.nuotrauka && req.body.del == 0) {//jeigu tuscias stringas yra foto, tai nerodom nuotraukos rodom tik vardas  tipas kaina
          sql = `
            UPDATE salonas
            SET vardas = ?, tipas = ?, kaina = ?, trukme = ? 
            WHERE id = ?
        `;
          args = [req.body.vardas, req.body.tipas, req.body.kaina, req.body.trukme, req.params.id];
        } else if(1 == req.body.del) {// jeigu yra 1 trinsim foto(nuotrauka bus null)
            sql = `
            UPDATE salonas
            SET vardas = ?, tipas = ?, kaina = ?, trukme = ?, nuotrauka = NULL
            WHERE id = ?
        `;
        args = [req.body.vardas, req.body.tipas, req.body.kaina,req.body.trukme, req.params.id];
        } else { //kitu atveju rodysim nuotrauka
          sql = `
          UPDATE salonas
          SET vardas = ?, tipas = ?, kaina = ?, trukme = ?, nuotrauka = ?
          WHERE id = ?
      `;
      args = [req.body.vardas, req.body.tipas, req.body.kaina, req.body.trukme, req.body.nuotrauka, req.params.id];
        }
      con.query(
        sql,
        args,
        (err, results) => {
          if (err) {
            throw err;
          }
          res.send(results);
        }
      );
    });
    
    
    
    
    -------------------
      
    
      
    
      //Dar galim i react/r2/public/index.html isikelti  i body> vidu
      //    <!--d.cia rodykles ikelem-->
      //	    <svg style="display:none" xmlns="http://www.w3.org/2000/svg">
      //	      <symbol id="arrow" viewBox="0 0 512 512"><path d="M295.6 163.7c-5.1 5-5.1 13.3-.1 18.4l60.8 60.9H124.9c-7.1 0-12.9 5.8-12.9 13s5.8 13 12.9 13h231.3l-60.8 60.9c-5 5.1-4.9 13.3.1 18.4 5.1 5 13.2 5 18.3-.1l82.4-83c1.1-1.2 2-2.5 2.7-4.1.7-1.6 1-3.3 1-5 0-3.4-1.3-6.6-3.7-9.1l-82.4-83c-4.9-5.2-13.1-5.3-18.2-.3z"/></symbol>
      //	    </svg>
      //
      //Ji naudosim Front.jsx
       //                      <svg className="up">
       //                           <use xlinkHref="#arrow"></use> 
       //                       </svg>
       //                       <svg className="down">
      //                            <use xlinkHref="#arrow"></use> {/*d.cia bus rodykles is googles svg arrow ir front.scss pasisukam kaip mums reik
      //                        </svg>
      //                        </div>
      
    
      
    
      
    
      
    
      
    
      //Ir srifta i <head> vidu
      
    
        //  <link rel="preconnect" href="https://fonts.googleapis.com">
      //	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      //	<link href="https://fonts.googleapis.com/css2?family=Akshar:wght@400;600&family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap" rel="stylesheet">
      
    
      //O ji isikelt i savo css
      //font-family: 'Akshar', sans-serif;
      //}
      ///////////////////////////////////////////////////////////////////////////////
    
    */