import { createSelector, createSlice } from '@reduxjs/toolkit'
import { AchievementSet, AchievementSetId, TableNames } from 'types'

import { RootState } from 'Redux/store'
import {
  addAchievement,
  deleteAchievementSet,
  init,
  removeAchievement,
} from 'Redux/sideEffects'
import {
  addAchievementSet,
  editAchievementSet,
  importAchievementSet,
} from './sideEffects'
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
    builder
      .addCase(init.fulfilled, (_, action) => {
        return {
          byId: action.payload.achievementSets,
        }
      })

      .addCase(addAchievementSet.fulfilled, (state, action) => {
        const { id } = action.payload

        return setIn(state, ['byId', id], action.payload)
      })

      .addCase(editAchievementSet.fulfilled, (state, action) => {
        const { id } = action.payload

        return setIn(state, ['byId', id], action.payload)
      })

      .addCase(deleteAchievementSet.fulfilled, (state, action) => {
        const { achievementSetId } = action.payload

        const newState = removeIn(state, ['byId', achievementSetId])

        return newState
      })

      .addCase(addAchievement.fulfilled, (state, action) => {
        const { updatedAchievementSet } = action.payload

        return setIn(
          state,
          ['byId', updatedAchievementSet.id],
          updatedAchievementSet
        )
      })

      .addCase(removeAchievement.fulfilled, (state, action) => {
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

      .addCase(importAchievementSet.fulfilled, (state, action) => {
        const { achievementSet } = action.payload

        if (!achievementSet) {
          return state
        }

        return setIn(state, ['byId', achievementSet.id], achievementSet)
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
