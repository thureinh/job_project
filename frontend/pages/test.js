import { useDispatch, useSelector } from 'react-redux'
import { asyncLogin, changeStatus, selectStatus } from 'store/features/loginSlice'

function Test() {
    const dispatch = useDispatch()
    return (
        <>
            <h3>{useSelector(selectStatus)}</h3>
            <button className="mt-5" onClick={() => dispatch(changeStatus('Test Successful!'))}>Click Me To Test</button>
            <button className="mt-5" onClick={() => dispatch(asyncLogin())}>Click Me To Test Async</button>
        </>
    )
}

Test.layout = 'loginLayout'
export default Test