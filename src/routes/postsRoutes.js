import express from "express";
// Importa o framework Express para criar a aplicação web.

import multer from "multer";
// Importa o módulo `multer` para gerenciar uploads de arquivos.

import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
// Importa funções controladoras para lidar com rotas relacionadas a posts: 
//  * listarPosts: busca todos os posts.
//  * postarNovoPost: cria um novo post.
//  * uploadImagem: processa o upload de imagens.

import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório de destino para os arquivos carregados.
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Define o nome do arquivo carregado. Neste caso, mantém o nome original.
    cb(null, file.originalname);
  }
});

const upload = multer({ dest: "./uploads", storage });
// Cria uma instância do middleware `multer` utilizando a configuração de armazenamento (`storage`).
// O diretório de destino também pode ser definido aqui, mas é sobrescrito pelo `storage`.

const routes = (app) => {
  // Função que define as rotas da aplicação.

  app.use(express.json());
  // Habilita o middleware `express.json()`, que permite que a aplicação receba dados no formato JSON em requisições HTTP.

  app.use(cors(corsOptions));

  app.get("/posts", listarPosts);
  // Define uma rota GET para "/posts" que delega a função `listarPosts` para buscar todos os posts.

  app.post("/posts", postarNovoPost);
  // Define uma rota POST para "/posts" que delega a função `postarNovoPost` para criar um novo post.

  app.post("/upload", upload.single("imagem"), uploadImagem);
  // Define uma rota POST para "/upload" que:
  //  * Utiliza o middleware `upload.single("imagem")` para processar o upload de um único arquivo chamado "imagem".
  //  * Após o upload bem-sucedido, delega a função `uploadImagem` para processar a imagem.

  app.put("/upload/:id", atualizarNovoPost)
};

export default routes;
// Exporta a função `routes` como módulo padrão para ser importada em outros arquivos.