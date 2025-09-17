### 3.3.2 Processo 2 – CADASTRO DE USUÁRIOS

**Etapas do Processo**
01. Iniciar Cadastro na Plataforma
O cliente seleciona a opção de realizar um novo cadastro.
02. Preencher Dados do Cadastro
O cliente insere as informações solicitadas (nome, e-mail, senha, etc.).
03. Verificar Dados Informados
O sistema valida os dados fornecidos.
Decisão: Dados Corretos?
Não → o sistema retorna mensagem de dados incorretos e o cliente deve corrigir as informações.
Sim → o sistema retorna a confirmação de cadastro.
04. Armazenar na Base de Dados
Os dados corretos são registrados no banco de dados.
05. Retornar Confirmação de Cadastro
O sistema envia a confirmação ao cliente.
06. Término
O processo de cadastro é finalizado.

<img width="1020" height="313" alt="image" src="https://github.com/user-attachments/assets/93faf312-8aae-42c0-a7a3-6411cd4e7a67" />



#### Detalhamento das atividades
**Iniciar Cadastro na Plataforma**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| botãoCadastro | Botão/Link  |   Obrigatório             |        -           |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| iniciar | Preencher Dados do Cadastro  | default |
| cancelar       |            Término                    |        cancel           |


**Preencher Dados No Cadastro**


| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---               | ---            |
| Nome            | Caixa De Texto   | Obrigatório; Somente Letras        |      _    |
| E-Mail | Caixa de Texto  |  Obrigatório; Formato de e-mail              |         _          |
| Celular             | Número              | Obrigatório; De 9 a 11 Dígitos            |      _       |
| Usuário | Caixa de Texto  |  Obrigatório;               |         _          |
| Senha             | Caixa De Texto             | Obrigatório; Mínimo 8 caractéres            |      _       |


| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Enviar               | Verificar Dados Informados             | default           |
| cancelar            | Término  | cancel               |


**Verificar Dados Informados**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |

