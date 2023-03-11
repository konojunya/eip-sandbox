import {Box, Button, Code, Text} from '@chakra-ui/react';
import {ConnectWallet, useSDK} from '@thirdweb-dev/react';
import {NextPage} from 'next';

// sample: https://docs.metamask.io/guide/signing-data.html#signtypeddata-v4
const message = {
  contents: 'Hello, Bob!',
  attachedMoneyInEth: 4.2,
  from: {
    name: 'Cow',
    wallets: [
      '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
      '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF',
    ],
  },
  to: [
    {
      name: 'Bob',
      wallets: [
        '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
        '0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57',
        '0xB0B0b0b0b0b0B000000000000000000000000000',
      ],
    },
  ],
};

const signData = {
  // Refer to PrimaryType
  Mail: [
    {name: 'from', type: 'Person'},
    {name: 'to', type: 'Person[]'},
    {name: 'contents', type: 'string'},
  ],
  // Not an EIP712Domain definition
  Person: [
    {name: 'name', type: 'string'},
    {name: 'wallets', type: 'address[]'},
  ],
};

const Top: NextPage = () => {
  const sdk = useSDK();

  const handleSign = async () => {
    if (sdk == null) {
      return;
    }

    const res = await sdk.wallet.signTypedData(
      {
        name: 'MyERC712',
        version: '1',
        verifyingContract: '0xFd4F93116FF58FFBf6531B6e0e3cac0FAADe3089',
      },
      signData,
      message
    );

    // eslint-disable-next-line no-console
    console.log(res);
  };

  return (
    <Box p={5}>
      <Box maxW="300px">
        <ConnectWallet />
      </Box>

      <Button mt={4} onClick={handleSign}>
        signTypedData(EIP-712)
      </Button>

      <Box>
        <Text>Sign Data</Text>
        <Code>{JSON.stringify(signData)}</Code>
      </Box>
    </Box>
  );
};

export default Top;
