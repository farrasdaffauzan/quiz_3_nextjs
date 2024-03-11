import dynamic from "next/dynamic";
import {
  Textarea,
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
  // Start Function Add
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [notes, setNotes] = useState({
    title: "",
    description: "",
  });

  const HandleOpenModal = () => {
    setIsAddModalOpen(true);
  };

  const HandleCloseModal = () => {
    setIsAddModalOpen(false);
  };

  const HandleInputChange = (event) => {
    const { name, value } = event.target;
    setNotes((prevNotes) => ({
      ...prevNotes,
      [name]: value,
    }));
  };

  const HandleSubmit = async () => {
    try {
      const result = await (
        await fetch("/api/notes/add", {
          method: "POST",
          body: JSON.stringify(notes),
        })
      ).json();
      if (result?.success) {
        // router.push("/notes");
        setIsAddModalOpen(false);
        router.reload();
      }
    } catch (error) {}
  };

  //End Function Add

  // Start Function Edit
  // End Function Edit

  // Start Function delete
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [itemToDeleteId, setItemToDeleteId] = useState(null);

  const HandleDeleteConfirmation = (id) => {
    HandleDelete(id);
    setIsDeleteModalOpen(false);
  };
  // End Function delete

  const router = useRouter();
  // const [notes, setNotes] = useState();

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
      // console.log("Notes =>", listNotes?.data);
    }
    fetchingData();
  }, []);

  return (
    <>
      <LayoutComponent metaTitle="Notes">
        <div className="mx-auto text-center max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <Box padding="5">
            <Flex justifyContent="end">
              <Button colorScheme="blue" onClick={HandleOpenModal}>
                Add Notes
              </Button>
              {/* <Button colorScheme="blue" onClick={() => router.push("/notes/add")}>
                Add Notes
              </Button> */}
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
                {/* Start Modal Delete */}
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
                {/* End Modal Delete */}

                {/* Start Modal Add */}
                <Modal isOpen={isAddModalOpen} onClose={HandleCloseModal}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Add Notes</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Grid gap="5">
                        <GridItem>
                          <Text>Title</Text>
                          <Input name="title" value={notes?.title} onChange={HandleInputChange} type="text" />
                        </GridItem>
                        <GridItem>
                          <Text>Description</Text>
                          <Textarea name="description" value={notes?.description} onChange={HandleInputChange} />
                        </GridItem>
                      </Grid>
                    </ModalBody>
                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={HandleSubmit}>
                        Submit
                      </Button>
                      <Button onClick={HandleCloseModal}>Cancel</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
                {/* End Modal Add */}

                {/* Start Modal Edit */}

                {/* End Modal Edit */}
              </Grid>
            </Flex>
          </Box>
        </div>
      </LayoutComponent>
    </>
  );
}
