let
    Fonte = #table(type table [cliente_id = Int64.Type, cliente = type text, uf = type text], {
        {1, "Cliente A", "SP"},
        {2, "Cliente B", "RJ"},
        {3, "Cliente C", "MG"},
        {4, "Cliente D", "SP"},
        {5, "Cliente E", "PR"},
        {6, "Cliente F", "BA"},
        {7, "Cliente G", "RS"}
    })
in
    Fonte
