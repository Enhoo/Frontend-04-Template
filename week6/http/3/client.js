class Request {
    constructor(options) {
        this.methods = options.methods || 'GET';
        this.host = options.host;
        this.port = options.port || 80;
        this.path = options.path || '/';
        this.body = options.body || {};
        this.headers = options.headers || {};
        if (!this.headers['Content-Type']) {
            this.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }

        if (this.headers['Content-Type'] === 'application/json')
            this.bodyText = JSON.stringify(this.body)
        else if (this.headers['Content-Type'] === 'application/x-www-form-urlencoded')
            this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&')

        this.headers['Content-Length'] = this.bodyText.length
    }

    send(connection) {
        return new Promise((resolve, reject) => {
            const parser = new ResponseParser;
            if(connection){
                connection.write(this.toString())
            }else{
                connection=net.createConnection({
                    host:this.host,
                    port:this.port
                },()=>{
                    connection.write(this.toString())
                })
            }
            connection.on('data',(data)=>{
                console.log(data.toString());
                parse.receive(data.toString())
                if(parser.isFinished){
                    resolve(parse.response)
                    connection.end()
                }
            })
            connection.on('error',(err=>{
                reject(err)
                connection.end()
            }))
        })
    }
}

class ResponseParser{
    constructor(){}
    receive(){
        for (let i = 0; i < string.length; i++) {
            this.receiveChar(string.charAt(i))
        }
    }
    receiveChar(char){
         
    }
    
}

void async function () {
    let request = new Request({
        method: 'POST',
        host: '127.0.0.1',
        port: '8088',
        path: '/',
        headers: {
            ['X-Foo2']: 'customed'
        },
        body: {
            name: 'hello'
        }
    })

    let response = await request.send()
    console.log(response);

}