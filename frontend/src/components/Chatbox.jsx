import { Box, Spacer } from '@chakra-ui/layout';
import './style.css';
import SingleChat from './SingleChat';
import { chatState } from '../contexts';

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
    const { selectedChat } = chatState();

    return (
        <Box
            display={{ base: selectedChat ? 'flex' : 'none', md: 'flex' }}
            alignItems="center"
            flexDir="column"
            p={3}
            bg="white"
            w={{ base: '100%', md: '68%' }}
            borderRadius="lg"
            borderWidth="1px"
            borderColor="gray.300"
            boxShadow="md"
            height="90vh"
            m={2}
        >
            <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </Box>
    );
};

export default Chatbox;
