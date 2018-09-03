import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {is, fromJS} from 'immutable';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PublicHeader from '@/components/header/header';
import PublicAlert from '@/components/alert/alert';
import TouchableOpacity from '@/components/TouchableOpacity/TouchableOpacity';
import { clearSelected } from '@/store/production/action';
import { saveFormData, saveImg, clearData} from '@/store/home/action';
import API from '@/api/api';
import envconfig from '@/envconfig/envconfig';
import './home.less'
import mixin, {padStr} from '@/utils/mixin';

@mixin({padStr})
class Home extends Component{
    static propTypes = {
        formData: PropTypes.object.isRequired,
        clearSelected: PropTypes.func.isRequired,
        clearData: PropTypes.func.isRequired,
        saveImg: PropTypes.func.isRequired,
        saveFormData: PropTypes.func.isRequired
    }

    state = {
        alertStatus: false, // 弹框状态
        alertTip: '', // 弹框内容
        /**
         * 定义产品列表
         */
        selectedProList: []
    }
    /**
     * 将表单数据保存至redux，保留状态
     * @param {string} type 数据类型 orderSum||name||phoneNo
     * @param {object} event 事件对象
    */
    handleInput = (type, event) => {
        let value = event.target.value;
        console.log(type)
        console.log(event)
        switch(type) {
            case 'orderSum':
                value = value.replace(/\D/g, '');
                break;
            case 'name':
                break;
            case 'phoneNo':
                value = this.padStr(value.replace(/\D/g, ''), [3, 7], ' ', event.target);
                break;
            default:
                break;
        }
        this.props.saveFormData(value, type);
    }
    /**
     * 上传图片，并将图片地址存到redux，保留状态
     */
    uploadImg = async event => {
        try {
            let formdata = new FormData();
            formdata.append('file', event.target.files[0]);
            let result = await API.uploadImg({data: formdata});
            this.props.saveImg(envconfig.imgUrl + result.image_path);
            console.log(result);
        }catch(err) {
            console.error(err);
        }
    }
    closeAlert = () => {
        this.setState({alertStatus: false, alertTip: ''});
    }
    submitForm = () => {
        const {orderSum, name, phoneNo} = this.props.formData;
        let alertTip = '';
        if (!orderSum.toString().length) {
            alertTip = '请输入订单金额';
        } else if (!name.toString().length) {
            alertTip = '请输入客户姓名';
        } else if (!phoneNo.toString().length) {
            alertTip = '请输入客户电话';
        } else {
            alertTip = '数据提交成功';
            this.props.clearSelected();
            this.props.clearData();
        }
        this.setState({
            alertStatus: true,
            alertTip
        })
    }
    initData = props => {
        this.setState({selectedProList: props.proData.dataList.filter(item => item.selectStatus && item.selectNum)})
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState));
    }
    componentDidMount() {
        this.initData(this.props);
    }
    render() {
        return(
        <div className="home-container">
            <PublicHeader title="首页" record/>
            <p className="common-title">请录入您的信息</p>
            <form className="home-form">
                <div className="home-form-item">
                    <span>销售金额：</span>
                    <input type="text" placeholder="请输入订单金额" value={this.props.formData.orderSum} onChange={this.handleInput.bind(this, 'orderSum')}/>
                </div>
                <div className="home-form-item">
                    <span>客户姓名：</span>
                    <input type="text" placeholder="请输入客户姓名" value={this.props.formData.name} onChange={this.handleInput.bind(this, 'name')}/>
                </div>
                <div className="home-form-item">
                    <span>客户电话：</span>
                    <input type="text" maxLength="13" placeholder="请输入客户电话" value={this.props.formData.phoneNo} onChange={this.handleInput.bind(this, 'phoneNo')}/>
                </div>
            </form>
            <div>
                <p className="common-title">请选择销售产品</p>
                <Link to="/production" className="common-select-btn">
                {
                    this.state.selectedProList.length?<ul className="selected-pro-list">
                    {
                        this.state.selectedProList.map((item, index) => {
                            return <li className="selected-pro-item ellipsis" key={index}>{item.product_name} * {item.selectNum}</li>
                        })
                    }
                    </ul>:'选择产品'
                }
                </Link>
            </div>
            <div className="upload-img-con">
                <p className="common-title">请上传发票凭证</p>
                <div className="file-lable">
                    <span className="common-select-btn">上传图片</span>
                    <input type="file" onChange={this.uploadImg}/>
                </div>
                <img src={this.props.formData.imgpath} className="select-img" alt=""/>
            </div>
            <TouchableOpacity className="submit-btn" text="提交" clickCallBack={this.submitForm} />
            <PublicAlert closeAlert={this.closeAlert} alertTip={this.state.alertTip} alertStatus={this.state.alertStatus}/>
        </div>
        )
    }
}

export default connect(state => ({
    formData: state.formData,
    proData: state.proData,
  }), {
    saveFormData, 
    saveImg,
    clearData,
    clearSelected,
  })(Home);