import React, {Component} from 'react';
import PublicHeader from '@/components/header/header';

export default class Production extends Component{
    render() {
        return(
            <div>
                <PublicHeader title="产品" record/>
                我是Production
            </div>
        )
    }
}