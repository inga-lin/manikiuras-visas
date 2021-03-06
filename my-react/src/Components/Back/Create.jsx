import { useState , useRef } from "react";//606 useRef
import getBase64 from "../Back/getBase64";//606
//3
function Create({setCreateData}) {
    //kiek laukeliu returne tiek turim tureti useState(react xxx)
    const [ vardas, setVardas] = useState('');
    const [ tipas, setTipas] = useState("1");
    const [ kaina, setKaina] = useState('');
    const [ trukme, setTrukme] = useState('');
    //const [ nuotrauka, setNuotrauka] = useState('');

    const fileInput = useRef(); //606

    //3.kas nutiks kai paspausiu mygtuka(issisaugos sita info)
    //const buttonHandler = () => { buvo sita eilute iki antro setCreateData
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
        setVardas('');//cia kai uzpildysim lentele ji nusiresetins i tuscius laukelius
        setTipas('1');
        setKaina('');
        setTrukme('');
    }

    const inputHandler =(e, kuriKontruoliuosim) => {//kontroliuosim ivedimo laukelius
        switch(kuriKontruoliuosim) {
            case 'vardas':
                setVardas(e.target.value);
                break;
            case 'tipas':
                setTipas(e.target.value);
                break;
            case 'kaina':
                setKaina(e.target.value.replace(/,/g, '.'));//susirandam , ir ji paversim i .  nes kitaip nesupras rwactas
                break;
            case 'trukme':
                setTrukme(e.target.value.replace(/,/g, '.'));
                break;
            default:
        }
    }

    return(
        <div className="stulpeliu-vaikas2">
            <div className="titleee">
                <h2>Add New Manikiuras </h2>
            </div>
            <div className="sarasas">
                <div className="formos-vidus">
                    <div className="forma">
                        <label>Meistr??:</label>
                        <input type="text" className="form-control" placeholder="Manikiuro meistre" value={vardas} onChange={e => inputHandler(e, 'vardas')}/>
                    </div>
                    <div className="forma">
                        <label>R????ys:</label>
                        <select className="form-control" value={tipas}  onChange={e => inputHandler(e, 'tipas')} >
                            <option  value="1">Klasikinis maniki??ras</option>
                            <option  value="2">Pranc??zi??kas maniki??ras</option>
                            <option  value="3">Kombinuotas maniki??ras</option>
                         </select>
                    </div>
                    <div className="forma">
                        <label>Kaina:</label>
                        <input type="text" className="form-control" placeholder="Kaina eurais" value={kaina}  onChange={e => inputHandler(e, 'kaina')} />
                    </div>
                    <div className="forma">
                        <label>Trukme:</label>
                        <input type="text" className="form-control"placeholder="Trukme" value={trukme}  onChange={e => inputHandler(e, 'trukme')}/>
                    </div>
                    <div className="forma">{/*606 per cia idesim nuotraukas*/}
                        <label>Nuotrauka:</label>
                        <input ref={fileInput} type="file" className="forma-foto"/>{/*505 cia butinai dadeti ref={fileInput}-(ateina su getBase64 atsiradimu) o type="file"- su input laukelio kurimu, kad buutonas failo pasirinkimui atsirastu*/}
                    </div>
                    <div className="forma-buttonss">
                        <button type="button" className="forma-buttons" onClick={buttonHandler}>Irasyti</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Create;

/* BE NUOTRAUKOS BUVO
import { useState } from "react";

//3
function Create({setCreateData}) {
    //kiek laukeliu returne tiek turim tureti useState(react xxx)
    const [ vardas, setVardas] = useState('');
    const [ tipas, setTipas] = useState("1");
    const [ kaina, setKaina] = useState('');
    const [ trukme, setTrukme] = useState('');
    const [ nuotrauka, setNuotrauka] = useState('');


    //3.kas nutiks kai paspausiu mygtuka(issisaugos sita info)
    const buttonHandler = () => {
        setCreateData({
            vardas,
            tipas,
            kaina,
            trukme,
            nuotrauka
        });
        setVardas('');//cia kai uzpildysim lentele ji nusiresetins i tuscius laukelius
        setTipas('1');
        setKaina('');
        setTrukme('');
        //setNuotrauka('');
    }

    const inputHandler =(e, kuriKontruoliuosim) => {//kontroliuosim ivedimo laukelius
        switch(kuriKontruoliuosim) {
            case 'vardas':
                setVardas(e.target.value);
                break;
            case 'tipas':
                setTipas(e.target.value);
                break;
            case 'kaina':
                setKaina(e.target.value.replace(/,/g, '.'));//susirandam , ir ji paversim i .  nes kitaip nesupras rwactas
                break;
            case 'trukme':
                setTrukme(e.target.value.replace(/,/g, '.'));
                break;
            case 'nuotrauka':
                setNuotrauka(e.target.value);
                break;
            default:
        }
    }

    return(
        <div className="stulpeliu-vaikas2">
            <div className="titleee">
                <h2>Add New Manikiuras </h2>
            </div>
            <div className="sarasas">
                <div className="formos-vidus">
                    <div className="forma">
                        <label>Meistr??:</label>
                        <input type="text" className="form-control" placeholder="Manikiuro meistre" value={vardas} onChange={e => inputHandler(e, 'vardas')}/>
                    </div>
                    <div className="forma">
                        <label>R????ys:</label>
                        <select className="form-control" value={tipas}  onChange={e => inputHandler(e, 'tipas')} >
                            <option  value="1">Klasikinis maniki??ras</option>
                            <option  value="2">Pranc??zi??kas maniki??ras</option>
                            <option  value="3">Kombinuotas maniki??ras</option>
                         </select>
                    </div>
                    <div className="forma">
                        <label>Kaina:</label>
                        <input type="text" className="form-control" placeholder="Kaina eurais" value={kaina}  onChange={e => inputHandler(e, 'kaina')} />
                    </div>
                    <div className="forma">
                        <label>Trukme:</label>
                        <input type="text" className="form-control"placeholder="Trukme" value={trukme}  onChange={e => inputHandler(e, 'trukme')}/>
                    </div>
                    <div className="forma">
                        <label>Nuotrauka:</label>
                        <input  type="file" className="forma-foto" value={nuotrauka}  onChange={e => inputHandler(e, 'nuotrauka')}/>
                    </div>
                    <div className="forma-buttonss">
                        <button type="button" className="forma-buttons" onClick={buttonHandler}>Irasyti</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Create;
 */