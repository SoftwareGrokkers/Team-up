// module.exports = {
	
	// mongo: {
		// db: {
			// usersconnectionString: "mongodb+srv://softwaregrokkers:grokkerssoftware@cluster0.xa1km.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
		// }
	// },
// };


// class credentials{

    // getConnectionString(){
        // var returnvar = {
            
            // mongo: {
                // db: {
                    // usersconnectionString: "mongodb+srv://softwaregrokkers:grokkerssoftware@cluster0.xa1km.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
                // }
            // }
            
        // }
        // return returnvar
    // }
// }

// creds = new credentials()
// module.exports = creds.getConnectionString()



class Credentials{
    
    #instance=null;
    
    #getConnectionString(){
        var returnvar = {
            
            mongo: {
                db: {
                    usersconnectionString: "mongodb+srv://softwaregrokkers:grokkerssoftware@cluster0.xa1km.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
                }
            }
            
        }
        return returnvar
    }
    
    getInstance(){
        
        if (this.#instance == null){
            this.#instance = this.#getConnectionString()
        }
        return this.#instance
        // return this.#getConnectionString()
    }
}
var creds = new Credentials()
var inst = creds.getInstance()

module.exports = inst