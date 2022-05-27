/**
 * Developer: Vikram Bala
 * Contact: vikrambala2002@gmail.com
 * Github Repository: https://github.com/vbala29/Jazz-Improv-Bot#readme
 */

const isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.flash('error', 'Please login to gain permissions')
        res.redirect('/login')
    } else {
        next()
    }
    //If are logged in, go to next step in chain.
}

module.exports = isLoggedIn