import React from 'react';
import logo from './onion_log.png';
import {
    // BrowserRouter as Router,
    HashRouter as Router,
    Route,
    Switch,
    Link,
} from 'react-router-dom';
import './App.css';
import { Tools, Ind, Request_api, Tools_middle } from './components';
import { Layout, Menu } from 'antd';
import {
    AppstoreOutlined,
    SettingOutlined,
} from '@ant-design/icons';

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            routers: [
                { name: 'tools', path: '/tools', id: 0 },
            ]
        };
    }
    renderRouters() {
        const routers = this.state.routers.map((el) =>
            <li key={el.id}>
                <Link to={el.path}>{el.name}</Link>
            </li>
        )
        return routers
    }
    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };
    handleClick = e => {
        console.log('click ', e);
    };
    render() {
        return (
            <Router>
                <Layout>
                    <Sider style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                    }}>
                        <div className="logo" style={{
                            height: '80px',
                        }}>
                            <img style={{
                                margin: "10px 0px 0px 10px",
                            }} src={logo} className="App-logo" alt="logo" />
                            <h1 style={{
                                color: "white",
                                padding: "25px",
                                fontSize: "20px",
                                margin: "0 0 0 50px",
                            }}>测试平台</h1>
                        </div>
                        <Menu onClick={this.handleClick}
                            style={{ width: 200 }}
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                        >
                            <Menu.Item key='sub1'><Link to='/'>首页</Link></Menu.Item>
                            <SubMenu key="sub3" icon={<AppstoreOutlined />} title="测试工具">
                                {console.log(Router)}
                                <Menu.Item key="5"><Link to="/tools">小学测试工具地址</Link></Menu.Item>
                                <Menu.Item key="6"><Link to="/request_api">批量接口请求</Link></Menu.Item>
                                <Menu.Item key="7"><Link to="/Tools_middle">中学测试工具地址</Link></Menu.Item>
                            </SubMenu>
                            {/* <SubMenu key="sub4" title={
                                <span>
                                    <SettingOutlined />
                                    <span>管理</span>
                                </span>
                            }>
                                <Menu.Item key="9"><Link to="/tools_manage">测试工具管理</Link></Menu.Item>
                            </SubMenu> */}
                        </Menu>
                    </Sider>
                    <Layout className="site-layout" style={{ marginLeft: 200 }}>
                        {/* <Header className="site-layout-background" style={{ padding: 0 }} >
                        </Header> */}
                        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                            <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
                                <Switch>
                                    <Route path="/Tools_middle" component={Tools_middle} />
                                    <Route path="/request_api" component={Request_api} />
                                    <Route path="/tools_manage" />
                                    <Route path="/tools" component={Tools} />
                                    <Route path="/">
                                        <Ind />
                                    </Route>
                                </Switch>
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Onion Design ©2020 Created by Onion</Footer>
                    </Layout>
                </Layout>
            </Router>
        )
    }
}
export default App;