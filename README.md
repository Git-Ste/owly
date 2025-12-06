# Owly
## Linee guida del progetto
<ol>
  <li>
    <p>Implementare una barra di ricerca (Google style) in cui l'utente possa inserire una categoria letteraria</p>
  </li>
  <li>
    <p>Premendo "invio" o cliccando l'apposito pulsante di ricerca l'utente può visualizzare il titolo, la copertina e gli autori dei libri appartenenti alla categoria richiesta</p>
  </li>
  <li>
    <p>Attraverso l'apposto pulsante l'utente può visualizzare la descrizione del libro</p>
  </li>
</ol>

## Sviluppo: logica e funzionamento
Quando l’utente, dopo aver digitato la categoria letteraria, preme Invio o l’apposito pulsante, viene chiamata una funzione asincrona che attende la risposta di una fetch all’API di Open Library. La promise viene convertita in JSON e, per ogni opera contenuta nel risultato, viene creata dinamicamente una sezione dedicata, con i rispettivi autori, la copertina, il titolo e un’icona relativa al genere.

La gestione della descrizione, che si apre e si chiude rispettivamente tramite i pulsanti “+” e “-”, è affidata a un’altra funzione asincrona che, attraverso una fetch all’indirizzo dell’API — a cui viene aggiunta la key del libro in questione (salvata come ID del pulsante) — ottiene la descrizione dell’opera.

Per tornare alla sezione di ricerca è sufficiente premere l’icona della lente d’ingrandimento posizionata in basso a destra (<em>position: fixed</em>).

## Lo stile 
<img src="img/owly.png">

## Linguaggi utilizzati
