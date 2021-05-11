import React, { useEffect, useState } from 'react';
import { Segment } from 'semantic-ui-react';
import '../assets/css/Home.css';
import GoogleConnectApiForm from '../components/GoogleConnectApiForm';
import Footer from '../components/layout/Footer';
import HeaderComponent from '../components/layout/HeaderComponent';
import SelectSpreadSheetsForm from '../components/SelectSpreadSheetsForm';
import { COOKIE_NAME } from '../constants';
import Cookies from 'universal-cookie';
import { getSheetsList, getGoogleConnectApiUrl, updateDeduplicationSheets } from '../actions';
import Notification from '../helpers/Notification';
const cookies = new Cookies();
const Home: React.FC = () => {
    const [connected, setConnected] = useState<boolean>(cookies.get(COOKIE_NAME) ? true : false);
    const [spreadSheetsList, setSpreadsheetsList] = useState<Array<{ text: string; value: string }>>([]);
    const [notificationStatus, setNotificationStatus] = useState<{
        display: boolean;
        text: string;
    }>({ display: false, text: '' });
    /**
     * This useEffect used to get Spreadsheets if user connected to the API
     */
    useEffect(() => {
        const getSpreadsheetsList = async () => {
            const apiResult = await getSheetsList();
            return apiResult;
        };
        if (connected) {
            getSpreadsheetsList().then((result) => {
                const formatedList = result.data.files.map((item: any) => {
                    return { text: item.name, value: item.id };
                });
                setSpreadsheetsList(formatedList);
                setNotificationStatus({
                    display: true,
                    text: 'Access has been granted',
                });
            });
        }
    }, [connected]);

    /**
     * This method called from GoogleConnectApiForm Child to redirect to google auth and confirm permission (Connect API button click)
     */
    const handleConnectApi = async () => {
        const urlLink = await getGoogleConnectApiUrl();
        setNotificationStatus({
            display: true,
            text: 'You will be transferred safely to google authentication',
        });
        setTimeout(() => {
            window.location.replace(urlLink);
        }, 2000);
    };
    /**
     * This method called from HeaderComponent Child to logout
     */
    const handleLogOut = () => {
        cookies.remove(COOKIE_NAME);
        setConnected(false);
    };
    /**
     * This method called from SelectSpreadSheetsForm Child
     * to deduplicate data of the selected spreadsheet id
     */
    const handleDeduplicateAction = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, spSheetId: string) => {
        e.preventDefault();
        const result = await updateDeduplicationSheets(spSheetId);
        if (result?.status === 200) {
            setNotificationStatus({
                display: true,
                text: 'The spreadsheet has been deduped',
            });
        } else if (!result) {
            setNotificationStatus({
                display: true,
                text: 'Deduplication failed, check the existence of tab A,B,C ',
            });
        }
    };
    return (
        <>
            <Segment inverted vertical textAlign="center">
                {connected ? (
                    <>
                        <HeaderComponent connected={connected} handleLogOut={handleLogOut} />
                        <SelectSpreadSheetsForm
                            options={spreadSheetsList}
                            handleDeduplicateAction={handleDeduplicateAction}
                        />
                    </>
                ) : (
                    <>
                        <HeaderComponent connected={connected} />
                        <GoogleConnectApiForm handleConnectApi={handleConnectApi} />
                    </>
                )}
                <Footer />
                <Notification notificationStatus={notificationStatus} />
            </Segment>
        </>
    );
};

export default Home;
