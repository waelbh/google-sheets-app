import React, { useState } from 'react';
import { Button, Container, Header, Form, Select } from 'semantic-ui-react';

interface Prop {
    options: Array<{ text: string; value: string }>;
    handleDeduplicateAction: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, spSheetId: string) => void;
}
const SelectSheetsForm: React.FC<Prop> = (prop) => {
    const { options, handleDeduplicateAction } = prop;
    const [selectedSpreadSheetId, setSelectedSpreadSheetId] = useState<string>('');

    return (
        <Container className="content">
            <Header inverted as="h2">
                Select spreadsheets to deduplicate their Data
            </Header>
            <div>
                <Form size="massive">
                    <Form.Field
                        control={Select}
                        options={options}
                        label={{
                            htmlFor: 'form-select-control-spreadsheets',
                        }}
                        placeholder="Spreadsheets"
                        search
                        searchInput={{ id: 'form-select-control-spreadsheets' }}
                        onChange={(_e: any, { value }: any) => {
                            setSelectedSpreadSheetId(value);
                        }}
                    />

                    <Button
                        type="submit"
                        size="huge"
                        disabled={selectedSpreadSheetId ? false : true}
                        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                            handleDeduplicateAction(e, selectedSpreadSheetId);
                        }}
                    >
                        Deduplicate
                    </Button>
                </Form>
            </div>
        </Container>
    );
};

export default SelectSheetsForm;
