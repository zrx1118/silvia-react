import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {is, fromJS} from 'immutable';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import TouchableOpacity from '@/components/TouchableOpacity/TouchableOpacity';
import './alert.less';

export default class Alert extends Component{
    static propTypes = {
        closeAlert: PropTypes.func.isRequired,  // 是否关闭弹框
        alertTip: PropTypes.string.isRequired,  // 弹框提示内容
        alertStatus: PropTypes.bool.isRequired // 判断是否展示弹框
    }
    FirstChild = props => {
        const childrenArray = React.Children.toArray(props.children);
        return childrenArray[0] || null;
    }
    confirm = () => {
        this.props.closeAlert();
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState));
    }
    render() {
        return(
            <ReactCSSTransitionGroup
                component={this.FirstChild}
                transitionName="alert"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
            >
            {
                this.props.alertStatus&&<div className="alert-con">
                    <div className="alert-context">
                        <div className="alert-content-detail">{this.props.alertTip}</div>
                        <TouchableOpacity className="confirm-btn" clickCallBack={this.confirm}/>
                    </div>
                </div>
            }
            </ReactCSSTransitionGroup>
        )
    }
}