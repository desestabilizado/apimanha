const db=require('../db/db');//Módulo de conexão com o banco de dados
const Joi = require('joi'); //Biblioteca de validação de dados
const bcrypt = require('bcrypt');//Para encriptação de senhas

const clienteSchema = Joi.object({
    cpf:Joi.string().length(11).required().max(50),
    //CPF devve ser uuma string de exatamente 11 caracteres
    nome:Joi.string().required().max(50),
    //Nome deve ser uma string e é obrigatório
    endereco:Joi.string().required(),
    //endereço deve ser uma string e é obrigatório
    bairro:Joi.string().required(),
    //bairro deve ser uma string pois
    cidade:Joi.string().required().max(30),
    cep:Joi.string().required(),
    telefone:Joi.string().required(),
    email:Joi.string().required().max(50),
    senha:Joi.string().required().max(300)
});

// Listar todos os clientes
exports.listarClientes=async(req,res) =>{
    try{
        const [result] = await db.query('SELECT * FROM CLIENTE')
        res.json(result); // Aqui retornamos apenas os dados da cunsulta

     } catch (err){
        console.error('Erro ao buscar cliente:',err);
        res.status(500).json({error : 'Erro interno do servidor'});
        
     }

}

//Buscar um cliente por cpf

exports.listarClientesCpf= async(req,res) =>{
    const {cpf}=req.params;
    try{
        const[result]=await db.query('SELECT * FROM cliente WHERE cpf =?',[cpf]);
        if(result.length ===0){
            return res.status(404).json({error:'Cliente não encontrado'});

        }
        res.json(result[0]);
    }catch(err) {
        console.error('Eroo ao buscar cliente:',err);
        res.status(500).json({error:'Erro interno do servidor'});
        
    }
}

//adicinar novo cliente
exports.adicinarCliente=async(req,res) => {
    const{cpf,nome,endereco,bairro,cidade,cep,telefone,email,senha}=req.body;
    //validação de dados

    const {error}=clienteSchema.validade({cpf,nome,endereco,bairro,cidade,cep,telefone,email,senha});
    if(error){
        return res.status(400).json({error:error.details[0].message});
    
}
try {
    const hash =await bcrypt.hash(senha,10);
    const novoCliente={cpf,nome,enereco,bairro,cidade,cep,telefone,email,senha:hash};
    await db.query('INSERT INTO cliente SET ?',novoCliente);

    res.json({message:'Cliente adicionado om sucesso'})

} catch (err) {
    console.error('Erro ao adicionar clietne:',err);
    res.status(500).json({error:'Erro ao adicionar cliente'})
    
}
}










