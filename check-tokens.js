// Script to fetch actual metadata for specific tokens
const IMX_API_BASE_URL = 'https://api.x.immutable.com/v1';
const CTA_CONTRACT_ADDRESS = '0xa04bcac09a3ca810796c9e3deee8fdc8c9807166';

async function fetchTokenMetadata(tokenId) {
  try {
    const response = await fetch(`${IMX_API_BASE_URL}/assets/${CTA_CONTRACT_ADDRESS}/${tokenId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch token ${tokenId}: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching token ${tokenId}:`, error);
    return null;
  }
}

async function main() {
  const tokenIds = ['2610935', '1969305', '2609980'];
  
  for (const tokenId of tokenIds) {
    console.log(`\nFetching metadata for token ${tokenId}...`);
    const asset = await fetchTokenMetadata(tokenId);
    
    if (asset && asset.metadata) {
      console.log(`Token ${tokenId}:`);
      console.log('  Name:', asset.name);
      console.log('  Metadata:', JSON.stringify(asset.metadata, null, 2));
    }
  }
}

main();