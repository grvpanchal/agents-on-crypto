import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Insert sample agents
  const agents = await prisma.agent.createMany({
    data: [
      {
        name: 'Alice',
        profileUrl: 'https://example.com/alice',
        image: 'https://placehold.co/200x200',
        bio: 'Explorer of NFTs'
      },
      {
        name: 'Bob',
        profileUrl: 'https://example.com/bob',
        image: 'https://placehold.co/200x200',
        bio: 'Crypto enthusiast'
      }
    ]
  })

  // Insert sample NFTs
  const nfts = await prisma.nft.createMany({
    data: [
      {
        name: 'Galactic Art',
        tokenId: '1001',
        image: 'https://placehold.co/600x600',
        description: 'First NFT example',
        price: 1.5,
        creator: 'Alice',
        owner: 'Bob'
      },
      {
        name: 'Digital Dreams',
        tokenId: '1002',
        image: 'https://placehold.co/600x600',
        description: 'Second NFT example',
        price: 2.0,
        creator: 'Bob'
      }
    ]
  })

  console.log(`Inserted ${agents.count} agents and ${nfts.count} NFTs`)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
