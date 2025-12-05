# MARCA AÍ 

`SISTEMAS DE INFORMAÇÃO`

`TRABALHO INTERDISCIPLINAR: APLICAÇÕES PARA PROCESSOS DE NEGÓCIOS`

`2025/2`

Este projeto irá desenvolver uma aplicação  com foco em otimizar as operações de uma barbearia. Propondo e desenvolvendo um sistema de automação de processos, visando otimizar a gestão de agendamentos, o relacionamento com o cliente e o controle operacional, promovendo maior eficiência e satisfação.

## Integrantes

* Bruno Rodrigues dos Santos Primo 
* Gustavo Henrique Ferreira
* João Gabriel Moutinho dos Santos
* Rhaniel Lucas Pinto
* Talisson Vilaça Silva
* Victoria Gabriella Maia Silva

## Orientador

* Cleia Marcia Gomes Amaral

## Instruções de utilização

Para executar o projeto Marca Aí em ambiente de desenvolvimento local, siga os passos abaixo.

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

* Servidor Web com PHP (XAMPP) — PHP 8.0 ou superior
* MySQL Server (8.0 ou superior)
* Navegador moderno (Google Chrome, Edge ou Firefox)
* Editor de código (VS Code recomendado)
* Git (caso o projeto seja clonado de um repositório)

### Configuração do Banco de Dados

1. Inicie o serviço do banco de dados (MySQL)
2. Acesse seu gerenciador de banco de dados (phpMyAdmin)
3. Crie o banco de dados: marca_ai
4. Execute o script de criação de tabelas localizado no projeto: /src/db/bd_tabelas.sql
5. Verifique se todas as tabelas foram criadas corretamente, como: servicos, agendas, barbearia, cadastro_barbearia, cliente, profissional

### Configuração da Aplicação

1. Caso utilize Git, clone o repositório: git clone https://github.com/SEU-USUARIO/marca-ai.git
2. Navegue até a pasta do projeto e localize o arquivo de conexão: src/db/Site MarcaAi/Tipo_Acesso/conexao.php
3. Edite as credenciais do banco de dados conforme seu ambiente local:
   $host = "localhost";
   $user = "root";
   $pass = ""; 
   $db   = "marca_ai";
4. Certifique-se de que o projeto está dentro da pasta correta do servidor local: htdocs/marca-ai (XAMPP)
5. Verifique se a API está acessível: http://localhost/marca-ai/api/

### Executando a Aplicação

1. Inicie os serviços MySQL no painel do XAMPP
2. Abra o navegador e acesse: http://localhost/marca-ai/
3. A interface será carregada e se comunicará automaticamente com a API PHP por meio de requisições API

### Login Inicial

Caso o script SQL fornecido já inclua dados de teste, utilize as credenciais existentes ou cadastre um novo usuário utilizando a tela Cadastro para registrar um novo acesso.


# Documentação

<ol>
<li><a href="docs/1-Contexto.md"> Documentação de Contexto</a></li>
<li><a href="docs/2-Especificação.md"> Especificação do Projeto</a></li>
<li><a href="docs/3-Modelagem-Processos-Negócio.md"> Modelagem dos Processos de Negocio</a></li>
<li><a href="docs/4-Projeto-Solucao.md"> Projeto da solução</a></li>
<li><a href="docs/5-Planejamento-Projeto.md"> Planejamento do Projeto</a></li>
<li><a href="docs/6-Interface-Sistema.md"> Interface do Sistema</a></li>
<li><a href="docs/7-Conclusão.md"> Conclusão</a></li>
<li><a href="docs/8-Referências.md"> Referências</a></li>
</ol>

# Código

<li><a href="src/db/Site MarcaAi"> Código Fonte</a></li>

# Apresentação

<li><a href="docs/apresentacao"> Apresentação</a></li>

