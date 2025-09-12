### 3.3.1 Processo 1 – Agendamento de Tarefas

**Agendamento de Serviços na Barbearia**

Esse processo concentra, em um único sistema, as opções de agendamento, reagendamento e cancelamento de atendimentos em tempo real. Dessa forma, oferece maior comodidade aos clientes e garante à barbearia e seus profissionais um controle mais eficiente da agenda. Além disso, possibilita uma melhor distribuição das atividades e horários, reduzindo falhas manuais e evitando conflitos na marcação de serviços.

<img width="1678" height="383" alt="image" src="https://github.com/user-attachments/assets/998b5668-345e-4e01-8f26-557f116421d8" />


#### Detalhamento das atividades

**Realizar Cadastro**


| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---               | ---            |
| Nome            | Caixa De Texto   | Obrigatório; Somente Letras        |      _    |
| E-Mail | Caixa de Texto  |  Obrigatório; Formato de e-mail              |         _          |
| Celular             | Número              | Obrigatório; De 9 a 11 Dígitos            |      _       |
| Usuário | Caixa de Texto  |  Obrigatório;               |         _          |
| Senha             | Caixa De Texto             | Obrigatório; Mínimo 8 caractéres            |      _       |


| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| cadastrar               | Escolher Atividade              | default           |
| cancelar            | Término  | cancel               |





**Escolher Atividades**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Tipo De Atividade | Seleção Única  | Obrigátorio; Opções Agendar, Reagendar e Cancelar               |  Agendar                 |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Continuar                  | Decisão "Agendar Horário                            | default               |





**Procurar Barbearia**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Localização | Caixa De Texto  | Obrigátorio; |  -                 |
| Distância                | Número                 | Valor em Km               |  5Km                 |
| Nome Da Barbearia               | Caixa De Texto                | Opcional               |     -             |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Buscar                | Escolher Horário Disponível                            | default               |
| Cancelar            | Término  | cancel               |





**Escolher Horário Disponível**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Data | Data  | Obrigátorio; Não pode ser passado |  Data Atual                 |
| Horário                | Hora                 | Dentro dos horários livres na agenda               |  -                |          

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Confirmar Horário                | Escolher Serviço Desejado                            | default               |
| Voltar            | Procurar Barbearia  | cancel               |





**Escolher Serviço Desejado**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Serviço | Seleção Única  | Obrigátorio; |  -                 |
| Observações                | Área de Texto                 | Opcional              |  -                 |


| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Confirmar                | Término                            | default               |
| Voltar           | Escolher Horário Disponível  | cancel               |




**Cancelar Horário**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Motivo | Área De Texto  | Obrigátorio; |  -                 |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Confirmar Cancelamento               | Término                           | default               |
| Voltar            | Escolher Atividade  | cancel               |





**Selecionar Horário Marcado (Reagendamento)**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Motivo | Área De Texto  | Obrigátorio; |  -                 |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Confirmar               | Escolher Horário Disponível                           | default               |
| Voltar            | Escolher Atividade  | cancel               |




