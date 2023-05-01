#!/usr/bin/env python
# coding: utf-8

# In[1]:


import seaborn as sns
import os
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from wordcloud import WordCloud
from collections import Counter
from matplotlib_venn import venn3
import plotly
import plotly.express as px
sns.set_theme()


# In[51]:


numeric_dir = 'plots/numeric/'
categoric_dir = 'plots/categorical/'

dir_histogram_density = numeric_dir+'single/histogram_density/'
dir_2d_density = numeric_dir+'double/2d_density/'
dir_scatter = numeric_dir+'double/scatter/'
dir_boxplot = numeric_dir+'all/boxplot/'
dir_correlogram = numeric_dir+'all/correlogram/'
dir_heatmap = numeric_dir+'all/heatmap/'
dir_violin = numeric_dir+'all/violin/'

dir_barplot_hv = categoric_dir+'single/barplot_hv/'
dir_barplot_total = categoric_dir+'single/barplot_total/'
dir_piechart = categoric_dir+'single/piechart/'
dir_grouped_barplot = categoric_dir+'triple/grouped_barplot/'
dir_grouped_boxplot = categoric_dir+'triple/grouped_boxplot/'
dir_grouped_violin = categoric_dir+'triple/grouped_violin/'
dir_wordcloud = categoric_dir+'wordcloud/'


# In[101]:


def delete(directory):
    for file_name in os.listdir(directory):
        file_path = os.path.join(directory, file_name)
        if os.path.isfile(file_path):
            os.remove(file_path)


delete_ = [
    dir_barplot_hv, dir_barplot_total, dir_piechart, dir_grouped_barplot,
    dir_grouped_boxplot, dir_grouped_violin, dir_wordcloud,
    dir_histogram_density, dir_2d_density, dir_scatter, dir_boxplot,
    dir_correlogram, dir_heatmap, dir_violin
]

for d in delete_:
    delete(d)


# In[2]:


# 1.Numeric


# In[103]:


df = pd.read_csv(
    "data.csv")
df.head()
print(df.shape)
print("running...")

# # return df
# # In[4]:


# numeric_cols = df.select_dtypes(include=['int', 'float'])
# numeric_cols


# # In[5]:


# columns = numeric_cols.columns
# columns


# # In[6]:


# # Freedman-Diaconis rule


# # In[7]:


# # hist


# # In[49]:


# sns.distplot(numeric_cols[columns[0]], kde=True)
# plt.savefig('tmp.jpg', dpi=300)


# # In[55]:


# for i in range(0, len(numeric_cols.columns)):
#     sns.distplot(numeric_cols[columns[i]], kde=True)
#     plt.savefig(dir_histogram_density+str(i)+'.jpg', dpi=300)
#     # plt.show()


# # In[9]:


# # scatter


# # In[58]:


# k = 0
# for i in range(0, len(numeric_cols.columns)):
#     for j in range(0, len(numeric_cols.columns)):
#         if i != j:
#             sns.scatterplot(
#                 data=numeric_cols, x=numeric_cols.columns[i], y=numeric_cols.columns[j])
#             plt.savefig(dir_scatter+str(k)+'.jpg', dpi=300)
#             # plt.show()
#             k += 1


# # In[11]:


# # 2d density (area)


# # In[59]:


# k = 0
# for i in range(0, len(numeric_cols.columns)):
#     for j in range(0, len(numeric_cols.columns)):
#         if i != j:
#             sns.kdeplot(
#                 data=numeric_cols, x=numeric_cols.columns[i], y=numeric_cols.columns[j], shade=True)
#             plt.savefig(dir_2d_density+str(k)+'.jpg', dpi=300)
#             # plt.show()
#             k += 1


# # In[13]:


# # heatmap


# # In[67]:


# fig, ax = plt.subplots(figsize=(20, 15), dpi=100)
# sns.heatmap(numeric_cols, annot=True)
# plt.savefig(dir_heatmap+'heatmap.jpg', dpi=300)
# # plt.show()


# # In[15]:


# # boxplot


# # In[72]:


# fig, ax = plt.subplots(figsize=(20, 20), dpi=100)
# sns.boxplot(data=numeric_cols, orient="h")
# plt.savefig(dir_boxplot+'boxplot.jpg', dpi=100)
# # plt.show()


# # In[82]:


# fig, ax = plt.subplots(figsize=(15, 20), dpi=300)
# sns.violinplot(data=numeric_cols, orient="h")
# plt.savefig(dir_violin+'violin.jpg', dpi=300)
# # plt.show()


# # In[18]:


# # correlogram


# # In[83]:


# sns.pairplot(numeric_cols, kind="reg", diag_kind="kde")
# plt.savefig(dir_correlogram+'correlogram.jpg', dpi=300)
# # plt.show()


# # In[20]:


# # 2. Categoric


# # In[118]:


# df


# # In[111]:


# more_than_10 = [col for col in df.columns if df[col].nunique() > 10]

# # move those columns to the end of the dataframe
# df2 = df[[col for col in df.columns if col not in more_than_10] + more_than_10]

# # save the index of the first moved column
# first_moved_col = len(df2.columns) - len(more_than_10)


# # In[106]:


# first_moved_col


# # In[119]:


# new_cols = []
# for col in df.columns:
#     if (len(set(df[col])) < 10):
#         new_cols.append(col)

# categoric = df2.loc[:, new_cols]


# # In[26]:


# # pie chart (if no. of cat<7)


# # In[88]:


# for i in range(first_moved_col):
#     value_counts = categoric[categoric.columns[i]].value_counts()

#     # sort the value counts in descending order
#     sorted_values = value_counts.sort_values(ascending=False)

#     # create a list of labels in the desired order
#     labels = sorted_values.index.tolist()
#     if 'other' in labels:
#         labels.remove('other')
#         labels.append('other')

#     if len(set(categoric[categoric.columns[i]])) < 7:
#         plt.figure(figsize=(18, 18))
#         plt.pie(sorted_values.values, labels=labels, autopct='%1.1f%%',
#                 startangle=0, textprops={'fontsize': 20})
#         plt.savefig(dir_piechart+str(i)+'.jpg', dpi=300)
#         # plt.show()


# # In[30]:


# # horizontal , vertical


# # In[89]:


# # determine plot orientation based on number of unique values
# def get_orientation(col):
#     if len(categoric[col].unique()) > 4:
#         return 'h'
#     else:
#         return 'v'


# # create separate bar plots for each column
# i = 0
# for col in categoric.columns[:first_moved_col]:
#     fig, ax = plt.subplots(figsize=(10, 5))

#     orient = get_orientation(col)
#     if orient == 'v':
#         sns.countplot(data=categoric, x=col)
#     else:
#         sns.countplot(data=categoric, y=col)
#     plt.savefig(dir_barplot_hv+str(i)+'.jpg', dpi=300)
#     # plt.show()
#     i += 1


# # In[90]:


# # Loop through each column
# i = 0
# for col in categoric.columns:
#     # Check if the column contains strings
#     if categoric[col].dtype == 'object':
#         # Get the unique string values
#         unique_strings = categoric[col].unique()
#         # Check if there are more than 10 unique strings
#         if len(unique_strings) > 10:
#             # Concatenate all the string values
#             all_strings = ' '.join(str(s) for s in unique_strings)
#             # Generate the word cloud
#             wordcloud = WordCloud(
#                 width=800, height=800, background_color='white').generate(all_strings)
#             # Plot the word cloud
#             plt.figure(figsize=(8, 8), facecolor=None)
#             plt.imshow(wordcloud)
#             plt.axis('off')
#             plt.tight_layout(pad=0)

#             plt.savefig(dir_wordcloud+str(i)+'.jpg', dpi=300)

#             # plt.show()
#             i += 1


# # In[94]:


# # Create a list of columns to omit (i.e., those with more than 6 unique values)
# omit_cols = [col for col in categoric.columns if categoric[col].nunique() > 6]

# # Filter the dataframe to exclude the omitted columns
# df_filtered = categoric[[
#     col for col in categoric.columns if col not in omit_cols]]

# # Melt the dataframe to long format
# df_melted = pd.melt(df_filtered, var_name='Column')

# # Calculate the counts for each value in each column
# count_df = df_melted.groupby(
#     ['Column', 'value']).size().reset_index(name='Count')

# # Sort the counts in descending order
# sorted_df = count_df.sort_values(['Column', 'Count'], ascending=[True, False])

# # Create the grouped barplot
# sns.catplot(x='Count', y='Column', hue='value',
#             data=sorted_df, kind='bar', height=8, aspect=1.5)

# plt.savefig(dir_barplot_total+'barplot_total.jpg', dpi=300)

# # Show the plot
# # plt.show()


# # In[35]:


# # grouped barplot (hue)


# # In[96]:


# q = 0
# if len(categoric.columns) != 1+first_moved_col:
#     for i in range(first_moved_col):
#         for j in range(first_moved_col):
#             for k in range(first_moved_col, len(categoric.columns)):
#                 if i != j and categoric.columns[k] in categoric.select_dtypes(include=[np.number]).columns.tolist():
#                     try:
#                         fig, ax = plt.subplots(figsize=(5, 5), dpi=100)
#                         sns.barplot(
#                             y=categoric.columns[i],
#                             x=categoric.columns[k],
#                             hue=categoric.columns[j],
#                             data=categoric,
#                             orient='h'
#                         )
#                         plt.savefig(dir_grouped_barplot+str(q)+'.jpg', dpi=300)
#                         # plt.show()
#                     except:
#                         pass
#                 q += 1


# # In[37]:


# # grouped boxplot (hue)


# # In[97]:


# q = 0
# if first_moved_col != len(categoric.columns):
#     for i in range(first_moved_col):
#         for j in range(first_moved_col):
#             if i != j:
#                 for k in range(first_moved_col, len(categoric.columns)):
#                     fig, ax = plt.subplots(figsize=(10, 10), dpi=100)
#                     sns.boxplot(data=categoric,
#                                 x=categoric.columns[i],
#                                 y=categoric.columns[k],
#                                 hue=categoric.columns[j],
#                                 palette=["m", "g"],)
#                     sns.despine(offset=10, trim=True)
#                     plt.savefig(dir_grouped_boxplot+str(q)+'.jpg', dpi=300)
#                     # plt.show()
#                     q += 1


# # In[98]:


# q = 0
# for i in range(first_moved_col):
#     for j in range(first_moved_col):
#         if i != j:
#             for k in range(first_moved_col, len(categoric.columns)):
#                 fig, ax = plt.subplots(figsize=(5, 5), dpi=100)
#                 sns.violinplot(
#                     data=categoric,
#                     x=categoric.columns[i],
#                     y=categoric.columns[k],
#                     hue=categoric.columns[j],
#                 )
#                 plt.savefig(dir_grouped_violin+str(q)+'.jpg', dpi=300)
#                 # plt.show()
#                 q += 1
