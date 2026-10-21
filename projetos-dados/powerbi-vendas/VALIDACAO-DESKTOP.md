# Conferência no Power BI Desktop

**Estado: pendente.** Este documento descreve a execução a fazer no Windows. Nenhum item abaixo é uma execução já comprovada.

## Preparação

Baixe ou clone o repositório inteiro. Abra `Vendas.pbip` com uma versão atual do Power BI Desktop compatível com PBIP/PBIR. Se necessário, habilite os recursos correspondentes nas opções e reinicie. Preserve as pastas `Vendas.Report` e `Vendas.SemanticModel` lado a lado.

## Conferência da carga e dos visuais

1. Clique em **Atualizar**. Não deve haver pedido de caminho de CSV ou credenciais: as tabelas usam dados M embutidos.
2. No modelo, confira Clientes (7 linhas), Produtos (4), Vendas (48) e Calendario (181).
3. Confira as três relações 1:N, com a dimensão no lado 1 e filtro para Vendas.
4. Sem filtros, compare os resultados abaixo.

| Indicador | Resultado esperado calculado em SQL |
|---|---:|
| Receita Liquida | R$ 25.292,00 |
| Vendas Concluidas | 42 |
| Ticket Medio | R$ 602,19 |
| Unidades Vendidas | 84 |
| Taxa Cancelamento | 12,5% |

As duas últimas medidas existem no modelo, mas não têm cartões na página inicial. Para conferi-las, crie cartões temporários e arraste as medidas para eles.

5. Selecione **2026-01** no segmentador: receita R$ 4.904,00; sete vendas concluídas; ticket R$ 700,57.
6. Selecione **2026-06**: receita R$ 3.957,00; sete vendas concluídas; ticket R$ 565,29.
7. Limpe o filtro. Confira Monitores em R$ 17.370,00 e Acessórios em R$ 7.922,00.
8. Confira que os sete visuais aparecem sem erros, com valores legíveis, e que a seleção de mês afeta os cartões e a tabela.
9. Salve, feche e reabra para conferir a persistência do relatório.

## Registro da evidência

Após executar, registre a versão do Desktop, data, resultados e eventuais divergências em um commit. Acrescente uma captura real, sem dados pessoais, se desejar documentar a aparência. A prévia SVG existente é ilustrativa e não deve ser identificada como captura do Power BI.

Se houver erro, preserve a mensagem completa e o nome do arquivo/campo. Não marque a validação como concluída com base apenas no script Python: ele não executa DAX nem renderiza o relatório.
