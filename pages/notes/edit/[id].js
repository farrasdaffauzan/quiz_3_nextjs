import dynamic from "next/dynamic";
import { Grid, GridItem, Card, Heading, Text, Button, Input, Textarea } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function EditNotes() {
  const router = useRouter();
  const { id } = router?.query;
  const [notes, setNotes] = useState();

  const HandleSubmit = async () => {
    try {
      const response = await (
        await fetch(`https://paace-f178cafcae7b.nevacloud.io/api/notes/update/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: notes?.title, description: notes?.description }),
        })
      ).json();
      if (response?.success) {
        router.push("/notes");
      }
    } catch (error) {}
  };

  useEffect(() => {
    async function fetchingData() {
      const listNotes = await (await fetch(`https://paace-f178cafcae7b.nevacloud.io/api/notes/${id}`)).json();
      setNotes(listNotes?.data);
    }
    fetchingData();
  }, [id]);

  return (
    <>
      <LayoutComponent metaTitle="Notes">
        <div className="mx-auto max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <Card margin="5" padding="5">
            <Heading>Edit Notes</Heading>
            <Grid gap="5">
              <GridItem>
                <Text>Title</Text>
                <Input type="text" value={notes?.title || ""} onChange={(event) => setNotes({ ...notes, title: event.target.value })} />
              </GridItem>
              <GridItem>
                <Text>Description</Text>
                <Textarea value={notes?.description || ""} onChange={(event) => setNotes({ ...notes, description: event.target.value })} />
              </GridItem>
              <GridItem>
                <Button onClick={() => HandleSubmit()} colorScheme="blue">
                  Submit
                </Button>
              </GridItem>
            </Grid>
          </Card>
        </div>
      </LayoutComponent>
    </>
  );
}
