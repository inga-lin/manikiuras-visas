function ManikiuroListoAtvaizdavimas({manikiuras, setIstrintiId, setRedaguotiModalData, deleteComment}) {
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
                        <button type="button" className="manikiuro-buttons istrinti" onClick={()=>setIstrintiId({id:manikiuras.id})}>Ištrinti</button> {/*////6.Istrinimo mygtukas is ManikiuroListoAtvaizdavimas.jsx kuris istrins visa jo info*/}
                    </div>
                </div>
                <ul className="back-komentarai">{/*40004 komentaro idejimas*/}
                <h3>Komentarai</h3>
                   {                       
                        manikiuras.comments ? manikiuras.comments.slice(0, -5).split('-^o^-,').map((c, i) => (
                            
                            <li className="back-komentaras" key={i}>{c} {/*c-komentaras*/}{/*tree.cid.-komentaru id*/}
                            <div className="back-komentaras-istrinti">
                                <button type="button" className="manikiuro-buttons istrinti trint" onClick={() => deleteComment(manikiuras.cid.split(',')[i])}>Ištrinti</button>{/*700 komentaro istrinimas*/}
                            </div>
                            </li>)) : null
                                 ////40004//slice(0, -5).split('-^o^-,') atemem is app.jx komentaro gala ta katina//c-komentarai, i- indeksai
                    }
                </ul>
            </li>
        )
    }
    
    export default ManikiuroListoAtvaizdavimas;