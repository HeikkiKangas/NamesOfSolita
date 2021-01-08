import './App.css'
import React from "react"

const App = () => {
  const [persons, setPersons] = React.useState([])
  const [filter, setFilter] = React.useState('')

  const sortByName = (persons) => setPersons([...persons].sort((p1, p2) => p1.name < p2.name ? -1 : 1))
  const sortByCount = (persons) => setPersons([...persons].sort((p1, p2) => {
    if (p1.amount > p2.amount) return -1
    else if (p1.amount < p2.amount) return 1
    else {
      if (p1.name < p2.name) return -1
      else return 1
    }
  }))

  React.useEffect(() => {
    fetch('https://raw.githubusercontent.com/solita/dev-academy-2021/main/names.json')
      .then(res => res.json())
      .then(json => sortByCount(json.names))
      .catch(console.log)
  }, [])

  return (
    <div className="App">
      <button onClick={() => sortByName(persons)}>Sort by name</button>
      <button onClick={() => sortByCount(persons)}>Sort by count</button>
      <br />
      Filter by name <input type='text'
                            value={filter}
                            onChange={(e) =>
                              setFilter(e.target.value)}/>
      <Persons filter={filter} persons={persons}/>
      <h2>Total {persons.reduce((sum, p) => sum + p.amount, 0)} persons</h2>
    </div>
  )
}

const Persons = ({ persons, filter }) => (
  <div>
    {
      persons
        .filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
        .map((p, i) => <Person key={i} person={p}/>)
    }
  </div>
)

const Person = ({ person }) => (
  <div className='person'>
    <h2>{person.name} x {person.amount}</h2>
  </div>
)

export default App
