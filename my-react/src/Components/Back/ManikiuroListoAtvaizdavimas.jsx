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
                        <button type="button" className="manikiuro-buttons istrinti" onClick={()=>setIstrintiId({id:manikiuras.id})}>Istrinti</button> {/*////6.Istrinimo mygtukas is ManikiuroListoAtvaizdavimas.jsx kuris istrins visa jo info*/}
                    </div>
                </div>
                <ul className="tree-group">{/*40004 komentaro idejimas*/}
            {                       
            manikiuras.comments ? manikiuras.comments.slice(0, -5).split('-^o^-,').map((c, i) => (
                <li className="list-group-item" key={i}>
                    {c} {/*c-komentaras*/}{/*tree.cid.-komentaru id*/}
                        <div>
                            <button type="button" onClick={() => deleteComment(manikiuras.cid.split(',')[i])} className="btn btn-outline-danger mt-3 deletle">Delete</button>{/*700 komentaro istrinimas*/}
                         </div>
                </li>)) : null
                                 ////40004//slice(0, -5).split('-^o^-,') atemem is app.jx komentaro gala ta katina//c-komentarai, i- indeksai
            }
        </ul>
            </li>
        )
    }
    
    export default ManikiuroListoAtvaizdavimas;