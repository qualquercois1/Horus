# Estados Visuais Dos Componentes

Guia curto para manter telas novas consistentes com a base atual.

| Componente | Estado | Sinal visual | Uso |
| --- | --- | --- | --- |
| `Button` | Padrao | Fundo verde, texto claro | Acao principal da tela |
| `Button` | Secundario | Borda discreta, fundo claro | Navegacao ou acao auxiliar |
| `Button` | Perigo | Fundo vermelho | Apostas e acoes de risco |
| `Button` | Desabilitado | Opacidade reduzida | Loading, pagina sem proximo item ou formulario incompleto |
| `Notice` | Erro | Texto e borda de alerta | Falha de API, validacao ou sessao |
| `Notice` | Aviso | Tom intermediario | Estado autenticado ausente ou acao pendente |
| `Stat` | Carregando | Valor textual "Carregando..." | Saldo e metricas antes da resposta da API |
| `ListPanel` | Vazio | Mensagem curta no corpo | Sem transacoes, rodadas ou resultados |
| `ListItem` | Positivo | Valor em verde | Creditos e premios |
| `ListItem` | Negativo | Valor em vermelho | Apostas debitadas |
| `ProtectedRoute` | Sem sessao | Redireciona para `/login` | Dashboard, roleta e extrato |

Padrao rapido para novas telas:

1. Use `Page` para largura e respiro.
2. Abra com `SectionHeader`.
3. Mostre falhas com `Notice`.
4. Use `Panel`, `Stat`, `ListPanel` e `ListItem` antes de criar blocos novos.
5. Para dados remotos, cubra pelo menos carregando, vazio, erro e sucesso.
