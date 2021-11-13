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
