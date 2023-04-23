import React, { useState } from "react";
import { ArrowBackIcon, ArrowForwardIcon, Search2Icon } from "@chakra-ui/icons";
import { Box, Flex, Button, Table, Thead, Tr, Th, Tbody, Td, useBreakpointValue, Spinner, FormControl, FormLabel, Input, useToast } from "@chakra-ui/react";
import axios from "axios";


const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [since, setSince] = useState("");
  const [user, setUser] = useState([]);
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

    if (since !== '') {
      try {

        const res = await axios.get(`${BASE_URL}?since=${since}&page=${currentPage}`);

        setUser(res.data);

        toast({
          title: "Search successfully completed!",
          status: "success",
          isClosable: true
        })

      }
      catch (error) {

        console.error(error);

        toast({
          title: "Please enter a valid number",
          status: "error",
          isClosable: true
        })

        setLoading(false)

      }

      setSince("");
      setLoading(false)
    } else {
      toast({
        title: "Please enter a valid number",
        status: "error",
        isClosable: true
      })

      setLoading(false)
    }

  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };



  return (

    <Flex
      h="100vh"
      align="center"
      justify="center"
      fontSize="20px"
    >

      <Box maxW={1000} w="100%" h="90vh" py={10} px={2}>
        <Box maxW={1000} w="100%" h="90vh" py={10} px={2}>

          <Box maxW={1000} w={isMobile ? "50%" : "30%"} px={2}>

            <Box as="form" my={4}>
              <FormControl id="since">
                <FormLabel>Since:</FormLabel>
                <Input
                  type="number"
                  value={since}
                  placeholder="Enter a number"
                  onChange={(e) => setSince(e.target.value)}
                />
              </FormControl>

              {loading ? <Spinner /> : <Button type="submit" onClick={handleSubmit} colorScheme="blue" mt={4} isDisabled={since === ""}>
                Search <Search2Icon marginLeft="5px" />
              </Button>}

            </Box>

          </Box>


          {user.length < 1 ? "" :

            <Box maxW={1000} w="100%" px={2}>

              <Button
                textAlign="center"
                cursor="pointer"
                margin="5px"
                colorScheme="blue"
                onClick={() => handlePageChange(currentPage - 1)}
                isDisabled={currentPage === 1}
              >
                <ArrowBackIcon></ArrowBackIcon>
              </Button>
              <Button margin="5px" colorScheme="blue">
                Page {currentPage}
              </Button>


              <Button
                cursor="pointer"
                margin="5px"
                colorScheme="blue"
                onClick={() => handlePageChange(currentPage + 1)}>
                <ArrowForwardIcon></ArrowForwardIcon>
              </Button>

            </Box>}

          {user.length < 1 ? "" :

            <Box overflowY="auto" height="100%" marginTop="20px">
              <Table mt="6">
                <Thead>
                  <Tr>
                    <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                      id
                    </Th>
                    <Th maxW={isMobile ? 5 : 200} fontSize="20px">
                      Login
                    </Th>
                    <Th p={0}></Th>
                    <Th p={0}></Th>
                  </Tr>
                </Thead> {user.length < 1 ? <Tbody>
                  <Tr cursor="pointer " _hover={{ bg: "gray.100" }}>
                    <Td maxW={isMobile ? 5 : 50}><Spinner /></Td>
                    <Td maxW={isMobile ? 5 : 100}><Spinner /></Td>
                  </Tr>
                </Tbody> : <Tbody>
                  {user.map(({ id, login }, index) => (
                    <Tr key={index} cursor="pointer " _hover={{ bg: "gray.100" }}>
                      <Td maxW={isMobile ? 5 : 50}>{id}</Td>
                      <Td maxW={isMobile ? 5 : 100}>{login}</Td>
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

export default Users;