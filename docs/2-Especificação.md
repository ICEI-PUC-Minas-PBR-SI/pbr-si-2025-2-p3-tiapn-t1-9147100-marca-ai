# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="01-Documentação de Contexto.md"> Documentação de Contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto

## Personas

Carlos tem 40 anos, atua como barbeiro há 20 anos e é dono da barbearia Marca ai há 10 anos. Gosta de processos práticos e rápidos. Com o aumento do número de clientes ao longo dos anos, está buscando uma forma de agilizar a marcação de horários dos seus clientes sem ser por telefone ou whatsapp, visto que, estas formas ocupam muito do seu tempo e não é nada prático. 

André tem 21 anos, tem apenas 1 ano de experiência como barbeiro, é adaptado ao uso de tecnologia, visto que, desde criança teve contato com computadores, videogames e celulares. Se popôs a auxiliar Carlos a usar essas novas tecnologias, seu objetivo principal é conquistar o máximo de clientes possíveis para futuramente abrir sua própria barbearia. 

Pedro tem 35 anos, cliente fiel da barbearia Marca ai, é dono de uma empresa de tecnologia e vive uma rotina muito corrida cheia de reuniões e contratempos. Ele gosta de processos rápidos que facilitem no seu dia a dia, como por exemplo: pedir comida online e agendamentos rápidos.  

Arthur tem 17 anos e está no último ano do ensino médio, Arthur gosta de mudanças, tem o costume de experimentar coisas novas, tal qual cortar o cabelo cada mês com um barbeiro diferente. Arthur também é amante da tecnologia e é muito fan de futebol.  

Enumere e detalhe as personas da sua solução. Para tanto, baseie-se tanto nos documentos disponibilizados na disciplina e/ou nos seguintes links:

> **Links Úteis**:
> - [Rock Content](https://rockcontent.com/blog/personas/)
> - [Hotmart](https://blog.hotmart.com/pt-br/como-criar-persona-negocio/)
> - [O que é persona?](https://resultadosdigitais.com.br/blog/persona-o-que-e/)
> - [Persona x Público-alvo](https://flammo.com.br/blog/persona-e-publico-alvo-qual-a-diferenca/)
> - [Mapa de Empatia](https://resultadosdigitais.com.br/blog/mapa-da-empatia/)
> - [Mapa de Stalkeholders](https://www.racecomunicacao.com.br/blog/como-fazer-o-mapeamento-de-stakeholders/)
>
Lembre-se que você deve ser enumerar e descrever precisamente e personalizada todos os clientes ideais que sua solução almeja.

## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Usuário do sistema  | Registrar minhas tarefas           | Não esquecer de fazê-las               |
|Administrador       | Alterar permissões                 | Permitir que possam administrar contas |

Apresente aqui as histórias de usuário que são relevantes para o projeto de sua solução. As Histórias de Usuário consistem em uma ferramenta poderosa para a compreensão e elicitação dos requisitos funcionais e não funcionais da sua aplicação. Se possível, agrupe as histórias de usuário por contexto, para facilitar consultas recorrentes à essa parte do documento.

> **Links Úteis**:
> - [Histórias de usuários com exemplos e template](https://www.atlassian.com/br/agile/project-management/user-stories)
> - [Como escrever boas histórias de usuário (User Stories)](https://medium.com/vertice/como-escrever-boas-users-stories-hist%C3%B3rias-de-usu%C3%A1rios-b29c75043fac)
> - [User Stories: requisitos que humanos entendem](https://www.luiztools.com.br/post/user-stories-descricao-de-requisitos-que-humanos-entendem/)
> - [Histórias de Usuários: mais exemplos](https://www.reqview.com/doc/user-stories-example.html)
> - [9 Common User Story Mistakes](https://airfocus.com/blog/user-story-mistakes/)



## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. 

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Permitir que o cliente realize agendamento | ALTA | 
|RF-002| Possibilitar cancelamento e reagendamento de serviços | ALTA |
|RF-003| Cadastrar clientes, barbeiros e serviços | ALTA | 
|RF-004| Permitir gerenciamento da agenda pelo barbeiro | ALTA | 
|RF-005| Permitir que o administrador configure preços e horários | MÉDIA | 
|RF-006| Enviar notificações automáticas (confirmação, lembrete, promoções) | MÉDIA | 
|RF-007| Registrar histórico de serviços do cliente | BAIXA | 

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo, com adaptação automática da interface | ALTA | 
|RNF-002| A aplicação deve garantir segurança dos dados | ALTA | 
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

Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)
