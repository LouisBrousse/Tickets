import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()

app.use(express.json());

app.get('/api/ticket', async (req, res) => {
    const tickets = await prisma.ticket.findMany();
    res.json(tickets);
 })

 app.get('/api/ticket/:id', async (req, res) => {
    const objetId = parseInt(req.params.id);
   
    const ticket = await prisma.objet.findUnique({
        where: { id: objetId },
      });
    res.json(ticket);
 })

app.post('/api/ticket', async (req, res) => {

    const newTicket = await prisma.ticket.create({
        data: req.body
    
    });
    res.send(newTicket)
});

app.delete('/api/ticketsup', async (req, res) => {
    const deletetickets = await prisma.ticket.deleteMany({})
    res.json('DB éffacée')
    })



app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });

//  créer la route GET /api/ticket qui renvoie la liste de tous les tickets
//  créer la route POST /api/ticket qui créé un nouveau ticket
//  créer la route POST /api/ticketsup qui supp un nouveau ticket
//  utiliser la route POST /ticket lors de la validation du formulaire
