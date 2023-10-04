import { PrismaClient } from "@prisma/client";

//global var holding instance of PrismaClient
declare global {
  var prisma: PrismaClient | undefined;
}

//checks if a global prisma object exists
const prismadb = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

export default prismadb;
