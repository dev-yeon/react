import {Link} from "react-router-dom"
export default function ItemList(){
  const items = [
    {id : 1, name: 'item1'},
    {id : 2, name: 'item2'},
    {id : 3, name: 'item3'},
    {id : 4, name: 'item4'},
    {id : 5, name: 'item5'},
  ]
  return (
    <>
      <h1>아이템 리스트</h1>
      <ul>
        {items.map((el)=>(
          <li key={el.id}>
            <Link to={`/items/${el.id}`}>el.name</Link>
          </li>
        ))}
      </ul>
    </>
  )
}