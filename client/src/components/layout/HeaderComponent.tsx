import { Button, Container, Header, Menu } from 'semantic-ui-react';
import React from 'react';

interface Prop {
    connected: boolean;
    handleLogOut?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
const HeaderComponent: React.FC<Prop> = (prop: Prop) => {
    const { connected, handleLogOut } = prop;
    return (
        <Container as="nav">
            <Header inverted as="h1">
                Google Sheet App
            </Header>
            <Menu borderless compact inverted>
                {connected && (
                    <Button size="huge" onClick={handleLogOut}>
                        <span style={{ padding: '15px' }}>Logout</span>
                    </Button>
                )}
            </Menu>
        </Container>
    );
};

export default HeaderComponent;
