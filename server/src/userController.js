module.exports = {
    async newUser(req, res){
        let name = req.params['name'];

        if(name && name != ("" || undefined)){
            return res.json({'creds': {
                name
            }});
        }else{
            return res.json({'error': 'NO-NAME'});
        }
    }
}