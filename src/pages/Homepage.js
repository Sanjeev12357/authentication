import { Box, Container ,Tab,TabList,TabPanel,TabPanels,Tabs,Text} from '@chakra-ui/react'
import React from 'react'
import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';

const Homepage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize={"4xl"} color={"black"}>
          Talk a Live
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius={"lg"} borderWidth={"1px"}>
        <Tabs variant="soft-rounded" >
          <TabList>
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
              <Signup/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Homepage