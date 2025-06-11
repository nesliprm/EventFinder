import { Box, Text, Center, Link } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Box as="footer" py={4} mt={10}>
      <Center>
        <Text fontFamily="monospace" fontSize="xs" color="gray.600">
          built by{" "}
          <Link
            href="https://github.com/nesliprm"
            target="blank"
            fontWeight={600}
          >
            nesli
          </Link>{" "}
          - 2025
        </Text>
      </Center>
    </Box>
  );
};
