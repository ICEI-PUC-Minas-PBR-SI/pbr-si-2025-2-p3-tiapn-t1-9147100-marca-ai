### 3.3.3 Processo 3 – Agendamento de Tarefas

**Agendamento de Serviços na Barbearia**

**Etapas do Processo**
01. Início
O cliente inicia o processo.

02. Fazer Login
O cliente acessa o sistema com suas credenciais.

03. Escolher Atividade
O cliente seleciona a atividade que deseja realizar.

04. Decisão: Agendar Horário?
Se Sim → procurar barbearia.
Se Não → verificar se deseja cancelar ou reagendar:
Cancelamento → Cancelar horário → Término.
Reagendamento → Selecionar horário já marcado → voltar para Escolher Horário Disponível.

6. Procurar Barbearia
O cliente busca a barbearia onde deseja ser atendido.

7. Escolher Horário Disponível
O cliente seleciona um horário livre.

8. Escolher Serviço Desejado
O cliente escolhe o serviço que deseja realizar (exemplo: corte de cabelo, barba, combo etc.).

9. Término
O processo se encerra.

<img width="1440" height="331" alt="image" src="https://github.com/user-attachments/assets/91a44464-f673-4299-a5e5-7d27d6078a02" />



#### Detalhamento das atividades

**Fazer Login**


| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---               | ---            |
| Usuário | Caixa de Texto  |  Obrigatório;               |         _          |
| Senha             | Caixa De Texto             | Obrigatório; Mínimo 8 caractéres            |      _       |


| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Login               | Escolher Atividade              | default           |
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




