let
    Fonte = #table(type table [produto_id = Int64.Type, produto = type text, categoria = type text, preco_centavos = Int64.Type], {
        {1, "Mouse", "Acessorios", 8000},
        {2, "Teclado", "Acessorios", 15000},
        {3, "Monitor", "Monitores", 90000},
        {4, "Webcam", "Acessorios", 20000}
    })
in
    Fonte
