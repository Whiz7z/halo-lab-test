
import Game from '../components/Game'
import { useStore } from '../store/store'

const GamePage = () => {
  const {coordinates} = useStore()
  return (
    <Game caveData={coordinates} />
  )
}

export default GamePage
