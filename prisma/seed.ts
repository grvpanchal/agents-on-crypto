import { PrismaClient } from '@prisma/client'
import {
  mockNFTs,
  mockCollections,
  mockCategories,
} from '../lib/mockData'

const prisma = new PrismaClient()

async function main() {
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

  const nfts = await prisma.nft.createMany({ data: mockNFTs })
  await prisma.collection.createMany({ data: mockCollections })
  await prisma.category.createMany({ data: mockCategories })

  const activities = await prisma.activity.createMany({
    data: [
      {
        type: 'Purchase',
        item: 'Cosmic Voyager #42',
        price: 0.85,
        fromAddress: '0x7896543210fedcba7896543210fedcba78965432',
        toAddress: '0x1234567890abcdef1234567890abcdef12345678',
        date: new Date(2023, 5, 15)
      },
      {
        type: 'Listing',
        item: 'Digital Dreams #7',
        price: 1.2,
        fromAddress: '0x1234567890abcdef1234567890abcdef12345678',
        toAddress: null,
        date: new Date(2023, 5, 10)
      },
      {
        type: 'Offer',
        item: 'Abstract Realms #18',
        price: 0.75,
        fromAddress: '0x3456789012abcdef3456789012abcdef34567890',
        toAddress: '0x1234567890abcdef1234567890abcdef12345678',
        date: new Date(2023, 5, 8)
      },
      {
        type: 'Mint',
        item: 'Crystal Genesis #3',
        price: null,
        fromAddress: '0x0000000000000000000000000000000000000000',
        toAddress: '0x1234567890abcdef1234567890abcdef12345678',
        date: new Date(2023, 5, 5)
      },
      {
        type: 'Sale',
        item: 'Ethereal Visions #11',
        price: 2.1,
        fromAddress: '0x1234567890abcdef1234567890abcdef12345678',
        toAddress: '0x5678901234abcdef5678901234abcdef56789012',
        date: new Date(2023, 5, 1)
      }
    ]
  })

  console.log(
    `Inserted ${agents.count} agents, ${nfts.count} NFTs, ${mockCollections.length} collections, ${mockCategories.length} categories and ${activities.count} activities`
  )
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
