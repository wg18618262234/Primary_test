import React from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.css'
import { getTools } from './services'

class Tools extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const result = getTools()
        console.log(result)
        const dataSource = [
            {
                key: '1',
                name: 'Locust',
                address: 'http://10.8.8.123:30090/admin/index',
            },
            {
                key: '2',
                name: '接口监控平台',
                address: 'http://10.8.8.18:8081/index',
            },
        ];

        const columns = [
            {
                title: '工具名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '工具地址',
                dataIndex: 'address',
                key: 'address',
            },
        ];
        return (
            <div>
                <Table dataSource={dataSource} columns={columns} />
            </div>
        )
    }
}

export default Tools