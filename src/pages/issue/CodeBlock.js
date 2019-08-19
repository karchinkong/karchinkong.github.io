import React, { PureComponent } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNightEighties } from 'react-syntax-highlighter/dist/esm/styles/hljs';

class CodeBlock extends PureComponent {
    render() {
        const { value } = this.props;
        return (<SyntaxHighlighter style={tomorrowNightEighties}>{value}</SyntaxHighlighter>);
    }
}

export default CodeBlock;