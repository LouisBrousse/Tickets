import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()

app.use(express.json());

app.get('/api/ticket', async (req, res) => {
    const tickets = await prisma.ticket.findMany();
    res.json(tickets);
 })

app.post('/api/ticket', async (req, res) => {
    const { email, description, priority, category } = req.body
    const newTicket = await prisma.ticket.create({
        data: {
          email,
          description,
          priority,
          category,}
    
    })
    res.json(newTicket);
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });

//  créer la route GET /api/ticket qui renvoie la liste de tous les tickets
//  créer la route POST /api/ticket qui créé un nouveau ticket
//  utiliser la route POST /ticket lors de la validation du formulaire
