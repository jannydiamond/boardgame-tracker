import React, {useState} from 'react'

import TitleInput from './TitleInput'
import DescriptionTextarea from './DescriptionTextarea'
import TagsSelect from './TagsSelect'
import VersionInput from './VersionInput'
import AuthorNameInput from './AuthorNameInput'
import AuthorEmailInput from './AuthorEmailInput'
import Form from 'components/__styled__/Form'
import {useDispatch} from 'react-redux'
import {OptionTypeBase} from 'react-select'
import {addAchievementSet} from 'Redux/AchievementSets/sideEffects'
import shortid from 'shortid'

type Props = {
  callback: () => void
}

const NewAchievementSet = (props: Props) => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [tags, setTags] = useState<OptionTypeBase | null>(null)
  const [version, setVersion] = useState<string>('1')
  const [authorName, setAuthorName] = useState<string>('')
  const [authorEmail, setAuthorEmail] = useState<string>('')


  const handleSubmit = (event: any) => {
    event.preventDefault()

    const achievementSetId = shortid.generate()

    dispatch(
      addAchievementSet({
        id: achievementSetId,
        title: title ?? achievementSetId,
        description,
        tags: tags ? tags.map((tag: OptionTypeBase) => tag.value) : [],
        version,
        achievements: [],
        author: {
          name: authorName,
          email: authorEmail,
        },
      })
    )

    props.callback()
  }

  const handleTitleChange = (event: any) => setTitle(event.target.value)
  const handleDescriptionChange = (event: any) =>
    setDescription(event.target.value)
  const handleTagsChange = (option: OptionTypeBase | null) => setTags(option)
  const handleVersionChange = (event: any) => setVersion(event.target.value)
  const handleAuthorNameChange = (event: any) =>
    setAuthorName(event.target.value)
  const handleAuthorEmailChange = (event: any) =>
    setAuthorEmail(event.target.value)

  return (
      <Form id="addAchievementSet" onSubmit={handleSubmit}>
        <TitleInput onChange={handleTitleChange} value={title} />
        <DescriptionTextarea
          onChange={handleDescriptionChange}
          value={description}
        />
        <TagsSelect onChange={handleTagsChange} value={tags} />
        <VersionInput onChange={handleVersionChange} value={version} />
        <AuthorNameInput onChange={handleAuthorNameChange} value={authorName} />
        <AuthorEmailInput
          onChange={handleAuthorEmailChange}
          value={authorEmail}
        />
      </Form>
  )
}

export default React.memo(NewAchievementSet)
