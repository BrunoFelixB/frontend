import React, { useState } from "react";
import { Box, Flex, Button, useBreakpointValue, Spinner, Image, Card, CardHeader, CardBody, CardFooter, Stack, Heading, Text, FormControl, FormLabel, Input, Table, Thead, Tr, Th, Tbody, Td, useToast } from "@chakra-ui/react";
import { Search2Icon } from '@chakra-ui/icons'
import axios from "axios";

const UserDetails = () => {
  const [user, setUser] = useState([]);
  const [repo, setRepo] = useState([]);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const BASE_URL = 'https://api.github.com/users';

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  const handleSubmit = async (e) => {

    setLoading(true)
    e.preventDefault();


    if (username !== '') {

      try {

        const firstResp = await axios.get(`${BASE_URL}/${username}`);

        const secondResp = await axios.get(`${BASE_URL}/${username}/repos`);

        setUser(firstResp.data);

        setRepo(secondResp.data)

        toast({
          title: "Search successfully completed!",
          status: "success",
          isClosable: true
        })

      }

      catch (error) {

        console.error(error);

        toast({
          title: "User not found",
          status: "error",
          isClosable: true
        })

        setLoading(false)

      }

      setUsername("")
      setLoading(false)

    } else {

      toast({
        title: "Enter a username",
        status: "error",
        isClosable: true
      })

      setLoading(false)
    }


  };


  return (

    <Flex
      h="100vh"
      align="center"
      justify='center'
      fontSize="20px"
    >

      <Box maxW={1000} w="100%" h="90vh" py={10} px={2}>
        <Box maxW={1000} w="100%" h="90vh" py={10} px={2}>

          <Box maxW={1000} w={isMobile ? "50%" : "30%"} px={2}>

            <Box as="form" my={4}>
              <FormControl id="username">
                <FormLabel>Username:</FormLabel>
                <Input
                  type="text"
                  value={username}
                  maxLength={39}
                  placeholder="Enter a username"
                  onChange={(e) => setUsername(e.target.value.toLowerCase())}
                />
              </FormControl>

              {loading ? <Spinner /> : <Button type="submit" onClick={handleSubmit} colorScheme="blue" mt={4}>
                Search <Search2Icon marginLeft="5px"/>
              </Button>}

            </Box>

          </Box>

          {user.length < 1 ? "" : <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            align='center'
            p="10px"
          >

            <Image
              borderRadius='full'
              boxSize='150px'
              src={user.avatar_url}
              alt='Dan Abramov'
            />

            <Stack>
              <CardBody>
                <Heading size='md'>Id: {user.id} </Heading>

                <Text py='2'>
                  Login:  {user.login}
                </Text>

                <Text py='2'>
                  Created in: {new Date(user.created_at).toLocaleDateString()}
                </Text>


              </CardBody>

              <CardFooter>

              </CardFooter>
            </Stack>

          </Card>}


          {user.length < 1 ? "" :

            <Box overflowY="auto" height="100%" marginTop="20px">

              <Text py='2'>
                {repo.length} Repositories
              </Text>

              <Table mt="6">
                <Thead>
                  <Tr>
                    <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                      id
                    </Th>
                    <Th maxW={isMobile ? 5 : 200} fontSize="20px">
                      Name
                    </Th>
                    <Th maxW={isMobile ? 5 : 200} fontSize="20px">
                      Full Name
                    </Th>
                    <Th p={0}></Th>
                    <Th p={0}></Th>
                    <Th p={0}></Th>
                  </Tr>
                </Thead> {user.length < 1 ? <Tbody>
                  <Tr cursor="pointer " _hover={{ bg: "gray.100" }}>
                    <Td maxW={isMobile ? 5 : 50}><Spinner /></Td>
                    <Td maxW={isMobile ? 5 : 100}><Spinner /></Td>
                    <Td maxW={isMobile ? 5 : 100}><Spinner /></Td>
                  </Tr>
                </Tbody> : <Tbody>
                  {repo.map(({ id, name, full_name }, index) => (
                    <Tr key={index} cursor="pointer " _hover={{ bg: "gray.100" }}>
                      <Td maxW={isMobile ? 5 : 50}>{id}</Td>
                      <Td maxW={isMobile ? 5 : 100}>{name}</Td>
                      <Td maxW={isMobile ? 5 : 100}>{full_name}</Td>
                    </Tr>
                  ))}
                </Tbody>}

              </Table>
            </Box>}

        </Box>
      </Box>

    </Flex>
  );
};

export default UserDetails;