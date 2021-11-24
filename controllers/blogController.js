//blog_index,blog_details,blog_create_get,blog_create_post,blog_delete
const Blog = require('../models/blog');


const blog_index = (req, res) => {
    Blog.find().sort({
        createdAt: -1
    })
        .then((result) => {
            res.render('../project/pages/index', {
                title: 'ALL',
                blogs: result
            });
        })
        .catch((err) => {
            console.log(err);
        })
}
const blog_company = (req, res) => {
    const comp = req.query.search;
    Blog.find({ 'snippet': { '$regex': comp, '$options': 'i' } }).sort({
        createdAt: -1
    })
        .then((result) => {
            res.render('../project/pages/index', {
                title: "SEARCHED",
                blogs: result
            });
        })
        .catch((err) => {
            console.log(err);
        })
}
const blog_my = (req, res) => {
    const id = req.params.id;
    Blog.find({ "author": id }).sort({
        createdAt: -1
    })
        .then((result) => {
            res.render('../project/pages/index', {
                title: 'PERSONAL',
                blogs: result
            });
        })
        .catch((err) => {
            console.log(err);
        })
}
const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id).
        then(result => {
            res.json({ redirect: '/' });
        }).catch(err => {
            console.log(err);
        })
}

const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id).then((result) => {
        res.render('../project/pages/details', { blog: result, title: 'Blog Details' });
    })
        .catch((err) => {
            res.status(404).render('../project/pages/404.ejs', { title: 'blog not found' });
        });
}

const blog_create_get = (req, res) => {
    res.render('../project/pages/create', { title: 'share' });
}
const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        })
}

module.exports = { blog_index, blog_company, blog_my, blog_delete, blog_details, blog_create_get, blog_create_post };