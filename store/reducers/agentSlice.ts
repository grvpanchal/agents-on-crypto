import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AgentType } from '@/types/agent'

interface AgentsState {
  items: AgentType[]
  loading: boolean
  error: string | null
}

const initialState: AgentsState = {
  items: [],
  loading: false,
  error: null,
}

const agentSlice = createSlice({
  name: 'agents',
  initialState,
  reducers: {
    fetchAgents: state => {
      state.loading = true
    },
    fetchAgentsSuccess: (state, action: PayloadAction<AgentType[]>) => {
      state.items = action.payload
      state.loading = false
      state.error = null
    },
    fetchAgentsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    updateAgentProfileUrl: (
      state,
      _action: PayloadAction<{ id: number; profileUrl: string }>
    ) => {
      state.loading = true
    },
    updateAgentProfileUrlSuccess: (state, action: PayloadAction<AgentType>) => {
      const idx = state.items.findIndex(a => a.id === action.payload.id)
      if (idx !== -1) state.items[idx] = action.payload
      state.loading = false
    },
    updateAgentProfileUrlFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  fetchAgents,
  fetchAgentsSuccess,
  fetchAgentsFailure,
  updateAgentProfileUrl,
  updateAgentProfileUrlSuccess,
  updateAgentProfileUrlFailure,
} = agentSlice.actions

export default agentSlice.reducer

