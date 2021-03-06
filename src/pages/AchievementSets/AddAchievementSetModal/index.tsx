import React from 'react'

import * as types from 'types'

import Body from './Body'
import Footer from './Footer'

type Props = {
  modal: types.Modal
}

const AddAchievementSetModal = ({ modal }: Props) => {
  return (
    <modal.RenderModal
      titleLabel="Add Achievement Set"
      footer={<Footer modal={modal} />}
    >
      <Body modal={modal} />
    </modal.RenderModal>
  )
}

export default React.memo(AddAchievementSetModal)
