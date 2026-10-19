# Coleta básica de informações para troubleshooting N1
# Script de leitura: não altera configurações do sistema.

Write-Host "=== IDENTIFICACAO ==="
Get-ComputerInfo | Select-Object CsName, WindowsProductName, WindowsVersion, OsArchitecture

Write-Host "`n=== REDE ==="
Get-NetIPConfiguration | Select-Object InterfaceAlias, IPv4Address, IPv4DefaultGateway, DNSServer

Write-Host "`n=== DISCO ==="
Get-PSDrive -PSProvider FileSystem | Select-Object Name, Used, Free

Write-Host "`n=== MEMORIA E PROCESSOS ==="
Get-Process | Sort-Object CPU -Descending | Select-Object -First 10 ProcessName, CPU, WorkingSet

Write-Host "`n=== TESTE DE CONECTIVIDADE ==="
Test-NetConnection -ComputerName 8.8.8.8 -InformationLevel Detailed

Write-Host "`nColeta concluida. Analise os resultados antes de qualquer alteracao."
