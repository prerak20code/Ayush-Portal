import stakeholder from '../modelsInvestor/stakeholder';

module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newStakeholder = new stakeholder({
            username,
            email,
        });

        const registeredStakeholder = await stakeholder.register(
            newStakeholder,
            password
        );

        req.login(registeredStakeholder, (err) => {
            if (err) {
                return next(err);
            }

            res.redirect('/listings');
        });
    } catch (e) {
        res.redirect('/signup');
    }
};

module.exports.login = async (req, res) => {
    req.flash('success logged in successfully!');
    let redirectUrl = res.locals.redirectUrl || '/listings';
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            next(err);
        }

        res.redirect('/listings');
    });
};
