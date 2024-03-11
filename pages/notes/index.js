import dynamic from "next/dynamic";
import { Box, Flex, Grid, GridItem, Card, CardBody, CardHeader, CardFooter, Heading, Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function Notes() {
  const router = useRouter();
  const [notes, setNotes] = useState();

  const HandleDelete = async (id) => {
    try {
      const response = await fetch(`api/notes/delete/${id}`);
      const result = await response.json();
      if (result?.success) {
        router.reload();
      }
    } catch (error) {}
  };

  useEffect(() => {
    async function fetchingData() {
      const listNotes = await (await fetch("/api/notes")).json();
      setNotes(listNotes);
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
              <Grid templateColumns="repeat(5, 1fr)" gap={10}>
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
                        <Button flex="1" onClick={() => HandleDelete(item?.id)} colorScheme="red">
                          Delete
                        </Button>
                      </CardFooter>
                    </Card>
                  </GridItem>
                ))}
              </Grid>
            </Flex>
          </Box>
        </div>
      </LayoutComponent>
    </>
  );
}
