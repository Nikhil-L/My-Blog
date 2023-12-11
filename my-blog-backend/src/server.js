import express from 'express';

let articlesInfo = [{
    name: 'learn-react',
    upvote: 0,
    comments: [],
},{
    name: 'learn-node',
    upvote: 0,
    comments: [],
},{
    name: 'mongodb',
    upvote: 0,
    comments: [],
}]

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(8000, () => {
    console.log("Server is listening on port 8000");
});

app.put('/api/articles/:name/upvote', (req, res) => {
    const {name} = req.params;
    const article = articlesInfo.find(a => a.name === name);
    if(article)
    {
        article.upvote += 1;
        res.send(`This ${name} article now has ${article.upvote} upvotes!`);
    }
    else{
        res.send("The article doesn\'t exit");
    }
});

app.post('/api/articles/:name/comments', (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;

    const article = articlesInfo.find(a => a.name === name);

    if(article)
    {
        article.comments.push({postedBy, text});
        res.send(article.comments);
    }
    else{
        res.send("The article doesn\'t exit");
    }

});