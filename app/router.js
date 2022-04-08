const express = require('express')
const router = express.Router()
const db = require('../database/connection.js')

const Prevention = require('sqlstring')

router.get('/', (req, res) => {
    db.query(`SELECT * FROM blogs ORDER BY created_at DESC`, (err, blogPost) => {
        if (err) {
            console.log(err)
        } else {
            res.render('home.ejs', { blogPost })
                // res.json(blogPost)
        }
    })
})

router.get('/edit/:id', (req, res) => {

    const id = req.params.id
    const post = req.body

    db.query(`SELECT * FROM blogs WHERE id = "${id}"`, (err, blog) => {
        if (err) {
            console.log(err)
        } else {
            res.render('edit.ejs', { blog })

        }
    })

})

router.put('/edit/:id', (req, res) => {
    const post = req.body
    const id = req.params.id
    db.query(`UPDATE blogs 
    SET title = ${Prevention.escape(post.title)}, 
    img_url = ${Prevention.escape(post.img_url)},
    description  = ${Prevention.escape(post.description)}
    WHERE id = "${id}"`, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log('updated')
            res.redirect('/')
        }
    })
})

router.get('/delete/:id', (req, res) => {
    const id = req.params.id
    db.query(`DELETE FROM blogs WHERE id = "${id}"`, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log('deleted')
                // res.render('home.ejs')
            res.redirect('/')

        }
    })

})

router.get('/upload', (req, res) => {
    // const post = req.body

    res.render('upload.ejs')

})

router.post('/upload', (req, res) => {
    const post = req.body
    db.query(`INSERT INTO blogs(title, img_url, description) VALUES(
        ${Prevention.escape(post.title)}, ${Prevention.escape(post.img_url)}, ${Prevention.escape(post.description)}
    )`, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Created new post')
            res.redirect('/')
        }
    })


})


module.exports = router;
