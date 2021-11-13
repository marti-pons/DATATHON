import pandas as pd

lloguers = []
for i in range(2014, 2022):
    file = str(i)+"_lloguer_preu_trim.csv"
    ll = pd.read_csv(file)
    ll = ll.loc[(ll["Lloguer_mitja"]=="Lloguer mitjà mensual (Euros/mes)")]
    lloguers.append(ll)

LLOGUER = pd.concat(lloguers)
del LLOGUER["Lloguer_mitja"]

rendes = []
for i in range(2015, 2019):
    file = str(i)+"_renda_disponible_llars.csv"
    r = pd.read_csv(file)
    rendes.append(r)

RENDA = pd.concat(rendes)

RENDA["Import_€_Mes"] = RENDA["Import_€_Any"]/12
del RENDA["Import_€_Any"]


LLOGUER_RENDA = LLOGUER.merge(RENDA,on=["Any", "Codi_Districte", "Nom_Districte", "Codi_Barri", "Nom_Barri"])

LLOGUER_RENDA["Any - Trimestre"] = LLOGUER_RENDA["Any"].astype(str) + "-T" + LLOGUER_RENDA["Trimestre"].astype(str)
LLOGUER_RENDA["Lloguer/Renda"] = LLOGUER_RENDA["Preu"] / LLOGUER_RENDA["Import_€_Mes"]
del LLOGUER_RENDA["Any"]
del LLOGUER_RENDA["Trimestre"]
del LLOGUER_RENDA["Codi_Districte"]
del LLOGUER_RENDA["Nom_Districte"]
del LLOGUER_RENDA["Codi_Barri"]
del LLOGUER_RENDA["Preu"]
del LLOGUER_RENDA["Import_€_Mes"]

print(LLOGUER_RENDA["Lloguer/Renda"].mean())
