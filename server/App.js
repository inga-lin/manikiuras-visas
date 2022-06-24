const express = require('express');//1-pati pradzia
const app = express();//1-pati pradzia
const port = 3003;//1-pati pradzia
const cors = require('cors');//1-pati pradzia (cors naudojamasdel saugumo)
app.use(cors());//1-pati pradzia
const mysql = require('mysql');//1-pati pradzia
md5 = require('js-md5');//1-pati pradzia
const uuid = require('uuid');//1-pati pradzia

app.use(express.urlencoded({//1-pati pradzia
    extended: true
}));
    
app.use(express.json());//1-pati pradzia

const con = mysql.createConnection({ //1-pati pradzia(irasom duomenu bazes pavadinima)
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'manikiuras',   
});
 
app.get('/', (req, res) => {//1-pati pradzia
  res.send('Hello World!');
})
////////////////////////////
////////////////////////////
//Read //2 bendraujam su serveriu ir issitraukiam info is savo D.B.///////
app.get('/manikiuro-salonas', (req, res) => { //2 bendraujam su serveriu   //1-pati pradzia     <- http://localhost:3003/trees-manager api puslapio pavadinimas
// SELECT column1, column2, ...
// FROM table_name;       trees <- lenteles pavadinimas(issitrint komentara sita nes nepasileis)
const sql = `
SELECT
*
FROM salonas
`;
con.query(sql, function(err, result) {
if (err) throw err;
res.json(result);
});
});

////////////////////////////
/////////////////////////
  //Create lenteles itasymas
  //3.mygtuko paspaudimas- kuris is Create.jsx paims informaciaj (kai paspausim mygtuka) ir ja issius ir irasys i serveri////
//3.Create.jsx info isaugojimas serveryje
app.post('/manikiuro-salonas', (req, res) => { //2 bendraujam su serveriu   //1-pati pradzia     <- http://localhost:3003/trees-manager api puslapio pavadinimas
  
  const sql = `
  INSERT INTO salonas
  (vardas, tipas, kaina, trukme)
  VALUES (?, ?, ?, ?)
  `;
  con.query(
    sql,
    [req.body.vardas, req.body.tipas, !req.body.kaina ? 0 : req.body.kaina, !req.body.trukme ? 0 : req.body.trukme], //jeigu tuscias trukmes ir kaina laukelis bus 0
    (err, results) => {
      if (err) {
        throw err;
      }
      res.send(results);
    }
  );
});
////////////////////////////
////////////////////////////
//deletle-mygtukas
////6.Istrinimo mygtukas is ManikiuroListoAtvaizdavimas.jsx kuris istrins visa jo info///
app.delete('/manikiuro-salonas/:id', (req, res) => { //delytinam is trees lnteles kurio id yra ?(kazkoks)
  const sql = `
      DELETE FROM salonas
      WHERE id = ?
      `;
  con.query(sql, [req.params.id], (err, result) => { //[req.params.id] yra = '/trees-manager/:id'
      if (err) {
          throw err;
      }
      res.send(result);
  })
})
////////////////////////////
////////////////////////////
//edit(redaguoti) mygtukas
////8.Create paspaudus redaguoti(edit) Modale keiciami duomenys ir atvaizduojami Creat o liste/////
//buvo tik saugojimas be nuotraukos MODALO
app.put("/manikiuro-salonas/:id", (req, res) => {
const sql = `
UPDATE salonas
SET vardas = ?, tipas = ?, kaina = ?, trukme = ? 
WHERE id = ?
`;
  con.query(
  sql,
  [req.body.vardas, req.body.tipas, req.body.kaina, req.body.trukme,  req.params.id],
  (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  }
);
});
/////////////////////////
//////////////////////////
//FRONTO DALIS------------------->
/////////////////////////
//////////////////////////
//a reikalingas <Link> kad all rodytu visus ManikiuroListoAtvaizdavimasFronte o :manotipas tik pagal atitinkama tipa
app.get('/manikiuro-list/all', (req, res) => { // <- http://localhost:3003/ 
  // SELECT column1, column2, ...
  // FROM table_name;       trees <- lenteles pavadinimas(issitrint komentara sita nes nepasileis)
  const sql = `
  SELECT
  *
  FROM salonas
  `;
  con.query(sql, function(err, result) {
  if (err) throw err;
  res.json(result);
  });
  });
//+
//a.biski pakeiciam Fronts.jsx useEffect
//a reikalingas <Link> kad all rodytu visus ManikiuroListoAtvaizdavimasFronte o :manotipas tik pagal atitinkama tipas 'klasikinis','prancuziskas','kombinuotas'
//SELECT column_name(s) <- cia isvardinam abieju lenteliu stulpelius
app.get("/manikiuro-list/:manotipas", (req, res) => { //manotipas yra parametras jeigu tai nera all iesko 'klasikinis','prancuziskas','kombinuotas' ir kazkuri is ju atidaro
  if (req.params.manotipas != "all") {
  const sql = `
          SELECT
          *
          FROM salonas
          WHERE tipas = ?
      `;
  con.query(sql, [['klasikinis','prancuziskas','kombinuotas'].indexOf(req.params.manotipas) + 1], (err, result) => { //b.mes gaunam zodzius ir juos paverciam i indeksa
    if (err) throw err;
    res.send(result);
  });
}
});



/////////////////////////////
//////////////////////////////
//101 rusiavimas vardas ir kaina
// SELECT column1, column2, ...
// FROM table_name
// ORDER BY column1, column2, ... ASC|DESC;
app.get("/manikiuro-list-sorted/", (req, res) => {
  
  let sql;

  if (req.query.by == 'vardas' && req.query.dir == 'asc'){
    sql = `SELECT * FROM salonas ORDER BY vardas ASC`;
  }
  else if (req.query.by == 'vardas' && req.query.dir == 'desc'){
    sql = `SELECT * FROM salonas ORDER BY vardas DESC`;
  }
  else if (req.query.by == 'kaina' && req.query.dir == 'asc'){
    sql = `SELECT * FROM salonas ORDER BY kaina ASC`;
  }
  else{
    sql = `SELECT * FROM salonas ORDER BY kaina DESC`;
  }
  con.query(
    sql,
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
});
/////////////////////////////
//////////////////////////////
//202 search paiska pagal pavadinima name+
// SELECT column1, column2, ...
// FROM table_name
// WHERE columnN LIKE pattern;
// ka reiskia '%a' ir t.t. https://www.w3schools.com/sql/sql_like.asp
app.get("/manikiuro-list-search", (req, res) => {
  const sql = `
        SELECT
        *
        FROM salonas
        WHERE vardas LIKE '%${req.query.s}%'
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});


/////////////////////////////
//////////////////////////////
app.listen(port, () => {//1-pati pradzia
  console.log(`Example app listening on port ${port}`);
})

//pati pradia kuria reik jau tureti egze
/*
const express = require('express');//1-pati pradzia
const app = express();//1-pati pradzia
const port = 3003;//1-pati pradzia
const cors = require('cors');//1-pati pradzia (cors naudojamasdel saugumo)
app.use(cors());//1-pati pradzia
const mysql = require('mysql');//1-pati pradzia
md5 = require('js-md5');//1-pati pradzia
const uuid = require('uuid');//1-pati pradzia
app.use(express.urlencoded({//1-pati pradzia
    extended: true
}));
     
app.use(express.json());//1-pati pradzia
const con = mysql.createConnection({ //1-pati pradzia(irasom duomenu bazes pavadinima)
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sernas',   
});
 
app.get('/', (req, res) => {//1-pati pradzia
  res.send('Hello World!');
})
app.get('/trees-manager', (req, res) => {    //1-pati pradzia     <- http://localhost:3003/trees-manager api puslapio pavadinimas
// SELECT column1, column2, ...
// FROM table_name;       trees <- lenteles pavadinimas(issitrint komentara sita nes nepasileis)
const sql = `
SELECT
*
FROM medziai
`;
con.query(sql, function(err, result) {
if (err) throw err;
res.json(result);
});
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
*/