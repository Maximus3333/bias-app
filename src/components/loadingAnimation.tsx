import { Spinner, Text, VStack } from "@chakra-ui/react"

const LoadingAnimation = () => {
    return (
        <VStack colorPalette="teal" align="center">
            <Spinner
            
  color='blue.500'
  size='xl'
/>
            <Text color="colorPalette.600">Loading...</Text>
        </VStack>
    )
}
export default LoadingAnimation;