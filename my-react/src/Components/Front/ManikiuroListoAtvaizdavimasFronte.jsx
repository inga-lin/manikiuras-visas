import { useState } from "react";

function ManikiuroListoAtvaizdavimasFronte({manikiuras, saveComment}) { //40004 saveComment-komentarai
    const [comment, setComment] = useState('');//40004 komentaro atvaizdavimas

    //40004 komentaro atvaizdavimas
    const clickComment = () => {
        saveComment(manikiuras.id, comment);//saveComment perduoda tree.id ir comment is useState
        setComment('');//kai issiunciam konentara laukeli paverciam i tuscia laukeli
    } 


    return(
        <li className="list">
            <div className="manikiuro-listass">
                <div className="mani-listas">
                    <span>{manikiuras.vardas}</span>
                    <span>{['Klasikinis manikiūras', 'Prancūziškas manikiūras', 'Kombinuotas manikiūras'][manikiuras.tipas - 1]}</span>
                    <span>{manikiuras.kaina} eurai</span>
                    <span>{manikiuras.trukme} val.</span>
                </div>
                <div className="komentarai" >{/*40004 komentaro atvaizdavimas*/}
                    <div className="">
                        <textarea className="kom-textarea" rows="4"  minLength="10" maxLength="60" onChange={e => setComment(e.target.value)} value={comment} placeholder="Palik atsiliepima čia" />{/*40004 komentaro atvaizdavimas*/}
                    </div>
                    <button type="button" className="kom-button" onClick={clickComment}>Išsaugoti</button>{/*40004 komentaro atvaizdavimas*/}
                </div>
                <div>
                    <h3 className="atsiliepimai">Atsiliepimai</h3>
                </div>
                <div className="kom-atvaizdavimas">
                    {
                        manikiuras.comments ? manikiuras.comments.slice(0, -5).split('-^o^-,').map((c, i) => <div className="kom-atvaizdavimass" key={i}>{c}</div>) : null ////404//slice(0, -5).split('-^o^-,') atemem is app.jx komentaro gala ta katina//c-komentarai, i- indeksai//nusiimsim ta kartinuka su kableliu//vietoje katinuko galim ka nors kito papaisyti tik skaicius pasiredaguoti
                    }
                </div>
            </div>

        </li>
    )
}
export default ManikiuroListoAtvaizdavimasFronte;