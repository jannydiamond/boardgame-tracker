import React from 'react'

import * as types from 'types'

import Button from 'components/__styled__/Button'

type Props = {
  modal: types.Modal
}

const Footer = ({ modal }: Props) => {
  const handleCancel = () => {
    modal.hide()
  }

  return (
    <>
      <Button onClick={handleCancel} variant="secondary" size="small">
        Cancel
      </Button>
      <Button type="submit" size="small" form="editGame">
        Save
      </Button>
    </>
  )
}

export default React.memo(Footer)
