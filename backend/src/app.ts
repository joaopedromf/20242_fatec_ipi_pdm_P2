import express from 'express'
import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()
const porta = process.env.PORT

const app = express()
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
        res.json(listaDeGatos)
    }
    catch(e){
        res.json({mensagem: 'Erro ao obter as imagens'})
    }
})

app.listen(porta, () => console.log(`Servidor aberto na porta ${porta}.`))