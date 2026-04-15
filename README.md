# Horus

Horus e um estudo full-stack de arquitetura, autenticacao, carteira, transacoes e jogos com dinheiro ficticio. A ideia atual nao e criar um cassino real, mas construir uma base tecnica onde cada decisao importante fique visivel: como o saldo muda, como a rodada e registrada, qual e a matematica do jogo e onde entram as proximas camadas de seguranca.

O projeto nasceu local-first, mas o banco atual usa PostgreSQL via Prisma e pode rodar com Neon em desenvolvimento.

---

## Stack

- Frontend: React, Vite, Tailwind CSS e React Router.
- Backend: Node.js, Express, JWT e bcrypt.
- Banco: PostgreSQL com Prisma, usando Neon quando `DATABASE_URL` aponta para a nuvem.
- Dominio atual: usuarios, carteiras, transacoes e roleta.

---

## Direcao de Design

O visual de Horus parte da identidade da logo lunar, cinzas suaves, contraste baixo, paginas centralizadas e formularios pequenos. A ideia e manter uma interface calma, mas sem apagar a personalidade do projeto.

Principios:

- Simples antes de chamativo.
- Cinzas como base visual, verde para acao positiva, vermelho para risco.
- Cabecalhos com borda inferior, titulo leve e descricao curta.
- Formularios compactos, com poucos campos por linha.
- Header e footer preservam a identidade do produto.
- Cada pagina deve nascer de componentes compartilhados antes de receber estilos proprios.

### Componentes Base

Antes de criar uma tela nova, procurar estes componentes:

- `Page`: largura, padding e ritmo vertical da pagina.
- `SectionHeader`: titulo, texto curto e acao principal.
- `Panel`: area funcional com borda discreta.
- `Stat`: metricas curtas, como saldo.
- `ListPanel` e `ListItem`: listas de historico, transacoes e eventos.
- `Button`: botoes e links com variantes consistentes.
- `TextField`: campos de formulario.
- `Notice`: mensagens de erro, aviso ou informacao.
- `BrandMark`: logo e nome do produto.
- `AuthShell`: layout padrao para login e cadastro.
- `Header` e `Footer`: identidade global, navegacao e rodape.

Regra pratica para novas paginas:

1. Comecar com `Page`.
2. Adicionar `SectionHeader`.
3. Usar `Panel`, `Stat`, `ListPanel`, `Button`, `TextField` e `Notice` antes de criar estilo novo.
4. Criar componente novo apenas quando existir repeticao real ou um comportamento especifico.
5. Se um componente novo nascer, deixar o nome e a API simples para ser reutilizado.

Arquivos auxiliares:

- `frontend/src/config/api.js`: URL base da API. Usa `VITE_API_URL` quando existir e cai para `http://localhost:3001/api`.
- `frontend/src/utils/auth.js`: sessao local.
- `frontend/src/utils/formatters.js`: formatacao de dinheiro.
- `frontend/src/components/ProtectedRoute.jsx`: protecao das rotas autenticadas.
- `frontend/docs/component-states.md`: guia curto de estados visuais dos componentes.

---

## Como Rodar

### 1. Instalar dependencias

Na raiz do projeto:

```bash
npm run install:all
```

### 2. Configurar banco

Crie `backend/.env` com:

```bash
DATABASE_URL="postgresql://usuario:senha@host/neondb?sslmode=require"
```

Depois aplique as migracoes:

```bash
cd backend
npx prisma migrate dev
```

Se estiver usando Neon, use a connection string do projeto. A URL pooled tambem funciona para o fluxo atual.

### 3. Rodar testes

Na raiz do projeto:

```bash
npm test
```

### 4. Iniciar frontend e backend

Na raiz do projeto:

```bash
npm run dev
```

Servicos esperados:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3001`

Se a porta `5173` ja estiver ocupada, o Vite escolhe a proxima porta livre e mostra a URL no terminal.

---

## Rotas da Aplicacao

- `/` - landing page.
- `/login` - entrada com e-mail e senha.
- `/register` - criacao de conta.
- `/dashboard` - resumo da carteira local e acesso aos jogos.
- `/transactions` - extrato paginado da carteira.
- `/games/roulette` - primeira mesa jogavel.
- `/about`, `/privacy`, `/terms` - paginas reservadas.

---

## API Atual

### Autenticacao

- `POST /api/register`
  - Cria usuario.
  - Cria carteira local automaticamente.
  - Registra uma transacao inicial de credito ficticio.

- `POST /api/login`
  - Valida credenciais.
  - Retorna JWT e dados publicos do usuario.
  - Garante que o usuario tenha uma carteira.

### Carteira

- `GET /api/me/wallet`
  - Requer `Authorization: Bearer <token>`.
  - Retorna carteira, ultimas transacoes e rodadas recentes.

### Transacoes

- `GET /api/me/transactions?page=1&pageSize=10`
  - Requer `Authorization: Bearer <token>`.
  - Retorna transacoes paginadas e metadados de paginacao.

### Jogos

- `POST /api/games/roulette/play`
  - Requer `Authorization: Bearer <token>`.
  - Recebe tipo de aposta, valor da aposta e valor em centavos.
  - Debita a aposta, sorteia o resultado, registra a rodada e credita premio se houver.

---

## Modelo de Carteira

O saldo e guardado em centavos (`balanceCents`) para evitar erro de ponto flutuante. Isso e importante mesmo em um prototipo, porque `0.1 + 0.2` em JavaScript nao e exatamente `0.3`.

Cada mudanca de saldo gera uma transacao:

- `CREDIT` - entrada inicial ou credito futuro.
- `BET` - debito de aposta.
- `WIN` - premio de uma rodada vencedora.

Campos importantes da transacao:

- `amountCents`: valor assinado. Aposta entra negativo, premio entra positivo.
- `balanceBeforeCents`: saldo antes da operacao.
- `balanceAfterCents`: saldo depois da operacao.
- `referenceType` e `referenceId`: ligam a transacao a uma origem, como uma rodada.

Essa abordagem transforma a carteira em um ledger simples. O saldo atual fica na tabela `Wallet`, mas a historia de como ele chegou ali fica em `Transaction`.

---

## Primeiro Jogo: Roleta

A primeira versao da roleta usa uma roda europeia simplificada:

- 37 casas: numeros de `0` a `36`.
- `0` e verde.
- 18 numeros vermelhos.
- 18 numeros pretos.
- O sorteio usa `randomInt(37)` no backend.

O backend e a fonte da verdade. O frontend apenas escolhe a aposta e mostra o resultado retornado pela API.

### Tipos de Aposta

| Tipo | Valores aceitos | Vence quando |
| --- | --- | --- |
| Cor | `red`, `black` | O resultado tem a cor escolhida |
| Numero | `0` a `36` | O numero sorteado e exatamente o escolhido |
| Paridade | `even`, `odd` | O numero sorteado e par ou impar |
| Faixa | `low`, `high` | `low` vence de 1 a 18, `high` vence de 19 a 36 |

Na roleta, o `0` perde para cor, paridade e faixa. Ele so vence quando a aposta direta e no numero `0`.

### Pagamentos

O pagamento atual e bruto, ou seja, inclui a devolucao da aposta junto com o premio. Exemplo: uma aposta de R$ 10 em vermelho debita R$ 10 antes da rodada. Se vencer, a carteira recebe R$ 20. O lucro liquido e R$ 10.

| Aposta | Chance de vencer | Pagamento bruto | Lucro liquido em vitoria | Valor esperado por R$ 1 |
| --- | ---: | ---: | ---: | ---: |
| Cor | 18/37 | 2x | +1x | -1/37, cerca de -2,70% |
| Paridade | 18/37 | 2x | +1x | -1/37, cerca de -2,70% |
| Faixa | 18/37 | 2x | +1x | -1/37, cerca de -2,70% |
| Numero direto | 1/37 | 36x | +35x | -1/37, cerca de -2,70% |

### Matematica do Valor Esperado

Para uma aposta de R$ 1 em vermelho:

```text
EV = chance_de_vencer * lucro_vencendo + chance_de_perder * perda
EV = (18/37 * 1) + (19/37 * -1)
EV = -1/37
EV = -0,0270...
```

Ou seja, no longo prazo, a mesa tem vantagem media de aproximadamente 2,70%. Isso acontece por causa do `0`.

Para numero direto:

```text
EV = (1/37 * 35) + (36/37 * -1)
EV = -1/37
```

Mesmo com pagamento maior, a chance de acerto e menor, entao a vantagem da mesa continua igual nesta versao.

### Decisoes de Implementacao

- A aposta e debitada antes do sorteio.
- A rodada e salva mesmo quando o usuario perde.
- Se vencer, uma transacao `WIN` separada e criada.
- O debito usa uma condicao de saldo suficiente dentro de transacao Prisma, reduzindo risco de saldo negativo em apostas simultaneas.
- Limite local atual: aposta minima de R$ 1,00 e maxima de R$ 1.000,00.

---

## Roadmap

### Feito

- [x] Configuracao inicial do monorepo.
- [x] Frontend React com rotas principais.
- [x] Backend Express com autenticacao por JWT.
- [x] Registro e login com senha criptografada.
- [x] Banco PostgreSQL com Prisma e migracoes para Neon.
- [x] Modelagem de usuario, carteira, transacoes e rodadas.
- [x] Carteira local criada automaticamente no registro.
- [x] Ledger basico com saldo antes e depois de cada operacao.
- [x] Primeiro jogo base: roleta.
- [x] Tela de roleta com saldo, apostas, resultado, transacoes e historico.
- [x] Design system inicial com componentes reutilizaveis.
- [x] Configuracao central da URL da API no frontend.
- [x] Backend separado em rotas, controllers e services.
- [x] Middleware de validacao de entrada.
- [x] Tratamento centralizado de erros no backend.
- [x] Testes automatizados para carteira, roleta e paginacao de transacoes.
- [x] Endpoint de transacoes paginadas.
- [x] Tela dedicada de extrato.
- [x] Logout e protecao de rotas autenticadas no frontend.
- [x] Documentacao visual curta para estados de componente.

### Proximos Passos Curtos

- [x] Separar `app.js` em rotas, controllers e services.
- [x] Criar middleware de validacao de entrada.
- [x] Criar testes automatizados para carteira e roleta.
- [x] Adicionar endpoint para listar transacoes paginadas.
- [x] Adicionar tela dedicada de extrato.
- [x] Melhorar logout e protecao de rotas no frontend.
- [x] Criar documentacao visual curta para estados de componente.

### Core De Carteira

- [ ] Definir enum ou tabela controlada para tipos de transacao.
- [ ] Adicionar operacoes manuais de deposito e saque ficticios.
- [ ] Criar conciliacao simples: saldo da carteira versus soma do ledger.
- [ ] Adicionar idempotencia em operacoes criticas.
- [ ] Registrar metadados de origem, dispositivo ou IP quando fizer sentido.

### Jogos

- [ ] Refinar UI da roleta e animacao do giro.
- [ ] Adicionar explicacao de regras dentro da tela do jogo.
- [ ] Criar tabela de pagamentos configuravel por jogo.
- [ ] Adicionar seeds/testes estatisticos para validar distribuicao.
- [ ] Preparar um segundo jogo simples usando o mesmo contrato de carteira.

### Seguranca e Producao

- [ ] Trocar `JWT_SECRET` padrao por variavel obrigatoria em ambientes reais.
- [ ] Adicionar rate limit em login, registro e apostas.
- [ ] Validar CORS por ambiente.
- [ ] Adicionar logs estruturados.
- [x] Adicionar tratamento centralizado de erros.
- [x] Migrar para banco em nuvem quando a modelagem local estiver estavel.

---

## Observacao Importante

Todo o saldo atual e ficticio, mesmo quando salvo em banco em nuvem. Este projeto deve ser tratado como estudo de engenharia de software, nao como produto financeiro ou jogo com dinheiro real.
