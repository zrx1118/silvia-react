import React, {Component} from 'react';
import PublicHeader from '@/components/header/header';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom';
import RecordList from './components/recordList';

import './record.less';

export default class Record extends Component{
    state = {
        flagBarPos: '17%',
    }

    /**
     * 设置头部底部标签位置
     * @param {string} type 数据类型
     */
    setFlagBarPos() {

    }
    render() {
        return(
            <main className="common-con-top">
                <PublicHeader title="记录" />
                <section className="record-nav-con">
                    <nav className="record-nav">
                        <NavLink to={`${this.props.match.path}/passed`} className="nav-link">已通过</NavLink>
                        <NavLink to={`${this.props.match.path}/audited`} className="nav-link">待审核</NavLink>
                        <NavLink to={`${this.props.match.path}/failed`} className="nav-link">未通过</NavLink>
                    </nav>
                    <i className="nav-flag-bar" style={{left: this.state.flagBarPos}}></i>
                </section>
                {/* 子路由在父级配置，react-router4新特性，更加灵活 */}
                <Switch>
                    <Route path={`${this.props.match.path}/:type`} component={RecordList} />
                    <Redirect from={`${this.props.match.path}`} to={`${this.props.match.path}/passed`} exact component={RecordList} />
                </Switch>
            </main>
        )
    }
}