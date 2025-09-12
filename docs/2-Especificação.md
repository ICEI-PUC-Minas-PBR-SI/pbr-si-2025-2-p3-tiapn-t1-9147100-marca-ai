# Especificações do Projeto

A seguir, serão apresentadas as especificações do projeto, contemplando a definição das personas, a descrição das histórias de usuários, os requisitos funcionais e não funcionais, além das restrições que orientam o desenvolvimento da solução.

## Personas

Carlos tem 40 anos, atua como barbeiro há 20 anos e é dono da barbearia Marca ai há 10 anos. Gosta de processos práticos e rápidos. Com o aumento do número de clientes ao longo dos anos, está buscando uma forma de agilizar a marcação de horários dos seus clientes sem ser por telefone ou whatsapp, visto que, estas formas ocupam muito do seu tempo e não é nada prático. 

André tem 21 anos, tem apenas 1 ano de experiência como barbeiro, é adaptado ao uso de tecnologia, visto que, desde criança teve contato com computadores, videogames e celulares. Se popôs a auxiliar Carlos a usar essas novas tecnologias, seu objetivo principal é conquistar o máximo de clientes possíveis para futuramente abrir sua própria barbearia. 

Pedro tem 35 anos, cliente fiel da barbearia Marca ai, é dono de uma empresa de tecnologia e vive uma rotina muito corrida cheia de reuniões e contratempos. Ele gosta de processos rápidos que facilitem no seu dia a dia, como por exemplo: pedir comida online e agendamentos rápidos.  

Arthur tem 17 anos e está no último ano do ensino médio, Arthur gosta de mudanças, tem o costume de experimentar coisas novas, tal qual cortar o cabelo cada mês com um barbeiro diferente. Arthur também é amante da tecnologia e é muito fan de futebol.  


## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Carlos | Aplicação que automatize a marcação de cortes          | Melhorar cada vez mais a marcação de agendamentos da sua barbearia visto que o número de clientes subiu drasticamente nos ultimos anos           |
|André       | Sistema de avaliação de barbeiro                 | Melhorar cada dia mais suas avaliações para um dia pegar os clientes que o avaliaram bem para convidá-los para sua própria barbearia |
|Pedro     | Uma barbearia que tenha agendamento rápido               | Agendar seus cortes rápidos para economizar tempo de sua rotina corrida |
|Arthur    | Uma barbearia que permita escolher o barbeiro             | Escolher o barbeiro para ter um corte diferente por mês |


## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. 

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Cadastrar clientes, barbeiros e serviços | ALTA | 
|RF-002| Possibilitar cancelamento e reagendamento de serviços | ALTA |
|RF-003| Permitir que o cliente realize agendamento | ALTA | 
|RF-004| Permitir gerenciamento da agenda pelo barbeiro | ALTA | 
|RF-005| Permitir que o administrador configure preços e horários | MÉDIA | 
|RF-006| Enviar notificações automáticas (confirmação, lembrete, promoções) | MÉDIA | 
|RF-007| Permitir interação entre cliente e profissional | MÉDIA | 
|RF-008| Registrar histórico de serviços do cliente | BAIXA | 

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo, com adaptação automática da interface | ALTA | 
|RNF-002| A aplicação deve garantir segurança dos dados (LGPD) | ALTA | 
|RNF-003| O sistema deve ter interface intuitiva | ALTA | 
|RNF-004| O cadastro de dados deve validar campos obrigatórios antes de salvar | MÉDIA | 
|RNF-005| O tempo de resposta para ações do usuário deve ser em no máximo 3s | BAIXA | 

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O sistema será compatível apenas com navegadores modernos e dispositivos móveis comuns |
|02| A segurança será básica, sem criptografia avançada ou autenticação complexa        |
|03| O escopo será limitado às funcionalidades essenciais: agendamento, cadastro, gerenciamento de agenda, envio de notificações e registro de histórico de serviços        |
|04| O tempo de resposta poderá variar devido à ausência de backend        |
|05| O sistema terá interface funcional e simples, sem elementos decorativos avançados, devido ao prazo de entrega        |
|06| Não será possível cadastrar um número exorbitante de usuários ou implementar gerenciamento profissional de usuários, pois o projeto é acadêmico        |
|07| A aplicação não será publicada online; funcionará apenas em ambiente local para testes        |
