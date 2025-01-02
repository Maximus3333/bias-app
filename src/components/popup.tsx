// src/components/Popup.tsx
import usePageText from "../hooks/usePageText";
import {useEffect, useState } from 'react';
import { getOpenAIResponse } from "../services/openAiBiasScoreService";
import { Box, HStack, Text, Card, Center } from "@chakra-ui/react";
// import { ProgressBar, ProgressRoot } from "@/components/ui/progress";
import LoadingAnimation from "@/components/loadingAnimation";

const Popup = () => {
  const { pageText, loading, setLoading } = usePageText();
  const [response, setResponse] = useState<any>('');


  const basePrompt = "You are a unbiased assistant. Respond with a overall score between -5 to 5 of current politically leaning and logic with text evidence to back up your score. 5 being the most conservative and -5 being most liberal. Also, return a famous political figures name that aligns with this articles politically meaning. Return Json format with key 'score', 'political_figure_name', and 'evidence'. Do not include the word 'JSON' in the response and do not use outer quotes";

  useEffect(() => {
    if (pageText != "") {
      handleSubmit();
    }

  }, [pageText]);
  const handleSubmit = async () => {
    try {
      const fullPrompt = `${basePrompt} Here is the text to analyze: ${pageText}`;
      const res = await getOpenAIResponse(fullPrompt);
      setResponse(res);
      console.log(res);
    } catch (error) {
      console.error('Error fetching OpenAI response:', error);
    } finally {
      setLoading(false); // Set loading state to false when the API call ends
    }
  };
  const getProgressValue = (score: number) => {
    return ((score + 5) / 10) * 100; // Convert score from -5 to 5 range to 0 to 100 range
  };

  return (
    <Card.Root width="320px">
      <Card.Body gap="2">
      <Center fontSize="xl">
      {loading ? (
          <LoadingAnimation />
      ) : (
        <Box>
          <Text>Score: {response.score}</Text>
          <Text>Political Figure: {response.political_figure_name}</Text>
          <Box mt={4}>
            <Text>Political Spectrum:</Text>
            <Box position="relative" height="20px" width="100%" bg="gray.200" borderRadius="md">
              <Box
                position="absolute"
                height="100%"
                width={`${getProgressValue(response.score)}%`}
                bg={response.score < 0 ? "blue.500" : "red.500"}
                borderRadius="md"
              />
              <Box
                position="absolute"
                height="100%"
                borderRadius="md"
                width="2px"
                bg="black"
                left="50%"
                transform="translateX(-50%)"
              />
            </Box>
            <HStack justifyContent="space-between" mt={2}>
              <Text color="blue.500">Left</Text>
              <Text color="red.500">Right</Text>
            </HStack>
          </Box>
        </Box>

      )}

      </Center>
      </Card.Body>

      </Card.Root>
    );
};

export default Popup;
