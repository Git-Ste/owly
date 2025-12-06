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
Quando l'utente, dopo aver digitato la categoria letteraria, digita 'invio' o preme l'apposito pulsante viene chiamata una funzione asincrona che attende la risposta di una fetch all'API 'Open Library'. La promise viene convertita in json e per ogni opera contenuta nel file viene creata dinamicamente una sezione dedicata, con rispettivi autori, copertina, titolo e icona riguardante il genere.

La gestione della descrizione, che si apre e chiude rispettivamnete attraverso i pulsanti "+" e "-", è affidata ad un'altra funzione asincrona, che attraverso una fetch all'indirizzo dell'API, a cui è aggiunta la key del libro in questione (salvata come ID del button), ottiene la descrizione dell'opera. 

Per tornare alla sezione di ricerca è sufficiente premere l'apposita icona della lente di ingrandimento posizionata in basso a destra (position: fixed).

## Lo stile 
<img src="img/owly.png">

## Linguaggi utilizzati
