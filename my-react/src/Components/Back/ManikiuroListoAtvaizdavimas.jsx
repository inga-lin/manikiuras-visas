function ManikiuroListoAtvaizdavimas({manikiuras, setIstrintiId, setRedaguotiModalData}) {
    //5. ManikiuroListoAtvaizdavimas
        return(
            <li className='li'>
                <div className="manikiuro-listas">
                    <div className="mani-listas">
                        <span>{manikiuras.vardas}</span>
                        <span>{['Klasikinis manikiūras', 'Prancūziškas manikiūras', 'Kombinuotas manikiūras'][manikiuras.tipas - 1]}</span>
                        <span>{manikiuras.kaina} eurai</span>
                        <span>{manikiuras.trukme} val.</span>
                    </div>
                    <div className="mani-listas">
                        <button type="button" className="manikiuro-buttons redaguoti" onClick={()=>setRedaguotiModalData(manikiuras)}>Redaguoti</button>{/*7.Modalo iskvietimas*/}
                        <button type="button" className="manikiuro-buttons istrinti" onClick={()=>setIstrintiId({id:manikiuras.id})}>Istrinti</button> {/*////6.Istrinimo mygtukas is ManikiuroListoAtvaizdavimas.jsx kuris istrins visa jo info*/}
                    </div>
                </div>
            </li>
        )
    }
    
    export default ManikiuroListoAtvaizdavimas;