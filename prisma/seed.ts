import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main(){
  const tom = await prisma.admin.upsert({
    where:{email:"tom@gmail.com"},
    update:{},
    create:{
      email:'tom@gmail.com',
      password:"admin"
    }
  })
}