function ManikiuroListoAtvaizdavimasFronte({manikiuras}) {

    return(
        <li className="list">
            <div className="manikiuro-listass">
                <div className="mani-listas">
                    <span>{manikiuras.vardas}</span>
                    <span>{['Klasikinis manikiūras', 'Prancūziškas manikiūras', 'Kombinuotas manikiūras'][manikiuras.tipas - 1]}</span>
                    <span>{manikiuras.kaina} eurai</span>
                    <span>{manikiuras.trukme} val.</span>
                </div>
            </div>
        </li>
    )
}
export default ManikiuroListoAtvaizdavimasFronte;