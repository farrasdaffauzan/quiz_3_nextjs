import dynamic from "next/dynamic";
import { Grid, GridItem, Card, Heading, Text, Button, Input, Textarea, Center } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function AddNotes() {
  const router = useRouter();
  const [notes, setNotes] = useState({
    title: "",
    description: "",
  });

  const HandleSubmit = async () => {
    try {
      const result = await (
        await fetch("/api/notes/add", {
          method: "POST",
          body: JSON.stringify(notes),
        })
      ).json();
      if (result?.success) {
        router.push("/notes");
      }
    } catch (error) {}
  };

  return (
    <>
      <LayoutComponent metaTitle="Notes">
        <div className="mx-auto max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <Card margin="5" padding="5">
            <Heading textAlign={"Center"}>Add Notes</Heading>
            <Grid gap="5">
              <GridItem>
                <Text>Title</Text>
                <Input type="text" onChange={(event) => setNotes({ ...notes, title: event.target.value })} />
              </GridItem>
              <GridItem>
                <Text>Description</Text>
                <Textarea onChange={(event) => setNotes({ ...notes, description: event.target.value })} />
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
