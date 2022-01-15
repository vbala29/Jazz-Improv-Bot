const isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.flash('error', 'Please login to gain permissions')
        res.redirect('/login')
    } 
    //If are logged in, go to next step in chain.
    next()
}