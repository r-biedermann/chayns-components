import React, { Component } from 'react';

import { Input, DynamicInput } from '../../src/index';
import ExampleContainer from '../ExampleContainer';

import '../../src/react-chayns-input/component/dynamic-input.scss';

export default class Example extends Component {
    constructor() {
        super();

        this.state = {
            userNameOnBlur: null,
            userNameOnChange: null,
        };
    }

    render() {
        const { userNameOnBlur, userNameOnChange } = this.state;
        return (
            <ExampleContainer headline="Input">
                <h3>userNameOnBlur</h3>
                <p>{userNameOnBlur || '-'}</p>

                <h3>userNameOnChange</h3>
                <p>{userNameOnChange || '-'}</p>

                <Input
                    defaultValue="heello i am a invalid default value"
                    placeholder="Looking for 3 lowercase e's in a row"
                    // regExp=".*e{3}.*"
                    onBlur={(text) => {
                        this.setState({
                            userNameOnBlur: text
                        });
                    }}
                    onChange={(text) => {
                        this.setState({
                            userNameOnChange: text
                        });
                    }}
                />

                <DynamicInput
                    placeholder="Looking for"
                />
            </ExampleContainer>
        );
    }
}
