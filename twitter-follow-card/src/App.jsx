import Card from "./components/Card.jsx"

const users = [
  {
    userName: 'midudev',
    name: 'Miguel Ángel Durán',
    isFollowing: true
  },
  {
    userName: 'pheralb',
    name: 'Pablo H.',
    isFollowing: false
  },
  {
    userName: 'PacoHdezs',
    name: 'Paco Hdez',
    isFollowing: true
  },
  {
    userName: 'TMChein',
    name: 'Tomas',
    isFollowing: false
  }
]

function App() {
  return (
    <div>
      {users.map(({ userName, name, isFollowing}) => 
        <Card
          key={userName}
          username={userName}
          name={name}
          following={isFollowing}
        >

        </Card>
      )}
    </div>
  )
}

export default App
