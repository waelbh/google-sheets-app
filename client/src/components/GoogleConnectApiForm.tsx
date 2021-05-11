import React from 'react';
import { Button, Container, Header } from 'semantic-ui-react';

interface Prop {
    handleConnectApi: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
const GoogleConnectApiForm: React.FC<Prop> = (prop) => {
    const { handleConnectApi } = prop;

    return (
        <Container className="content">
            <Header inverted as="h1">
                Explore your google sheets
            </Header>
            <p>
                Google sheets app will explore and handle Data deduplication on your spreadsheets, First we need your
                google Authentification and Authorization and you're ready to go!
            </p>

            <Button size="huge" onClick={handleConnectApi}>
                <img
                    width="20px"
                    alt="Google sign-in"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                />
                <span style={{ padding: '15px' }}>Connect API</span>
            </Button>
        </Container>
    );
};

export default GoogleConnectApiForm;
