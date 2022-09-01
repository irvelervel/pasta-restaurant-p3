import { Component } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

// questi sono le proprietà che il server si aspetta di ricevere
// ad ogni invio di prenotazione:
// name <-- string
// phone <-- string/number
// numberOfPeople <-- string/number
// smoking <-- boolean
// dateTime <-- date/string
// specialRequests <-- string

class ReservationForm extends Component {
  state = {
    reservation: {
      name: '',
      phone: '',
      numberOfPeople: 1,
      smoking: false,
      dateTime: '',
      specialRequests: '',
    },
  }

  // il mio scopo è creare degli input field CONTROLLATI
  // controllati === con una two-way data binding
  // significa che inserendo i caratteri nei campi di testo io vado a modificare il mio state
  // significa anche che il valore del campo di testo viene LETTO in ogni momento dallo state

  // propertyName può essere name, phone, numberOfPeople ecc.

  handleChange = (propertyName, propertyValue) => {
    this.setState({
      reservation: {
        ...this.state.reservation,
        [propertyName]: propertyValue,
        // se io voglio creare una proprietà di un oggetto a partire da
        // una variable, un parametro, un qualcosa che debba venire "valutato"
        // devo dichiararla dentro l'oggetto tra parentesi quadre
      },
    })
  }

  //  con ASYNC/AWAIT
  //   handleSubmit = async (e) => {
  //     e.preventDefault()
  //     console.log('inviamo la prenotazione!')
  //     try {
  //   let response = await fetch(
  //     'https://striveschool-api.herokuapp.com/api/reservation',
  //     {
  //       method: 'POST',
  //       body: JSON.stringify(this.state.reservation),
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     }
  //   )
  //       if (response.ok) {
  //         // le API hanno tornato 200, siamo a posto :)
  // alert('prenotazione completata!')
  // this.setState({
  //   reservation: {
  //     name: '',
  //     phone: '',
  //     numberOfPeople: 1,
  //     smoking: false,
  //     dateTime: '',
  //     specialRequests: '',
  //   },
  // })
  //   } else {
  //     alert('errore durante la prenotazione')
  //   }
  //     } catch (error) {
  //       console.log('something went wrong', error)
  //     }
  //   }

  // CON .THEN() e .CATCH()
  handleSubmit = async (e) => {
    e.preventDefault()
    console.log('inviamo la prenotazione!')
    fetch('https://striveschool-api.herokuapp.com/api/reservation', {
      method: 'POST',
      body: JSON.stringify(this.state.reservation),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          alert('prenotazione completata!')
          this.setState({
            reservation: {
              name: '',
              phone: '',
              numberOfPeople: 1,
              smoking: false,
              dateTime: '',
              specialRequests: '',
            },
          })
        } else {
          alert('errore durante la prenotazione')
        }
      })
      .catch((error) => {
        console.log('something went wrong', error)
      })
  }

  render() {
    return (
      <Container
      // style={{
      //   backgroundColor:
      //     this.state.reservation.name === 'Stefano' ? 'red' : '#fff',
      // }}
      >
        <Row className={'justify-content-center ' + this.props.customClassName}>
          <Col xs={12} md={6}>
            <h2 className="text-center my-4">Prenota il tuo tavolo qui!</h2>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label>Il tuo nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci il tuo nome"
                  value={this.state.reservation.name}
                  onChange={(e) => {
                    console.log(e.target.value)
                    // this.setState({
                    //   reservation: {
                    //     // lo spread operator (...) crea una copia
                    //     // di tutte le proprietà di reservation
                    //     // questo mi serve a mantenere integra
                    //     // la shape, la forma del mio state
                    //     // in ogni momento
                    //     ...this.state.reservation,
                    //     name: e.target.value,
                    //   },
                    // })
                    this.handleChange('name', e.target.value)
                  }}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Numero di telefono</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Inserisci il tuo numero di telefono"
                  value={this.state.reservation.phone}
                  onChange={(e) => {
                    // qua chiamo handleChange
                    this.handleChange('phone', e.target.value)
                  }}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Numero di persone</Form.Label>
                <Form.Control
                  as="select"
                  value={this.state.reservation.numberOfPeople}
                  onChange={(e) => {
                    this.handleChange('numberOfPeople', e.target.value)
                  }}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Fumatori?"
                  checked={this.state.reservation.smoking}
                  onChange={(e) => {
                    // this.setState({
                    //   reservation: {
                    //     ...this.state.reservation, // copia di tutto
                    //     smoking: e.target.checked,
                    //   },
                    // })
                    this.handleChange('smoking', e.target.checked)
                  }}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Data e ora</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={this.state.reservation.dateTime}
                  onChange={(e) => {
                    this.handleChange('dateTime', e.target.value)
                  }}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Richieste speciali</Form.Label>
                <Form.Control
                  type="text"
                  as="textarea"
                  rows={3}
                  placeholder="Allergie, intolleranze, bambini..."
                  value={this.state.reservation.specialRequests}
                  onChange={(e) => {
                    this.handleChange('specialRequests', e.target.value)
                  }}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Invia prenotazione
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default ReservationForm
