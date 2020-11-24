let ids = 0;

module.exports = {
    async newUser(req, res){
        let name = req.params['name'];

        if(name){
            ids++;
            return res.json({'creds': {
                name: name,
                _id: ids
            }});
        }else{
            return res.json({'error': 'NO-NAME'});
        }
    }
}