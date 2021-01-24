import './App.css'
import React from "react"
import People from "./People"

const App = () => {
  const JSON_URL = 'https://raw.githubusercontent.com/solita/dev-academy-2021/main/names.json'
  const [people, setPeople] = React.useState([])
  const [filter, setFilter] = React.useState('')
  const [specificName, setSpecificName] = React.useState('')

  const sortByName = (people) => setPeople([...people].sort(
    (p1, p2) => p1.name < p2.name ? -1 : 1)
  )
  const sortByCount = (people) => setPeople([...people].sort(
    (p1, p2) => {
      if (p1.amount > p2.amount) return -1
      else if (p1.amount < p2.amount) return 1
      else {
        if (p1.name < p2.name) return -1
        else return 1
      }
    }
  ))

  const showPerson = () => {
    let text = `No people found with name ${specificName}`
    people.forEach(p => {
      if (p.name.toLowerCase() === specificName.toLowerCase()) {
        text = `There are ${p.amount} people with name ${p.name}`
      }
    })
    alert(text)
  }

  React.useEffect(() => {
    fetch(JSON_URL)
      .then(res => res.json())
      .then(json => sortByCount(json.names))
      .catch(console.log)
  }, [])

  return (
    <div className="App">
      <h1 id='header'>Names of Solita</h1>
      <button onClick={() => sortByName(people)}>Sort by name</button>
      <button onClick={() => sortByCount(people)}>Sort by amount</button>
      <br/>
      Filter by name <input type='text'
                            value={filter}
                            onChange={e => setFilter(e.target.value)}/>
      <br/>
      Search for person <input type='text'
                               value={specificName}
                               onChange={e => setSpecificName(e.target.value)}/>
      <button onClick={showPerson}>Search</button>
      <People filter={filter} people={people}/>
      <h2>{people.reduce((sum, p) => sum + p.amount, 0)} people total</h2>
    </div>
  )
}

export default App
