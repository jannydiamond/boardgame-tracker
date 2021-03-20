import { createSelector, createSlice } from '@reduxjs/toolkit'
import { AchievementSet, AchievementSetId, TableNames } from 'types'

import { RootState } from 'Redux/store'
import {
  addAchievement,
  deleteAchievementSet,
  init,
  removeAchievement,
} from 'Redux/sideEffects'
import { addAchievementSet, editAchievementSet } from './sideEffects'
import { removeIn, setIn } from 'immutable'

type State = {
  byId: Record<AchievementSetId, AchievementSet>
}

const initialState: State = { byId: {} }

export const AchievementSetSlice = createSlice({
  name: TableNames.ACHIEVEMENT_SETS,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.fulfilled, (_, action) => {
      return {
        byId: action.payload.achievementSets,
      }
    })
    // TODO handle inside sideEffect
    builder.addCase(init.rejected, (_, action) => {
      console.log(action.error)
    })

    builder.addCase(addAchievementSet.fulfilled, (state, action) => {
      const { id } = action.payload

      return setIn(state, ['byId', id], action.payload)
    })
    builder.addCase(addAchievementSet.rejected, (_, action) => {
      console.log(action.error)
    })

    builder.addCase(editAchievementSet.fulfilled, (state, action) => {
      const { id } = action.payload

      return setIn(state, ['byId', id], action.payload)
    })
    builder.addCase(editAchievementSet.rejected, (_, action) => {
      console.log(action.error)
    })

    builder.addCase(deleteAchievementSet.fulfilled, (state, action) => {
      const { achievementSetId } = action.payload

      const newState = removeIn(state, ['byId', achievementSetId])

      return newState
    })
    builder.addCase(deleteAchievementSet.rejected, (_, action) => {
      console.log(action.error)
    })

    builder.addCase(addAchievement.fulfilled, (state, action) => {
      const { updatedAchievementSet } = action.payload

      return setIn(
        state,
        ['byId', updatedAchievementSet.id],
        updatedAchievementSet
      )
    })
    // TODO handle inside sideEffect
    builder.addCase(addAchievement.rejected, (_, action) => {
      console.log(action.error)
    })

    builder.addCase(removeAchievement.fulfilled, (state, action) => {
      const { updatedAchievementSet } = action.payload

      if (!updatedAchievementSet) {
        return state
      }

      return setIn(
        state,
        ['byId', updatedAchievementSet.id],
        updatedAchievementSet
      )
    })
    // TODO handle inside sideEffect
    builder.addCase(removeAchievement.rejected, (_, action) => {
      console.log(action.error)
    })
  },
})

export const selectAchievementSetsById = (state: RootState) =>
  state.AchievementSets.byId
export const selectAchievementSetIds = (state: RootState) =>
  Object.keys(state.AchievementSets.byId)
export const selectAchievementSetArray = (state: RootState) =>
  Object.values(state.AchievementSets.byId)
export const selectAchievementSetById = (
  state: RootState,
  ownProps: { achievementSetId: string }
) => state.AchievementSets.byId[ownProps.achievementSetId]

export const selectAchievementSetsTags = createSelector(
  [selectAchievementSetArray],
  (achievementSets) => {
    const allTags = achievementSets.reduce((acc: string[], achievementSet) => {
      return [...acc, ...achievementSet.tags]
    }, [])

    return [...new Set(allTags)]
  }
)
