import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';
import { Form, Button, InputNumber } from 'antd';
import { curl_request } from './services'
import { openNotificationWithIcon } from '../Notification'


class Request_api extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            code: `curl -H 'Host: api-primary-test.yangcong345.com' -H 'appinstallchannel: guanghetv' -H 'Origin: https://test.yangcong345.com' -H 'Authorization: eyJhbGciOiJIUzI1NiJ9.eyJ5aWQiOiI1ZTE2OTYwNWEyZDliMzAwMDFiMDI0MGMiLCJwaG9uZSI6IjE4NjE4MjYyMjM2IiwicGxhdGZvcm0iOiJhcHBMZWFybkg1Iiwid2VjaGF0SWQiOjE2MjA5NSwiZXhwIjoxNjIzNDgwMjAzfQ.BWuXUmvCTquUyug228CZRDXwakzn9-M0FmO03KRthRw' -H 'Content-Type: application/json;charset=UTF-8' -H 'Accept: application/json, text/plain, */*' -H 'User-Agent: Mozilla/5.0 (Linux; Android 10; MI 9 Build/QKQ1.190825.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/80.0.3987.99 Mobile Safari/537.36' -H 'Sec-Fetch-Dest: empty' -H 'X-Requested-With: com.yangcong345.android.phone' -H 'Sec-Fetch-Site: same-site' -H 'Sec-Fetch-Mode: cors' -H 'Referer: https://test.yangcong345.com/xs-h2/course/order-plan?ycfrom=PrimaryBanner&from=PrimaryBanner&appVersion=5.30.0&channel=guanghetv&userId=5e169605a2d9b30001b0240c&primaryPlatform=appLearnH5&classType=2&flagKey=A&enrollmentAgentId=&planId=523&grade=6&publisherId=1&times=2020-04-10T16%3A00%3A00.000Z%202020-09-05T16%3A00%3A00.000Z%20661%205ed4d6fe7fe5ff453274d181' -H 'Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7' --data-binary '{"channel":"wx_wap","payType":"SinglePay","commodityId":"5ed4d6fe7fe5ff453274d181","enrollmentAgentId":0,"grade":6,"publisherId":1,"classType":2,"planId":523,"planDetailId":661,"planPageId":48,"os":"android","productId":"03","classStartTime":"2020-04-10T16:00:00.000Z","classEndTime":"2020-09-05T16:00:00.000Z","ycFrom":"PrimaryBanner","platform":"appLearnH5","callbackUrl":"https://test.yangcong345.com/xs-h2/pay-confirm?ycfrom=PrimaryBanner&from=PrimaryBanner&appVersion=5.30.0&flagKey=A&channel=guanghetv&userId=5e169605a2d9b30001b0240c&primaryPlatform=appLearnH5","paymentPlatform":"ping","studyTextBooks":false}' --compressed 'https://api-primary-test.yangcong345.com/primary_account/payment/createPrePaymentPlan'`,
            help: `{{add}}：自增变量，{{random}}：随机变量`
        }
    }
    formRef = React.createRef();
    initialValues = () => ({
        count: 1
    })
    handleChange = (props) => {
        this.setState({ code: props.getValue() })
    }
    onFinish = async () => {
        const data = { ...this.formRef.current.getFieldsValue(), ...this.state }
        const result = await curl_request(data)
        console.log(result)
        if (result.data.code == 1) {
            openNotificationWithIcon('success', '执行成功')
        }
    }
    render() {
        const layout = {
            // labelCol: { span: 12 },
            wrapperCol: { span: 1 },
        };
        const tailLayout = {
            // wrapperCol: { offset: 8, span: 8 },
        };
        return (<div>
            <Form ref={this.formRef} name="control-ref" layout="inline" onFinish={this.onFinish} initialValues={this.initialValues()}>
                <Form.Item name="count" label="执行次数" rules={[{ required: true, message: '执行次数不能为空' }]}>
                    <InputNumber min={1} max={100000} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        执行
                    </Button>
                </Form.Item>
            </Form>
            <p>{this.state.help}</p>
            <CodeMirror
                value={this.state.code}
                options={{
                    theme: 'monokai',
                    tabSize: 2,
                    keyMap: 'sublime',
                    mode: 'shell',
                    lineWrapping: true,
                }}
                onChange={(props) => this.handleChange(props)}
            />
        </div>)
    }
}

export default Request_api