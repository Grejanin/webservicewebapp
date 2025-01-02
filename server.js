const express = require('express');
const cors = require('cors');
const yahooFinance = require('yahoo-finance2').default;

const app = express();
const port = 3000;

app.use(cors());

// Rota para buscar dados de uma ação
app.get('/quote/:symbol', async (req, res) => {
    const symbol = req.params.symbol;

    try {
        const quote = await yahooFinance.quote(symbol);
        const price = quote.regularMarketPrice; // Preço atual
        const open = quote.regularMarketOpen; // Valor de abertura
        const previousClose = quote.regularMarketPreviousClose; // Fechamento anterior
        const change = price - previousClose; // Variação
        const changePercent = (change / previousClose) * 100; // Variação percentual

        res.json({
            symbol: quote.symbol,
            price: price,
            open: open,
            change: change,
            changePercent: changePercent,
            currency: quote.currency,
        });
    } catch (error) {
        console.error('Erro ao buscar dados:', error.message);
        res.status(500).json({ error: 'Erro ao obter dados da ação.' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
