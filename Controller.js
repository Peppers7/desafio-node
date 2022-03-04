const express = require('express');
const cors = require('cors');

const {Sequelize}= require('./models');


const models=require('./models');

const app=express();
app.use(cors());
app.use(express.json());

let cliente=models.Cliente;
let itempedido = models.ItemPedido;
let pedido = models.Pedido;
let servico = models.Servico;

app.get('/', function(req, res){
    res.send('Olá, mundo!')
});

app.post('/servicos', async(req,res) =>{
    await servico.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Serviço criado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message:"Foi impossivel se conectar"
        });
    });
});

app.post('/clientes', async(req,res) =>{
    await cliente.create(
        req.body
        ).then(function(){
            return res.json({
                error: false,
                message: "Cliente cadastrado com sucesso!"
            })
        }).catch(function(erro){
            return res.status(400).json({
                error: true,
                message:"Foi impossivel efetuar o cadastro"
            });
        });
    });

app.post('/pedidos', async(req, res) =>{
    await pedido.create(
        req.body
        ).then(function(){
            return res.json({
                error: false,
                message: "Pedido cadastrado com sucesso!"
            })
        }).catch(function(erro){
            return res.status(400).json({
                error: true,
                message:"Foi impossivel efetuar o Pedido"
            })
        });
    });

    app.post('/itempedidos', async(req, res) =>{
        await itempedido.create(
            req.body
            ).then(function(){
                return res.json({
                    error: false,
                    message: "item cadastrado com sucesso!"
                })
            }).catch(function(erro){
                return res.status(400).json({
                    error: true,
                    message:"Foi impossivel efetuar o Pedido"
                })
            });
        });

        app.get('/listaservicos', async(req, res) =>{
            await servico.findAll({
            //    raw: true
            order: [['nome', 'ASC' ]]
            }).then(function(servicos){
                res.json({servicos})
            });
        });

        app.get('/ofertaservicos', async(req, res) =>{
            await servico.count('id').then(function(servicos){
                res.json({servicos});
            });
        });

        app.get('/servico/:id', async(req, res) =>{
            await servico.findByPk(req.params.id)
            .then(serv =>{
                return res.json({
                    error: false,
                    serv
                });
            }).catch(function(erro){
                return res.status(400).json({
                    error: true,
                    message: "Erro: Código não encontrado"
                });
            });
        });

        app.get('/listaclientes', async(req, res) =>{
            await servico.findAll({
              raw: true
            
            }).then(function(clientes){
                res.json({clientes})
            });
        });

        app.get('/listaclientes', async(req, res) =>{
            await servico.findAll({
              raw: true
            
            }).then(function(clientes){
                res.json({clientes})
            });
        });
           
        app.put('/atualizaservico', async(req, res) =>{
            await servico.update(req.body,{
                where: {id: req.body.id}
            }).then(function(){
                return res.json({
                    error: false,
                    message: "Serviço alterado com sucesso!"
                });
            }).catch(function(error){
                return res.status(400).json({
                    error: true,
                    message: "Erro na alteração do serviço."
                });
            });
        });
    

        app.get('/pedidos/:id', async(req, res)=>{
            await pedido.findByPk(req.params.id,{include:[{all: true}]})
            .then(ped=>{
                return res.json({ped});
            })
        })

        app.put('/pedidos/:id/editaritem', async(req, res)=>{
         const item={
             quantidade: req.body.quantidade,
             valor: req.body.valor
         };
         if (!await pedido.findByPk(req.params.id)){
             return res.status(400).json({
                 error: true,
                 message: 'Pedido não foi encontrado.'
             });
         };
         if(!await servico.findByPk(req.body.ServicoId)){
             return res.status(400).json({
                 error: true,
                 message: 'Serviço não foi encontrado.'
             });
         };
         await itempedido.update(item, {
             where: Sequelize.and({ServicoId: req.body.ServicoId},
                {PedidoId: req.params.id})
         }).then(function(itens){
             return res.json({
                 error: false,
                 message: "Pedido  foi alterado com sucesso!",
             });
         }).catch(function(erro){
             return res.status(400).json({
                 error: true,
                 message: "Erro: Não foi possivel alterar."
             });
         });
        });



        app.get('/excluircliente/:id', async(req, res) =>{
            await cliente.destroy({
                where: {id: req.params.id}
            }).then(function(){
                return res.json({
                    error: false,
                    message: "cliente excluido com sucesso!"
                });
            }).catch(function(error){
                return res.status(400).json({
                    error: true,
                    message: "Erro ao excluir o cliente."
                });
            });
        });

        app.post('/compra', async(req,res) =>{
            await compra.create(
                req.body
            ).then(function(){
                return res.json({
                    error: false,
                    message: "Compra realizada com sucesso!"
                })
            }).catch(function(erro){
                return res.status(400).json({
                    error: true,
                    message:"Foi impossivel se Comprar"
                });
            });
        });


        app.post('/itemcompra', async(req,res) =>{
            await itemcompra.create(
                req.body
            ).then(function(){
                return res.json({
                    error: false,
                    message: "Item adicionado com sucesso!"
                })
            }).catch(function(erro){
                return res.status(400).json({
                    error: true,
                    message:"Foi impossivel adicionar esse item"
                });
            });
        });
        
        app.post('/produto', async(req,res) =>{
            await itemcompra.create(
                req.body
            ).then(function(){
                return res.json({
                    error: false,
                    message: "Produto adicionado com sucesso!"
                })
            }).catch(function(erro){
                return res.status(400).json({
                    error: true,
                    message:"Foi impossivel adicionar esse Produto"
                });
            });
        });

        app.get('/listacompra', async(req, res) =>{
            await compra.findAll({
              raw: true
            
            }).then(function(compras){
                res.json({compras})
            });
        });
        
        
        app.get('/listaitemcompra', async(req, res) =>{
            await itemcompra.findAll({
              raw: true
            
            }).then(function(itemcompras){
                res.json({itemcompras})
            });
        });

        app.get('/listaprodutos', async(req, res) =>{
            await produto.findAll({
              raw: true
            
            }).then(function(produtos){
                res.json({produtos})
            });
        });

        app.put('/atualizacompra', async(req, res) =>{
            await compra.update(req.body,{
                where: {id: req.body.id}
            }).then(function(){
                return res.json({
                    error: false,
                    message: "Compra alterado com sucesso!"
                });
            }).catch(function(error){
                return res.status(400).json({
                    error: true,
                    message: "Erro na alteração do Compra."
                });
            });
        });

        app.put('/atualizaitemcompra', async(req, res) =>{
            await itemcompra.update(req.body,{
                where: {id: req.body.id}
            }).then(function(){
                return res.json({
                    error: false,
                    message: "Item alterado com sucesso!"
                });
            }).catch(function(error){
                return res.status(400).json({
                    error: true,
                    message: "Erro na alteração do Item."
                });
            });
        });

        app.put('/atualizaproduto', async(req, res) =>{
            await produto.update(req.body,{
                where: {id: req.body.id}
            }).then(function(){
                return res.json({
                    error: false,
                    message: "Produto alterado com sucesso!"
                });
            }).catch(function(error){
                return res.status(400).json({
                    error: true,
                    message: "Erro na alteração do Produto."
                });
            });
        });

        app.get('/excluircompra/:id', async(req, res) =>{
            await compra.destroy({
                where: {id: req.params.id}
            }).then(function(){
                return res.json({
                    error: false,
                    message: "Compra excluido com sucesso!"
                });
            }).catch(function(error){
                return res.status(400).json({
                    error: true,
                    message: "Erro ao excluir o Compra."
                });
            });
        });

        app.get('/excluiritemcompra/:id', async(req, res) =>{
            await itemcompra.destroy({
                where: {id: req.params.id}
            }).then(function(){
                return res.json({
                    error: false,
                    message: "item excluido com sucesso!"
                });
            }).catch(function(error){
                return res.status(400).json({
                    error: true,
                    message: "Erro ao excluir o item."
                });
            });
        });

        app.get('/excluirproduto/:id', async(req, res) =>{
            await produto.destroy({
                where: {id: req.params.id}
            }).then(function(){
                return res.json({
                    error: false,
                    message: "produto excluido com sucesso!"
                });
            }).catch(function(error){
                return res.status(400).json({
                    error: true,
                    message: "Erro ao excluir o produto."
                });
            });
        });

        

    

app.get('/clientes', function(req, res){
    res.send('Seja bem vindo(a) a ServicesTI')
});

let port=process.env.PORT || 3001;

app.listen(port,(req,res)=>{
    console.log('Servidor ativo: http://localhost:3001');
})