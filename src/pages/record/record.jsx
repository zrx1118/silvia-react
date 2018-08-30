import React, {Component} from 'react';
import PublicHeader from '@/components/header/header';

export default class Record extends Component{
    render() {
        return(
            <div>
                <PublicHeader title="记录" />
                我是Record
            </div>
        )
    }
}