import React, { useState, } from 'react';
import { Table, Tag, Space, Form, Input, Button, Select, Popconfirm } from 'antd';
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
    async componentWillMount() {
        await this.toolsInit()
    }
    async toolsInit() {
        const res = await getTools()
        console.log(res)
        if (res) {
            this.setState({
                data: res.data.result.map(
                    (item) => item = {
                        key: item.id,
                        name: item.tools_name,
                        address: item.tools_address
                    }
                )

            })
        }
    }
    handleDelete = async (data) => {
        const res = await deleteTools(data)
        console.log(res)
        await this.toolsInit()
    }
    render() {
        const pathname = this.props.match.path
        const dataSource = this.state.data
        const columns = [
            {
                title: 'ID',
                dataIndex: 'key',
                key: 'key',
            },
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
                        <Link to={{
                            pathname: `${pathname}/edit/${record.key}`,
                            data: record
                        }}>编辑</Link>
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete({ "id": record.key })}>
                            <Link>删除</Link>
                        </Popconfirm>
                    </Space>
                ),
            },
        ];
        return (
            <div>
                <Switch>
                    <Route path={`${pathname}/delete`}>
                        <DeleteTools />
                    </Route>
                    <Route path={`${pathname}/edit/:id`} component={EditTools}>
                    </Route>
                    <Route path={`${pathname}/add`} component={AddTools}>
                    </Route>
                    <Route path={`${pathname}`}>
                        <div>
                            <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                                <Link to={`${pathname}/add`}>添加</Link>
                            </Button>
                            <Table dataSource={dataSource} columns={columns} />
                        </div>
                    </Route>
                </Switch>
            </div>
        )
    }
}
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
class EditTools extends React.Component {
    constructor(props) {
        super(props);
    }
    formRef = React.createRef();
    onFinish = values => {
        const id = this.props.match.params.id
        values["id"] = id
        const res = updateTools(values)
        console.log(res)
    };
    initialValues = () => (this.props.location.data ? {
        toolsName: this.props.location.data.name,
        toolsAddress: this.props.location.data.address
    } : {
            toolsName: null,
            toolsAddress: null
        })
    render() {
        return (
            <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish} initialValues={this.initialValues()}>
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
                </Form.Item>
            </Form>
        );
    }
}

class AddTools extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {}
        }
    }
    formRef = React.createRef();
    onFinish = values => {
        this.setState(
            { 'values': values }
        )
        const res = insertTools(this.state.values)
        console.log(res)
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