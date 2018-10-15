import React, { Component } from 'react';

import { faRocket } from '@fortawesome/free-solid-svg-icons';
import { Accordion } from '../../src/index';
import ExampleContainer from '../ExampleContainer';

export default class Example extends Component {
    render() {
        return (
            <ExampleContainer headline="Accordion">
                <Accordion head="Test" badge="2">
                    <Accordion
                        head={(
                            <span style={{ color: '#FF0000' }} className="accordion--trigger">
                                Test
                            </span>
                        )}
                        isWrapped
                        open
                    >
                        <div className="accordion__content">
                            Hello World 1
                        </div>
                    </Accordion>
                    <Accordion head="Test" isWrapped icon={faRocket} dataGroup="abc">
                        <div className="accordion__content">
                            Hello World 2
                        </div>
                    </Accordion>
                    <Accordion
                        dataGroup="abc"
                        icon="ts-tobit"
                        noRotate
                        head="Test"
                        badge={1}
                        badgeStyle={{ backgroundColor: 'red' }}
                        isWrapped
                    >
                        <div className="accordion__content">
                            Hello World 2
                        </div>
                    </Accordion>
                </Accordion>

                <Accordion head="Autogrow" autogrow>
                    <div style={{ height: '20000px', background: 'linear-gradient(0deg, red, yellow)' }}/>
                </Accordion>
            </ExampleContainer>
        );
    }
}
