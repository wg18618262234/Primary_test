import React, { useState, } from 'react';
import { Table, Tag, Space } from 'antd';
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
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    // Switch,
} from 'antd';


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

class EditTools extends React.Component {
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
        // const [componentSize, setComponentSize] = useState('small');
        // const onFormLayoutChange = ({ size }) => {
        //     setComponentSize(size);
        // }
        return (
            <div>
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                // initialValues={{ size: componentSize }}
                // onValuesChange={onFormLayoutChange}
                // size={componentSize}
                >
                    <Form.Item label="Form Size" name="size">
                        <Radio.Group>
                            <Radio.Button value="small">Small</Radio.Button>
                            <Radio.Button value="middle">Middle</Radio.Button>
                            <Radio.Button value="large">Large</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Input">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Select">
                        <Select>
                            <Select.Option value="demo">Demo</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="TreeSelect">
                        <TreeSelect
                            treeData={[
                                { title: 'Light', value: 'light', children: [{ title: 'Bamboo', value: 'bamboo' }] },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item label="Cascader">
                        <Cascader
                            options={[
                                {
                                    value: 'zhejiang',
                                    label: 'Zhejiang',
                                    children: [
                                        {
                                            value: 'hangzhou',
                                            label: 'Hangzhou',
                                        },
                                    ],
                                },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item label="DatePicker">
                        <DatePicker />
                    </Form.Item>
                    <Form.Item label="InputNumber">
                        <InputNumber />
                    </Form.Item>
                    <Form.Item label="Switch">
                        <Switch />
                    </Form.Item>
                    <Form.Item label="Button">
                        <Button>Button</Button>
                    </Form.Item>
                </Form>
            </div>
        )

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