const express = require('express');//1-pati pradzia
const app = express();//1-pati pradzia
const port = 3003;//1-pati pradzia
const cors = require('cors');//1-pati pradzia (cors naudojamasdel saugumo)
app.use(cors());//1-pati pradzia
const mysql = require('mysql');//1-pati pradzia
md5 = require('js-md5');//1-pati pradzia //505 md5 tikriep projektam nenaudoti nes nesaugus slaptazodziu generaorius
const uuid = require('uuid');//1-pati pradzia//505 sesijos rakto generatorius(random belenkoks kodas)

app.use(express.json({limit: '50mb'}));//606 per cia bus galima didele foto ideti
app.use(express.urlencoded({limit: '50mb'}));//606 per cia bus galima didele foto ideti

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

        //jeigu suvedant slaprazodi su vardas sutampa tai mums uzkraus puslapi(res.send({ msg: 'ok', key });) jei ne, neatidarysres.send({ msg: 'error', key: '' });
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

app.get('/', (req, res) => {//1-pati pradzia
  res.send('Hello World!');
})
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
//505buvo be administratoriaus prisijungimo app.get('/trees-manager', (req, res) => {
//505 su administratoriaus prisijungimu app.get('/admin/trees-manager', (req, res) => {
//Read //2 bendraujam su serveriu ir issitraukiam info is savo D.B.///////
app.get('/admin/manikiuro-manager', (req, res) => {
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
////////////////////////////
/////////////////////////
  //Create lenteles itasymas
  //3.mygtuko paspaudimas- kuris is Create.jsx paims informaciaj (kai paspausim mygtuka) ir ja issius ir irasys i serveri////
//3.Create.jsx info isaugojimas serveryje
app.post('/manikiuro-manager', (req, res) => { //2 bendraujam su serveriu   //1-pati pradzia     <- http://localhost:3003/trees-manager api puslapio pavadinimas
  
  const sql = `
  INSERT INTO salonas
  (vardas, tipas, kaina, trukme, nuotrauka)
  VALUES (?, ?, ?, ?, ?)
  `;
  con.query(
    sql,
    [req.body.vardas, req.body.tipas, !req.body.kaina ? 0 : req.body.kaina, !req.body.trukme ? 0 : req.body.trukme, req.body.nuotrauka], //jeigu tuscias trukmes ir kaina laukelis bus 0
    (err, results) => {
      if (err) {
        throw err;
      }
      res.send(results);
    }
  );
});
/////////////////////////////
////////////////////////////
//deletle-mygtukas
////6.Istrinimo mygtukas is ManikiuroListoAtvaizdavimas.jsx kuris istrins visa jo info///
app.delete('/manikiuro-manager/:id', (req, res) => { //delytinam is trees lnteles kurio id yra ?(kazkoks)
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

//REDAGUOTI su nuotrauka
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

/////////////////////////
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

/////////////////
////////////////
//FRONTO DALIS------------------->
/////////////////////////
//////////////////////////
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


  /////////////////////////////////// 404//+KOMENTARAI aprasymas fronte//505 ir cia isidedam m.nuotrauka,
//???? is kur tas cid - k.id AS cid- cia mes pervadinom savo k.id i cid
//m.id AS id - irgi pervadinom (kazkodel neitraukem i ta sarasa medziai_id)
//FROM table1 <- is lentels trees 
///LEFT JOIN table2 <- prijungiam lentele komentarai(ji turi buti kaireje puseje phpMyAdmin kur su virvute jungiam)
//ON table1.column_name = table2.column_vardas; <- nusakom taisykle pagal ka jas jungiam ON m.id = k.medziai_id (trees.id ir komentarai.medziai_id)
///m.id AS id, m.vardas, m.kaina, m.tipas, m.count, m.sum, k.con, k.id AS cid
//m.id AS id, m.vardas, m.kaina, m.tipas, m.count, m.sum, GROUP_CONCAT(k.com, '-^o^-') AS comments, k.id AS cid !!! pas mane con o ne com
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

///////////////////
///////////////////
/////////////////////


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