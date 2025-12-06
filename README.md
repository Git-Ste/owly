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
Quando l’utente, dopo aver digitato la <em>categoria letteraria</em>, preme <em>Invio</em> o l’apposito pulsante, viene chiamata una <em>funzione asincrona</em> che attende la risposta di una fetch all’API di <em>Open Library</em>.
La promise viene convertita in <em>JSON</em> e, per ogni opera contenuta nel risultato, viene creata dinamicamente una <em>sezione dedicata</em>, con i relativi <em>autori</em>, la <em>copertina</em>, il <em>titolo</em> e un’<em>icona del genere</em>.

La gestione della <em>descrizione</em>, che si apre e si chiude rispettivamente tramite i pulsanti “+” e “-”, è affidata a un’altra <em>funzione asincrona</em> che, attraverso una fetch all’indirizzo dell’API — a cui viene aggiunta la <em>key</em> del libro in questione (salvata come <em>ID del pulsante</em>) — ottiene la <em>descrizione dell’opera</em>.

Per tornare alla <em>sezione di ricerca</em> è sufficiente premere l’<em>icona della lente d’ingrandimento</em> posizionata in basso a destra (<em>position: fixed</em>).

## Lo stile 
<img src="img/owly.png">

## Linguaggi utilizzati
