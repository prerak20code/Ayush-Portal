import { Box } from '@chakra-ui/layout';
import { useState } from 'react';
import Chatbox from '../components/Chatbox';
import MyChats from '../components/MyChats';
import SideDrawer from '../components/miscellaneous/SideDrawer';
import { chatState } from '../contexts';

const Chatpage = () => {
    const [fetchAgain, setFetchAgain] = useState(false);
    const { user } = chatState();

    return (
        <div className="w-full">
            {user && <SideDrawer />}

            <Box display="flex" flexDirection="row" width="100%" height="100%">
                {user && (
                    <MyChats
                        fetchAgain={fetchAgain}
                        width="30%"
                        height="100%"
                    />
                )}
                {user && (
                    <Chatbox
                        fetchAgain={fetchAgain}
                        setFetchAgain={setFetchAgain}
                        width="70%"
                        height="100%"
                    />
                )}
            </Box>
        </div>
    );
};

export default Chatpage;
