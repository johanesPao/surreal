/**
 * Eksekusi script ini dengan menggunakan 
 * 'npx prisma migrate reset' (pada development)
 */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
async function main() {

  const kategori = await prisma.kategori.createMany({
    data: [
      {
        idKategori: 'd259dbdb-bd18-45bf-9616-c32598ab1c9f',
        nama: 'machine learning',
        warna: '#2A629A',
      },
      {
        idKategori: '00369728-ea7d-4454-bbb5-f1f0d304dc1b',
        nama: 'large language model',
        warna: '#EE4E4E'
      }
    ]
  })

  const jpao = await prisma.pengguna.create({
    data: {
      idPengguna: '82d92e01-9cdf-4815-b110-7cee01d5f278',
      namaPengguna: 'jpao',
      kataKunci: 'testestes',
      email: 'johanes.pao@gmail.com',
      admin: true,
      penulis: {
        create: {
          idPenulis: 'c1fb2b04-39ea-43a9-9bf0-ac7839d16ec1',
          namaPena: 'Johanes Indra Pradana Pao',
        }
      },
      tulisan: {
        create: [
          {
            idTulisan: '4c3d9ba1-e09f-4d67-a206-dddab11dcadd',
            judul: 'What is a large language model (LLM)?',
            dimodifikasi: new Date(),
            konten: 'A large language model (LLM) is a type of artificial intelligence (AI) program that can recognize and generate text, among other tasks. LLMs are trained on huge sets of data — hence the name "large." LLMs are built on machine learning: specifically, a type of neural network called a transformer model. In simpler terms, an LLM is a computer program that has been fed enough examples to be able to recognize and interpret human language or other types of complex data. Many LLMs are trained on data that has been gathered from the Internet — thousands or millions of gigabytes\' worth of text. But the quality of the samples impacts how well LLMs will learn natural language, so an LLM\'s programmers may use a more curated data set. LLMs use a type of machine learning called deep learning in order to understand how characters, words, and sentences function together. Deep learning involves the probabilistic analysis of unstructured data, which eventually enables the deep learning model to recognize distinctions between pieces of content without human intervention. LLMs are then further trained via tuning: they are fine-tuned or prompt-tuned to the particular task that the programmer wants them to do, such as interpreting questions and generating responses, or translating text from one language to another.',
            diterbitkan: true,
            kategori: {
              connect: [
                {
                  idKategori: 'd259dbdb-bd18-45bf-9616-c32598ab1c9f'
                },
                {
                  idKategori: '00369728-ea7d-4454-bbb5-f1f0d304dc1b'
                }
              ]
            }
          },
          {
            idTulisan: '3490b7bf-850b-4af9-9cad-2345106af652',
            judul: 'Scalar, Vector, Tensor',
            dimodifikasi: new Date(),
            konten: ' Scalar, vector, tensor - a mathematical representation of a physical entity that may be characterized by a magnitude and/or directions associated with it. Scalars, vectors and tensors are quantities, which do not change if the system of coordinates is changed (e.g. between Cartesian, cylindrical, spherical).1)2) Scalars, vectors and tensors are widely used in mathematical treatment of electromagnetic problems, as well as in the way the Maxwell\'s equations are typically formulated.3) Vector calculus (as well as tensor calculus) can be used with analytical equations, as well as numerical calculations such as finite element modelling.4)5) Vectors can be analysed from the viewpoint of covariant and contravariant components, and can be transformed between various coordinate systems, including non-orthogonal ones. There are many detailed implications regarding vectors and calculations based of them, and it is best to study the relevant textbooks and literature, as well as practice with simpler cases before performing more complex calculations.6) This article contains only the most basic information. ',
            diterbitkan: true,
            kategori: {
              connect: [
                {
                  idKategori: 'd259dbdb-bd18-45bf-9616-c32598ab1c9f'
                }
              ]
            }
          }
        ]
      }
    },
  })

  const xnspao = await prisma.pengguna.create({
    data: {
      idPengguna: '1e2c9fc8-ca30-4fd9-9d55-dac2a9b8db74',
      namaPengguna: 'xns.pao',
      kataKunci: 'huhuhu',
      email: 'xns.pao@gmail.com',
      admin: true,
      penulis: {
        create: {
          idPenulis: '2e067309-e8fd-4264-b174-37418798f7b6',
          namaPena: 'Xavier Nawasena Sagara Pao',
        }
      }
    }
  })
  
  console.log({ kategori, jpao, xnspao })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })