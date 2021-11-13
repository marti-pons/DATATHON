import pandas as pd

lloguers = []
for i in range(2014, 2022):
    file = str(i)+"_lloguer_preu_trim.csv"
    ll = pd.read_csv(file)
    ll = ll.loc[(ll["Lloguer_mitja"]=="Lloguer mitjà mensual (Euros/mes)")]
    lloguers.append(ll)

lloguer = pd.concat(lloguers)
