import dynamic from "next/dynamic";
import {
  Input,
  FormControl,
  FormLabel,
  Box,
  Flex,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Heading,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import React from "react";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function Notes() {
  // delete
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [itemToDeleteId, setItemToDeleteId] = useState(null);

  const HandleDeleteConfirmation = (id) => {
    HandleDelete(id);
    setIsDeleteModalOpen(false);
  };
  //delete

  const router = useRouter();
  const [notes, setNotes] = useState();

  const HandleDelete = async (id) => {
    try {
      const response = await (await fetch(`/api/notes/delete/${id}`)).json();

      if (response?.success) {
        router.reload();
      }
    } catch (error) {}
  };

  useEffect(() => {
    async function fetchingData() {
      const listNotes = await (await fetch("/api/notes")).json();
      setNotes(listNotes);
      console.log("Notes =>", listNotes?.data);
    }
    fetchingData();
  }, []);

  return (
    <>
      <LayoutComponent metaTitle="Notes">
        <div className="mx-auto text-center max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <Box padding="5">
            <Flex justifyContent="end">
              <Button colorScheme="blue" onClick={() => router.push("/notes/add")}>
                Add Notes
              </Button>
            </Flex>
            <Flex>
              <Grid templateColumns="repeat(2, 1fr)" gap={10}>
                {notes?.data?.map((item) => (
                  <GridItem>
                    <Card>
                      <CardHeader>
                        <Heading>{item?.title}</Heading>
                      </CardHeader>
                      <CardBody>
                        <Text>{item?.description}</Text>
                      </CardBody>
                      <CardFooter justify="space-between" flexWrap="wrap">
                        <Button onClick={() => router.push(`/notes/edit/${item?.id}`)} flex="1" variant="ghost">
                          Edit
                        </Button>
                        <Button
                          onClick={() => {
                            setItemToDeleteId(item?.id);
                            setIsDeleteModalOpen(true);
                          }}
                          colorScheme="red"
                        >
                          Delete
                        </Button>
                        {/* <Button flex="1" onClick={() => HandleDelete(item?.id)} colorScheme="red">
                          Delete 1
                        </Button> */}
                        {/* <Button onClick={onOpen}>Open Modal</Button> */}
                      </CardFooter>
                    </Card>
                  </GridItem>
                ))}

                <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Confirm Deletion</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>Apakah yakin ingin menghapus note ini ?</ModalBody>
                    <ModalFooter>
                      <Button colorScheme="red" mr={3} onClick={() => HandleDeleteConfirmation(itemToDeleteId)}>
                        Delete
                      </Button>
                      <Button variant="ghost" onClick={() => setIsDeleteModalOpen(false)}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Grid>
            </Flex>
          </Box>
        </div>
      </LayoutComponent>
    </>
  );
}
