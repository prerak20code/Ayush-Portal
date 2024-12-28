import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Input } from '@chakra-ui/input';
import { Box, Center, Text } from '@chakra-ui/layout';
import {
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
} from '@chakra-ui/menu';
import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
} from '@chakra-ui/modal';
import { Tooltip } from '@chakra-ui/tooltip';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Avatar } from '@chakra-ui/avatar';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/toast';
import ChatLoading from '../ChatLoading';

import { Spinner } from '@chakra-ui/spinner';

// import NotificationBadge from 'react-notification-badge';
// import { Effect } from 'react-notification-badge';
import { getSender } from '../Config/ChatLogics';

import { chatState } from '../../contexts';
import ProfileModal from './ProfileModal';

function SideDrawer() {
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);

    const {
        setSelectedChat,
        user,
        notification,
        setNotification,
        chats,
        setChats,
    } = chatState();

    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        navigate('/');
    };

    const handleSearch = async () => {
        if (!search) {
            toast({
                title: 'Please Enter something in search',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'top-left',
            });
            return;
        }

        try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get(
                `/api/user?search=${search}`,
                config
            );

            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast({
                title: 'Error Occured!',
                description: 'Failed to Load the Search Results',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom-left',
            });
        }
    };

    const accessChat = async (userId) => {
        console.log(userId);

        try {
            setLoadingChat(true);
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.post(
                `/api/v1/chat`,
                { userId },
                config
            );

            if (!chats.find((c) => c._id === data._id))
                setChats([data, ...chats]);
            setSelectedChat(data);
            setLoadingChat(false);
            onClose();
        } catch (error) {
            toast({
                title: 'Error fetching the chat',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom-left',
            });
        }
    };

    return (
        <>
            <Box className="flex justify-between items-center m-2 px-5 py-4  bg-[#f68533] shadow-md border-b-2">
                {/* Search Tooltip */}
                <Tooltip
                    label="Search Users to chat"
                    hasArrow
                    placement="bottom-end"
                >
                    <Button
                        variant="ghost"
                        onClick={onOpen}
                        className="flex items-center"
                    >
                        <i className="fas fa-search text-gray-600"></i>
                        <Text className="hidden md:block px-2">Search</Text>
                    </Button>
                </Tooltip>

                {/* Title */}
                <Text
                    fontSize="2xl"
                    fontFamily="Work sans"
                    className="font-semibold"
                >
                    CHATS PAGE
                </Text>

                {/* Notifications and Profile */}
                <div className="flex items-center gap-4">
                    {/* Notifications */}
                    <Menu>
                        <MenuButton p={1}>
                            <BellIcon fontSize="2xl" />
                        </MenuButton>
                        <MenuList>
                            {!notification.length && (
                                <MenuItem>No New Messages</MenuItem>
                            )}
                            {notification.map((notif) => (
                                <MenuItem
                                    key={notif._id}
                                    onClick={() => {
                                        setSelectedChat(notif.chat);
                                        setNotification(
                                            notification.filter(
                                                (n) => n !== notif
                                            )
                                        );
                                    }}
                                >
                                    {notif.chat.isGroupChat
                                        ? `New Message in ${notif.chat.chatName}`
                                        : `New Message from ${getSender(user, notif.chat.users)}`}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Menu>

                    {/* Profile */}
                    <Menu>
                        <MenuButton
                            as={Button}
                            bg="white"
                            rightIcon={<ChevronDownIcon />}
                        >
                            <Avatar
                                size="sm"
                                cursor="pointer"
                                name={user.name}
                            />
                        </MenuButton>
                        <MenuList>
                            <ProfileModal user={user}>
                                <MenuItem>My Profile</MenuItem>
                            </ProfileModal>
                            <MenuDivider />
                            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </Box>

            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">
                        Search Users
                    </DrawerHeader>
                    <DrawerBody>
                        <Box d="flex" pb={2}>
                            <Input
                                placeholder="Search by name or email"
                                w="75%"
                                mr={2}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button d="flex" onClick={handleSearch}>
                                Go
                            </Button>
                        </Box>
                        {loading ? (
                            <ChatLoading />
                        ) : (
                            searchResult?.map((user) => (
                                <UserListItem
                                    key={user._id}
                                    user={user}
                                    handleFunction={() => accessChat(user._id)}
                                />
                            ))
                        )}
                        {loadingChat && <Spinner ml="auto" d="flex" />}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}

export default SideDrawer;
