const express = require('express')
const newsRouter = express.Router()
const axios = require('axios')

newsRouter.get('/', async(_req, res) => {
    try {
        const newsAPI = await axios.get(`https://newsapi.org/v2/everything?language=en&q=tesla&from=2022-06-04&sortBy=publishedAt&apiKey=5e4d186d03f946cfbc2a49d1c19c6288`)
        res.render('news', { articles : newsAPI.data.articles })
    } catch (err) {
        if(err.response) {
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
            res.render('news', { articles : null })
        } else if(err.request) {
            res.render('news', { articles : null })
            console.log(err.request)
        } else {
            res.render('news', { articles : null })
            console.error('Error', err.message)
        }
    } 
})

newsRouter.get('/:id', async(req, res) => {
    let articleID = req.params.id

    try {
        const newsAPI=await axios.get(`https://newsapi.org/v2/everything?language=en&q=${articleID}&tesla&from=2022-06-04&sortBy=publishedAt&apiKey=5e4d186d03f946cfbc2a49d1c19c6288`)
       
        res.render('newsSingle', { article : newsAPI.data })
    } catch (err) {
        if(err.response) {
            res.render('newsSingle', { article : null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.request) {
            res.render('newsSingle', { article : null })
            console.log(err.request)
        } else {
            res.render('newsSingle', { article : null })
            console.error('Error', err.message)
        }
    } 
})


newsRouter.post('', async(req, res) => {
    let search = req.body.search
    try {
        const newsAPI = await axios.get(`http://newsapi.org/v2/everything?language=en&q=${search}&apiKey=5e4d186d03f946cfbc2a49d1c19c6288`)
        res.render('newsSearch', { articles : newsAPI.data.articles })
    } catch (err) {
        if(err.response) {
            res.render('newsSearch', { articles : null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.requiest) {
            res.render('newsSearch', { articles : null })
            console.log(err.requiest)
        } else {
            res.render('newsSearch', { articles : null })
            console.error('Error', err.message)
        }
    } 
})

module.exports = newsRouter 