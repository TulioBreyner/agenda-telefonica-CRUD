const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(express.json());
app.use(cors());


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'agenda',
});

app.post('/contatos', (req, res) => {
    const { nome, telefone, email } = req.body;
    connection.query('CALL pAdicionarContato(?, ?, ?)', [nome, telefone, email], (err, result) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.send({ message: 'Contato adicionado' });
    });
});

app.get('/contatos', (req, res) => {
    connection.query('CALL pListarContato()', (err, result) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(result[0]);
    });
});

app.put('/contatos/:id', (req, res) => {
    const { id } = req.params;
    const { nome, telefone, email } = req.body;
    console.log("Atualizando contato:", id, nome, telefone, email);
    connection.query(`CALL pAtualizarContato(${id}, ?, ?, ?)`, [nome, telefone, email], (err, result) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.send({ message: 'Contato atualizado com sucesso!' });
    });
});

app.delete('/contatos/:id', (req, res) => {
    const { id } = req.params;
    connection.query(`CALL pDeletarContato(${id})`, (err, result) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.send({ message: 'Contato deletado com sucesso!' });
    });
});

app.listen(3000, () => {console.log("Servidor rodando na porta 3000")});