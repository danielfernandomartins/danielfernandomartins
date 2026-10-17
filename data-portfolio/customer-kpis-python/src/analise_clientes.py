from pathlib import Path
import pandas as pd

BASE_DIR = Path(__file__).resolve().parents[1]
INPUT = BASE_DIR / "data" / "clientes.csv"
OUTPUT_DIR = BASE_DIR / "output"
OUTPUT = OUTPUT_DIR / "kpis_clientes.csv"


def carregar_dados() -> pd.DataFrame:
    return pd.read_csv(INPUT)


def classificar_risco(df: pd.DataFrame) -> pd.DataFrame:
    dados = df.copy()
    dados["risco_churn"] = "OK"
    mascara = (dados["dias_sem_interacao"] >= 30) | (dados["ocorrencias_suporte"] >= 2)
    dados.loc[mascara, "risco_churn"] = "RISCO"
    return dados


def gerar_kpis(df: pd.DataFrame) -> None:
    ativos = df[df["status"] == "Ativo"]
    print(f"Clientes ativos: {len(ativos)}")
    print(f"Receita mensal total: R$ {ativos['receita_mensal'].sum():,.2f}")
    print(f"Ticket médio mensal: R$ {ativos['receita_mensal'].mean():,.2f}")
    print(f"Clientes em risco: {(ativos['risco_churn'] == 'RISCO').sum()}")
    print("\nReceita por segmento:")
    print(ativos.groupby("segmento")["receita_mensal"].sum().sort_values(ascending=False))


def exportar(df: pd.DataFrame) -> None:
    OUTPUT_DIR.mkdir(exist_ok=True)
    colunas = [
        "cliente_id",
        "nome",
        "segmento",
        "status",
        "receita_mensal",
        "dias_sem_interacao",
        "ocorrencias_suporte",
        "risco_churn",
    ]
    df[colunas].to_csv(OUTPUT, index=False)
    print(f"\nArquivo gerado: {OUTPUT}")


if __name__ == "__main__":
    clientes = carregar_dados()
    clientes = classificar_risco(clientes)
    gerar_kpis(clientes)
    exportar(clientes)
