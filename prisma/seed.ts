import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main(){
  const tom = await prisma.admin.findUnique({where:{email:"tom@gmail.com"}});

  if(!tom){
    await prisma.admin.create({
      data:{
        name:"Tom",
        email:"tom@gmail.com",
        password:"admin"
      }
    })
  }
}