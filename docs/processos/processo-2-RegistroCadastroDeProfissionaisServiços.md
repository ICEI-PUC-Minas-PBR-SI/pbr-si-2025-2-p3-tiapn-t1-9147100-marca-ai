### 3.3.2 Processo 2 – REGISTRO DE PROFISSIONAIS E SERVIÇOS

**Agendamento de Serviços na Barbearia**

**Etapas do Processo**

01 - Realizar Login Na Plataforma

02 - Realizar Cadastro Na Barbearia 

03 - Verificar Dados Informados O sistema valida os dados fornecidos. Decisão: Dados Corretos? Não → o sistema retorna mensagem de dados incorretos e o cliente deve corrigir as informações. Sim → Próxima Etapa (Associar Barbeiras).

04 - Associar Barbeiros. Decisão: Usuário Existe? Não → Associar Usuário / Sim → Próxima Etapa (Registrar Novo Serviço).

05 - Registrar Novo Serviço

06 - Retornar Confirmação De Cadastro


<img width="1591" height="592" alt="image" src="https://github.com/user-attachments/assets/38056e8a-b3a4-4f99-aa9e-514fb11a503e" />


#### Detalhamento das atividades
**01 - Iniciar Login na Plataforma**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| E-mail | Campo  |   Obrigatório             |        -           |
| Senha | Campo  |   Obrigatório             |        -           |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Iniciar | Faz o login após digitar usuário e senha  | default |
| Cancelar      |             Redireciona para a tela de cadastro                   |        default          |


**02 - Criar Barbearia**


| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---               | ---            |
| Nome da Barbearia            | Caixa De Texto   | Obrigatório       |      _    |
| Endereço | Caixa de Texto  |  Obrigatório            |         _          |
| Telefone            | Número             | Obrigatório; De 9 a 11 dígitos          |      _       |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Salvar | Avança para associar os barbeiros  | default |
| Cancelar      |             Redireciona para o menu inicial                 |        default          |


**03 - Associar Barbeiros**


| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---               | ---            |
| Nome do Barbeiro          | Caixa De Texto   | Obrigatório       |      _    |
| botãoAdicionarBarbeiro | Botão  |  Obrigatório            |         _          |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Adicionar | Avança para retornar usuário existente ou registrar novo serviço  | default |
| Voltar      |             Retorna para criar barbearia                 |        default          |


**04 - Registrar novo serviço**


| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---               | ---            |
| Nome do Serviço         | Caixa De Texto   | Obrigatório       |      _    |
| Descrição | Caixa De Texto   |  Obrigatório            |         _          |
| Valor | Número Decimal  |  Obrigatório            |         _          |
| botãoSalvar | Botão   |  Obrigatório            |         _          |
| Cancelar | Botão   |  Obrigatório            |         _          |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Salvar | Gera confirmação de cadastro  | default |
| Voltar      |             Retorna à tela anterior                |        default          |
