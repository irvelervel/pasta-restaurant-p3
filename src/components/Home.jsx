import { Component } from 'react'
import { Container, Row, Col, Carousel, ListGroup } from 'react-bootstrap'
import menu from '../data/menu.json'

// per fare in modo che la lista rispecchi in ogni momento le recensioni
// dell'ultima pasta selezionata (cliccata), ho bisogno di inserire nel
// componente Home uno STATE
// lo STATE è una specie di "memoria" del componente
// lo STATE esiste solamente nei componenti CLASSE

class Home extends Component {
  // lo state può esistere solo in un componente Classe
  // DEVE chiamarsi "state"
  // state è sempre un oggetto
  state = {
    selectedPasta: null, // null è il valore iniziale di selectedPasta
  }
  // lo state si resetta aggiornando la pagina

  render() {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <div className="text-center my-3">
              <h1>Benvenuti!</h1>
              <h3>Niente secondi piatti qui :)</h3>
            </div>
            <Carousel>
              {/* React genera dinamicamente elementi utilizzando .map() */}
              {menu.map((pasta, i) => (
                <Carousel.Item
                  // la prop "key" va inserita nell'elemento ritornato
                  // dalla callback di .map()
                  key={pasta.id}
                  onClick={() => {
                    console.log('cliccato!')
                    // lo state non è modificabile direttamente
                    // per cambiare il valore di una sua proprietà
                    // è necessario usare il metodo setState
                    this.setState({
                      selectedPasta: pasta,
                      // questo mi cambia il valore di selectedPasta
                      // con l'intero oggetto della pasta cliccata
                    })
                  }}
                >
                  <img
                    className="d-block w-100"
                    src={pasta.image}
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <h3>{pasta.name}</h3>
                    <p>{pasta.description}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
        <Row className="justify-content-center mt-4">
          <Col xs={12} md={6} className="text-center">
            <ListGroup>
              {this.state.selectedPasta?.comments.map((review) => (
                <ListGroup.Item key={review.id}>
                  {review.author} - {review.comment}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Home
