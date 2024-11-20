import express from 'express'
import dotenv from 'dotenv'
import axios from 'axios'
import cors from 'cors'

dotenv.config()
const porta = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())

interface ImagemGato{
    id: string;
    url: string;
}

app.get('/api/gatos', async (req, res) => {
    try{
        const { data } = await axios.get("https://api.thecatapi.com/v1/images/search?limit=10")
        const listaDeGatos: ImagemGato[] = data.splice(5, 5).map((gato: ImagemGato) => {
            return { 
                id: gato.id, 
                url: gato.url 
            }
        })
        res.status(200).json(listaDeGatos)
    }
    catch(e){
        res.status(400).json({mensagem: 'Erro ao obter as imagens'})
    }
})

app.listen(porta, () => console.log(`Servidor aberto na porta ${porta}.`))