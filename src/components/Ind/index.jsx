import React from 'react';

class Ind extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        document.title='测试工具平台'
        return (
            <div>
                <h1>该平台是测试工具整合平台</h1>
            </div>
        )
    }
}
export default Ind