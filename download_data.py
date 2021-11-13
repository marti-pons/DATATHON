import pandas as pd
import numpy as np

# and remove other columns

df = pd.read_excel('../dataset_renta.xlsx', header = 8, 
                   usecols = [0,4,5,6,7])

# We replace the names of the variables from the dataset

df.columns = ['Barri', 'T1', 'T2', 'T3', 'T4']

# dropna() removes all the rows with nan values
df = df.dropna()

# You can remove rows, in this case the first one
df = df.drop(index = 0)


# Some of the datasets can have blank spaces in the string values, with a simple map a lambda function and the
# function lstrip  (left-strip) you can get rido of certain characters
df.Barri.map(lambda x : x.lstrip('     '))

# Again, it can be that some string have other no desirable characters, you can first replace them to blank spaces
# and then remove all of them from certain columns
df[['Districte', 'Barri']] = [i.replace('\xa0', ' ').split(' ', 1) for i in df.Barri]
[i.lstrip(' ').rstrip(' ') for i in df.Barri]
