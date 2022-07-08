
# Denoising Financial Time Series Using a Denoising Autoencoder.

## This Project:

This website is part of my final year project. I am using a denoising autoencoder (DAE), to try and denoise financial data, to then detect signals (whether to buy or to sell). This website contains two denoising autoencoders, with DAE-v2 being the original DAE, but with new type of training data.


## How to use it:

- #### Stock
The server collects historical data using yahoo finance; therfore, to choose the stock you want to deniose, you should put the ticker of the stock in the same way as yahoo finance (ex ^GSPC, or QNBK.QA).

- #### Date
The date that you should put is the date od the last day you want to get the data for. The format that is used is DD/MM/YYYY, please ensure that you put the correct format.

- #### Period
Default is 1 year.
If you choose a short period, you might not find any returns, as the indicators are made for longer periods.

- #### Risk Factor (NOT working rightnow)
Default is 0%.
It is used to manage the risk for the signal generating indicators.

- #### Number of Epochs
Default is 20.
This is one of the hyper-parameters of the machine learning algorithms. The higher the number, the longer it takes to finish training.

- #### Batch SIze
Default is 4.
This is one of the hyper-parameters of the machine learning algorithms. The lower the number, the longer it takes to finish training.


## Algorithms:
-  Original (Just the original data)
-  DAE-v1
-  DAE-v2


## Indicators:
- Moving Average Crossover
- Moving average convergence divergence
- Bollinger Bands