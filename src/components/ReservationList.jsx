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
// degli import così selettivi, se eseguiti come prassi, renderanno
// il bundle della vostra applicazione più leggero nel momento in cui
// la dovrete deployare online

// recuperare una risorsa può richiedere del tempo, anche svariati secondi
// un'applicazione moderna presenta all'utente le parti statiche IMMEDIATAMENTE,
// mostrando un indicatore di caricamento per addolcire l'attesa del contenuto dinamico

// se il vostro componente necessita di recuperare una risorsa esterna,
// createlo come CLASSE

class ReservationList extends Component {
  state = {
    reservations: [],
    // inizializzare reservations come array vuoto è un'ottima scelta
    // in quanto rispecchia il tipo di dato che andremo a recuperare
    // e fa in modo che un eventuale .map() nel JSX semplicemente
    // non renderizzi alcun elemento dinamico
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
        'https://striveschool-api.herokuapp.com/api/reservation',
        {
          method: 'GET',
        }
      ) // GET
      if (response.ok) {
        let data = await response.json()
        console.log(data)
        // salvare nello state il nostro array data
        this.setState({
          reservations: data,
        })
        // ogni volta che cambia lo stato, render() viene invocato di nuovo
      } else {
        alert('something went wrong')
      }
    } catch (error) {
      console.log(error)
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
            <ListGroup>
              {this.state.reservations.map((reservation) => (
                <ListGroup.Item key={reservation._id}>
                  {reservation.name} per {reservation.numberOfPeople} -{' '}
                  {reservation.dateTime}
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
