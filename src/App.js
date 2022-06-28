import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Grid,
  theme,
  Input,
  Button,
  Center,
  Heading,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Textarea,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

function App() {

  const [notes, setNotes] = React.useState([]);


  const [content, setContent] = React.useState('');
  const [title, setTitle] = React.useState('');

  React.useEffect(() => {
    //Get the note from the local storage
    const notes = localStorage.getItem('notes');
    //If there is a note, set it to the state
    if (notes) {
      setNotes(JSON.parse(notes));
    }

    
  }, []);

  const addNote = () => {
    if (!title && !content) { return; }

    var newNote = new Object();
    newNote.title = title;
    newNote.content = content;

    notes.push(newNote);
    setNotes(notes);
    localStorage.setItem('notes', JSON.stringify(notes));
    onClose();

  }

  const removeNote = (note) => {
    setNotes(notes.filter(n => n !== note));
    localStorage.setItem('notes', JSON.stringify(notes.filter(n => n !== note)));
  }

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  }

  const handleChangeContent = (e) => {
    setContent(e.target.value);
  }

  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  return (
    <ChakraProvider theme={theme}>
      <>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add a note</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input onKeyDownCapture={handleChangeTitle} ref={initialRef} placeholder='ex: Make dinner' />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Content</FormLabel>
                <Textarea onKeyDownCapture={handleChangeContent} placeholder='ex: prepare all the tools' />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button onClick={addNote} colorScheme='blue' mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
      <Box textAlign="center" fontSize="xl">
        <Flex>
          <ColorModeSwitcher />
        </Flex>
        <Box alignItems={"center"} textAlign="center" fontSize="xl">
          <Heading marginBottom={4}>What do you have to do ?</Heading>
          <Button onClick={onOpen} colorScheme={'twitter'}>
            Or do you want to add a note ?
          </Button>
        </Box>
      </Box>
      <Box >
        <Center>
          <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']} gap={2}>
            {notes.map((note, index) => (
              <Box position={"relative"} p={3} marginTop={"5"} marginBottom={"5"} borderColor="blackAlpha.100" borderRadius={'lg'} bg="whiteAlpha.200" shadow={'xl'} height={"auto"} width={"56"} key={index}>
                <Button width={1} height={5} position={"absolute"} top={0} right={0} onClick={() => removeNote(note)} colorScheme={'red'}>
                  X
                </Button>
                <Heading marginBottom={1} marginTop={"2"} fontSize={'lg'}>{note.title}</Heading>
                <Text>{note.content}</Text>
              </Box>
            ))}
          </Grid>
        </Center>
      </Box>
    </ChakraProvider>
  );
}

export default App;
