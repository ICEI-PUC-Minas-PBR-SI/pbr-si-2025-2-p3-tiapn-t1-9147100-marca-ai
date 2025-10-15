### 3.3.2 Processo 2 – REGISTRO DE PROFISSIONAIS E SERVIÇOS

**Agendamento de Serviços na Barbearia**

**Etapas do Processo**

01 - Realizar Login Na Plataforma. Decisão: Barbearia Existe? Não → Próxima Etapa (Cadastrar Barbearia) / 
Sim → Condicional Criar Serviço? Não → Próxima Etapa (Associar barbeiros) / Sim → Próxima Etapa (Registrar Novo Serviço). 

02 - Realizar Cadastro Da Barbearia 

03 - Associar Barbeiros. Decisão: Usuário Existe? Não → Associar Usuário / Sim → Próxima Etapa (Registrar Novo Serviço).

04 - Registrar Novo Serviço

05 - Retornar Confirmação De Cadastro

06 - Término


<img width="1348" height="768" alt="image" src="https://github.com/user-attachments/assets/80910059-be9d-4e9f-afe9-62530601d515" />



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
| botãoSalvar | Botão   |  Opcional            |         _          |
| Cancelar | Botão   |  Opcional            |         _          |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Salvar | Gera confirmação de cadastro  | default |
| Voltar      |             Retorna à tela anterior                |        default          |


**05 - Retornar usuário existente**


| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---               | ---            |
| Mensagem de erro        | Texto   | Exibido automaticamente       |     “Usuário não encontrado. Verifique seus dados.”   |
| botãoCadastrar | Botão   |  Opcional          |         _          |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Cadastrar | Redireciona à associar barbeiros | default |


**06 - Retornar confirmação de cadastro**


| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---               | ---            |
| Mensagem de confirmação       | Texto   | Exibido automaticamente       |     “Cadastro realizado com sucesso!”   |
| botãoConcluir | Botão   |  Obrigatório          |         _          |
| botãoVoltarLogin | Botão   |  Opicional          |         _          |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Concluir | Finaliza o processo | default |
| Voltar Login | Volta para a tela de login | default |

### Wireframe

![Wireframe]