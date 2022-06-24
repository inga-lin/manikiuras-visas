import { useEffect } from "react";
import { useState } from "react";

function Modal ({setRedaguotiModalData, redaguotiModalData, setRedaguotiCreateData}){
//Modalas kopintas is Creato.jsx
//7
    const [ vardas, setVardas] = useState('');
    const [ tipas, setTipas] = useState("1");
    const [ kaina, setKaina] = useState('');
    const [ trukme, setTrukme] = useState('');
    //const [ nuotrauka, setNuotrauka] = useState('');
    const [ id, setId] = useState('0');//cia taip reik

    const buttonHandler = () => {
        setRedaguotiCreateData({ //8 Create paspaudus redaguoti(edit) mygtuka.....
            vardas,
            tipas,
            kaina,
            trukme,
            //nuotrauka,
            id //cia taip reik
        });
        setRedaguotiModalData(null);//padaro kad uzsidarytu modalas
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
            //case 'nuotrauka':
               // setNuotrauka(e.target.value);
               // break;
            default:
        }
    }

    //per cia padarom kad modale matytusi redaguojami duomenys
    useEffect(() => {
        if (redaguotiModalData === null){
            setVardas('');//cia kai uzpildysim lentele ji nusiresetins i tuscius laukelius
            setTipas('1');
            setKaina('');
            setTrukme('');
            //setNuotrauka('');
        } else {
            setVardas(redaguotiModalData.vardas);//cia kai uzpildysim lentele ji nusiresetins i tuscius laukelius
            setTipas(redaguotiModalData.tipas);
            setKaina(redaguotiModalData.kaina);
            setTrukme(redaguotiModalData.trukme);
            //setNuotrauka(redaguotiModalData.nuotrauka);
            setId(redaguotiModalData.id);//cia taip reik
        }
    },[redaguotiModalData])

    //jeigu redaguoti mygtukas nepaspaustas nerodyti modalo
    if (redaguotiModalData === null){
        return null;
    }
    return(
        <div className="modal modal-dialog-centered" id="modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title" id="exampleModalLabel">Redaguoti</h2>
                        <button type="button" className="close" onClick={() => setRedaguotiModalData(null)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="sarasas">
                            <div className="formos-vidus">
                                <div className="forma">
                                    <label>Manikiuro meistre:</label>
                                    <input type="text" className="form-control" placeholder="Manikiuro meistre" value={vardas} onChange={e => inputHandler(e, 'vardas')}/>
                                </div>
                                <div className="forma">
                                    <label>Manikiūro rūšys:</label>
                                    <select className="form-control" value={tipas}  onChange={e => inputHandler(e, 'tipas')} >
                                       <option  value="1">Klasikinis manikiūras</option>
                                       <option  value="2">Prancūziškas manikiūras</option>
                                       <option  value="3">Kombinuotas manikiūras</option>
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
                                    {/*<input  type="file" className="forma-foto" value={nuotrauka}  onChange={e => inputHandler(e, 'nuotrauka')}/>
                                */}</div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className=" save" onClick={buttonHandler}>Išsaugoti</button>{/*onClick={buttonHandler} jei nieko nereik perduoti neviniojam i popieriuka*/}
                                <button type="button" className=" cancel" onClick={() => setRedaguotiModalData(null)}>Uždaryti</button>{/*onClick={() => setRedaguotiModalData(null)} jei reik ka nors perduoti viniojam i popieriuka*/}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Modal;