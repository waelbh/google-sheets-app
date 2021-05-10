import React from 'react';
import { Segment } from 'semantic-ui-react';
const Footer: React.FC = () => {
    return (
        <Segment inverted vertical as="footer">
            <a href="https://github.com/semantic-ui-forest" target="_blank" rel="noopener noreferrer">
                Github repository
            </a>
            .
        </Segment>
    );
};

export default Footer;
