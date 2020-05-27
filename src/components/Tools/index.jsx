import React from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.css'
import { getTools, insertTools, deleteTools, updateTools } from './services'

export class Tools extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    async componentDidMount() {
        const res = await getTools()
        this.setState({
            data: res.data.result.map(
                (item) => item = {
                    key: item.id,
                    name: item.key,
                    address: item.url
                }
            )

        })
    }
    render() {
        const dataSource = this.state.data
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

export class DelTools extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    async componentDidMount() {
        const res = await getTools()
        this.setState({
            data: res.data.result.map(
                (item) => item = {
                    key: item.id,
                    name: item.key,
                    address: item.url
                }
            )

        })
    }
    render() {
        const dataSource = this.state.data
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