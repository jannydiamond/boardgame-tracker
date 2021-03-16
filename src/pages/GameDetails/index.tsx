import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { RootState } from 'Redux/store'
import { selectGameById } from 'Redux/Games'

import { useModal } from 'hooks/useModal'

import AddSessionModal from 'components/Modals/AddSessionModal'
import FloatingButton from 'components/FloatingButton'
import Main from 'components/__styled__/Main'

import Header from './Header'
import Details from './Details'
import Sessions from './Sessions'

const GameDetails = () => {
  // @ts-ignore
  const { gameId } = useParams()

  const game = useSelector((state: RootState) =>
    selectGameById(state, { gameId })
  )

  const addSessionModal = useModal()

  if (!game) {
    return null
  }

  return (
    <>
      <Header gameId={gameId} />
      <Main>
        <Details gameId={gameId} />
        <Sessions gameId={gameId} />
      </Main>
      <FloatingButton
        variant="secondary"
        onClick={() => addSessionModal.show()}
      >
        Add Session
      </FloatingButton>
      <AddSessionModal modal={addSessionModal} game={game} />
    </>
  )
}

export default React.memo(GameDetails)