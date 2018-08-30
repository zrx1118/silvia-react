import React, {Component} from 'react';
import PublicHeader from '@/components/header/header';

export default class Balance extends Component{
    render() {
        return(
            <div>
                <PublicHeader title="消费" record/>
                我是Balance
            </div>
        )
    }
}