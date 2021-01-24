const Person = ({person}) => (
  <tr className='person'>
    <td>{person.name}</td>
    <td>{person.amount}</td>
  </tr>
)

export default Person
