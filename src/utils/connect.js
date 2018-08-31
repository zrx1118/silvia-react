import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { saveFormData, saveImg, clearData } from '@/store/home/action';
import { clearSelected } from '@/store/production/action';
// import action from 'action.js'

export default connect(
    state=>state.main,
    dispatch=>bindActionCreators({saveFormData, saveImg, clearData, clearSelected}, dispatch)
)