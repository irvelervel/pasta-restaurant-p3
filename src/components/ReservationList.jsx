// ReservationList è un componente che recupererà dal server la lista delle prenotazioni
// esistenti e si occuperà di presentarle all'utente

import { Component } from 'react'
// import { Container, Row, Col } from 'react-bootstrap'
// un import generico come questo importa l'intera libreria react-bootstrap
// anche se ne state selezionando solo 3 componenti

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
// degli import così selettivi, se eseguiti come prassi, renderanno
// il bundle della vostra applicazione più leggero nel momento in cui
// la dovrete deployare online

import { parseISO, format } from 'date-fns'

// recuperare una risorsa può richiedere del tempo, anche svariati secondi
// un'applicazione moderna presenta all'utente le parti statiche IMMEDIATAMENTE,
// mostrando un indicatore di caricamento per addolcire l'attesa del contenuto dinamico

// se il vostro componente necessita di recuperare una risorsa esterna,
// createlo come CLASSE

// PASSAGGI IN CORSO:
// 1) lo stato viene inizializzato con un array reservations vuoto
// 2) render() viene invocato per la prima volta, essendo già collegato
// allo stato ma non avendo elementi da mostrare al momento, renderizzerà
// solamente le parti STATICHE dell'interfaccia (titolo, struttura di BS etc.)
// 3) finito il primo render, parte (se presente) componentDidMount
// 4) componentDidMount esegue la funzione di fetch() e recupera i dati.
// finito il recupero, i dati vengono inseriti nello stato con un setState
// 5) a causa del setState e del cambiamento di stato, render() viene invocato
// una seconda volta: le parti statiche sono le stesse di prima, ma il contenuto
// della lista questa volta è diverso e questa seconda invocazione si
// occuperà di popolarla con i nuovi list items

class ReservationList extends Component {
  state = {
    reservations: [],
    // inizializzare reservations come array vuoto è un'ottima scelta
    // in quanto rispecchia il tipo di dato che andremo a recuperare
    // e fa in modo che un eventuale .map() nel JSX semplicemente
    // non renderizzi alcun elemento dinamico
    loading: true,
    error: false,
  }

  // quindi quello che ci servirebbe sarebbe un modo per effettuare
  // il fetch delle prenotazioni immediatamente dopo la presentazione
  // delle parti STATICHE della pagina
  // sarebbe fantastico trovare un modo per recuperare i dati
  // DOPO la prima invocazione di render()...

  componentDidMount = () => {
    // componentDidMount succede un istante dopo la fine del montaggio
    // del componente (ovvero la prima invocazione di render() )
    console.log('sono componentDidMount')
    // componentDidMount viene eseguito UNA VOLTA SOLA

    // il fatto che componentDidMount venga eseguito una volta sola,
    // unito al fatto che viene eseguito in modo NON-BLOCCANTE
    // (dopo il render iniziale) lo rende PERFETTO per eseguire
    // operazioni di fetch() iniziali

    // invoco fetchReservations()
    this.fetchReservations()
  }

  fetchReservations = async () => {
    try {
      let response = await fetch(
        'https://striveschool-api.herokuapp.com/api/comments/',
        {
          method: 'POST',
          body: JSON.stringify({
            comment:
              "A good book but definitely I don't like many parts of the plot",
            rate: '3',
            elementId: '0316438960',
          }),
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzEwOGU4MWVkZDY3ODAwMTUwN2Q3MzQiLCJpYXQiOjE2NjIwMjk0NDEsImV4cCI6MTY2MzIzOTA0MX0.V3BZhbimXxKJnE2_CHALYYWFMGvvzYXBcX7sjT60dK4',
          },
        }
      )
      if (response.ok) {
        let data = await response.json()
        console.log(data)
        // salvare nello state il nostro array data
        setTimeout(() => {
          this.setState({
            // reservations: [], // simuliamo un database vuoto
            reservations: data,
            loading: false,
          })
        }, 500)
        // ogni volta che cambia lo stato, render() viene invocato di nuovo
      } else {
        // alert('something went wrong')
        this.setState({
          loading: false,
          error: true,
        })
      }
    } catch (error) {
      console.log(error)
      this.setState({
        loading: false,
        error: true,
      })
    }
  }

  render() {
    // render viene eseguito la prima volta al montaggio,
    // ma viene eseguito NUOVAMENTE ogni volta che c'è un cambio nello
    // state o nelle props
    console.log('sono render')
    // this.fetchReservations() // NON FATELO
    // fare un setState nel render === infinite loop
    return (
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <h2 className="text-center my-4">Attuali prenotazioni:</h2>
            {/* qua inseriamo la lista dinamica */}
            <div className="text-center">
              {this.state.error && (
                <Alert variant="danger">
                  Errore nel recupero delle prenotazioni :(
                </Alert>
              )}
              {/* render condizionale dello Spinner */}
              {this.state.loading && ( // short-circuit operator
                <Spinner animation="border" variant="success" />
              )}
            </div>
            <ListGroup>
              {this.state.reservations.length === 0 &&
                !this.state.loading &&
                !this.state.error && (
                  <ListGroup.Item>
                    Non esistono al momento prenotazioni
                  </ListGroup.Item>
                )}
              {this.state.reservations.map((reservation) => (
                <ListGroup.Item key={reservation._id}>
                  {reservation.name} per {reservation.numberOfPeople} -{' '}
                  {/* voglio trasformare la proprietà dateTime della prenotazione in qualcosa di più leggibile*/}
                  {/* useremo date-fns, servono due passaggi: 
                    1) trasformare la stringa dateTime in un oggetto Date
                    2) formattare questo oggetto Date in un qualcosa di più leggibile
                  */}
                  {
                    // 2)
                    format(
                      parseISO(reservation.dateTime), // 1)
                      'd MMMM yyyy - HH:mm'
                    )
                  }
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default ReservationList
