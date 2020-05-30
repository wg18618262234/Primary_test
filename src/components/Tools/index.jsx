import React, { useState, } from 'react';
import { Table, Tag, Space, Form, Input, Button, Select } from 'antd';
import { FormInstance } from 'antd/lib/form';
import 'antd/dist/antd.css'
import { getTools, insertTools, deleteTools, updateTools } from './services'
import {
    // BrowserRouter as Router,
    HashRouter as Router,
    Route,
    Switch,
    Link,
    Redirect,
    useRouteMatch,
    useParams,
} from 'react-router-dom';


export class Tools extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    async componentDidMount() {
        const res = await getTools()
        if (res) {
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
    }
    render() {
        console.log(this.props)
        const pathname = this.props.match.path
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
                render: text => <a href={text}>{text}</a>,
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <Space size="large">
                        <Link to={`${pathname}/tools_edit`}>Edit</Link>
                        <Link to={`${pathname}/tools_delete`}>Delete</Link>
                    </Space>
                ),
            },
        ];
        return (
            <div>
                <Switch>
                    <Route path={`${pathname}/tools_delete`}>
                        <DeleteTools />
                    </Route>
                    <Route path={`${pathname}/tools_edit`}>
                        <EditTools />
                    </Route>
                    <Route path={`${pathname}`}>
                        <Table dataSource={dataSource} columns={columns} />
                    </Route>
                </Switch>
            </div>
        )
    }
}




const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

class EditTools extends React.Component {
    formRef = React.createRef();
    onFinish = values => {
        console.log(values);

    };
    onReset = () => {
        this.formRef.current.resetFields();
    };
    onFill = () => {
        this.formRef.current.setFieldsValue({
            toolsName: 'Locust',
            toolsAddress: 'url',
        });
    };
    render() {
        return (
            <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
                <Form.Item name="toolsName" label="工具名称" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="toolsAddress" label="工具地址" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        保存
                    </Button>
                    <Button htmlType="button" onClick={this.onReset}>
                        重置
                    </Button>
                    <Button type="link" htmlType="button" onClick={this.onFill}>
                        默认
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

class DeleteTools extends React.Component {
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
        return (
            <div>
                <h1>删除</h1>
            </div>
        )
    }
}