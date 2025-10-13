### 3.3.4 Processo 4 – LEMBRETES

**Lembretes**

**Etapas do Processo**

01 - Recebimento de uma confirmação de agendamento. Decisão: Agendado no mesmo dia? Não → Evento Timer de 1 Dia antes do horário / Sim → Evento Timer de 1 Hora Antes do horário.

02 - O sistema envia o pedido de Confirmação 1 Dia antes. 

03 - O usuário recebe o pedido de confirmação do agendamento. Decisão: Confirmado? Não → Proxima Etapa (Cancelar Horário) / Sim → Evento Timer de 1 Hora Antes do horário.

04 - Cancelar Horário Agendado.

05 - Após Timer 1 Hora antes do agendamento, o sistema envia um lembrete do horário.

06 - Usuário recebe o lembrete de horário marcado.

07 - Término

<img width="1642" height="624" alt="image" src="https://github.com/user-attachments/assets/6ddce3ea-2b9e-458e-bd70-fb6c3c2f7ff8" />

#### Detalhamento das atividades
**01 - Receber confirmação do agendamento**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| ID do Agendamento | Texto  |   Obrigatório             |        -           |
| Data e Hora do Agendamento | Texto/Data  |   Obrigatório             |        -           |
| Status | Texto  |   Automático          |        Pendente          |
| botãoVerDetalhes | Botão  |   Opcional          |        -        |


| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| VerDetalhes | Mostra exemplo do agendamento(Ex: cabelo ou barba)  | default |

**02 - Enviar pedido de confirmação**

| **Campo**               | **Tipo** | **Restrições** | **Valor default**                               |
| ----------------------- | -------- | -------------- | ----------------------------------------------- |
| Mensagem de confirmação | Texto    | Automático            | “Você confirma o agendamento para data/hora?” |
| botãoEnviar                | Botão             | Obrigatório    | -                                               |
| botãoCancelarEnvio      | Botão    |         Opcional                            | -                                               |

| **Comandos**  | **Destino**                            | **Tipo** |
| ------------- | -------------------------------------- | -------- |
| Enviar              | Envia pedido de confirmação ao usuário     | default  |
| CancelarEnvio     | Retorna a tela de agendamentos                | default  |

**03 - Receber pedido de confirmação**

| **Campo**               | **Tipo** | **Restrições**          | **Valor default**                            |
| ----------------------- | -------- | ----------------------- | -------------------------------------------- |
| Mensagem de confirmação | Texto                |       Exibido automaticamente |       Confirma sua presença no horário agendado? |
| botãoConfirmar          | Botão    | Obrigatório                   | -                                            |
| botãoCancelar           | Botão    | Obrigatório                | -                                            |

| **Comandos** | **Destino**                                 | **Tipo** |
| ------------ | ------------------------------------------- | -------- |
| Confirmar      | Envia confirmação e ativa lembrete 1h antes       | default  |
| Cancelar         | Redireciona para cancelamento do horário                     | default  |



