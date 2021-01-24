import Person from "./Person"

const People = ({people, filter}) => (
  <table>
    <tr>
      <th>Name</th>
      <th>Amount</th>
    </tr>
    {
      people
        .filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
        .map((p, i) => <Person key={i} person={p}/>)
    }
  </table>
)

export default People
