import { call, put, takeLatest } from 'redux-saga/effects'
import {
  fetchAgents,
  fetchAgentsSuccess,
  fetchAgentsFailure,
  updateAgentProfileUrl,
  updateAgentProfileUrlSuccess,
  updateAgentProfileUrlFailure,
} from '../reducers/agentSlice'

function* fetchAgentsSaga() {
  try {
    const base = process.env.NEXT_PUBLIC_API_BASE || ''
    const res: Response = yield call(fetch, `${base}/api/agents`)
    const data = yield call([res, 'json'])
    yield put(fetchAgentsSuccess(data))
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to load agents'
    yield put(fetchAgentsFailure(message))
  }
}

function* updateAgentProfileUrlSaga(
  action: ReturnType<typeof updateAgentProfileUrl>
) {
  try {
    const { id, profileUrl } = action.payload
    const base = process.env.NEXT_PUBLIC_API_BASE || ''
    const res: Response = yield call(fetch, `${base}/api/agents/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profileUrl }),
    })
    const data = yield call([res, 'json'])
    yield put(updateAgentProfileUrlSuccess(data))
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update agent'
    yield put(updateAgentProfileUrlFailure(message))
  }
}

export function* watchAgents() {
  yield takeLatest(fetchAgents.type, fetchAgentsSaga)
  yield takeLatest(updateAgentProfileUrl.type, updateAgentProfileUrlSaga)
}

