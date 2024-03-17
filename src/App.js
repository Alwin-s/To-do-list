import './App.css';
import Todo from "./Todo"
function App() {
  const arr=[{
    id:1,
    name:"Alwin"
  },
  {
    id:2,
    name:"Aln"
  }
,
{
  id:3,
  name:"An"
}
,{
  id:4,
  name:"Alwi"
}]

const index=arr.findIndex((item)=>item.id === 22)
console.log(index);
  return (
    <div className="App">
      <Todo/>
    
    </div>
  );
}

export default App;
