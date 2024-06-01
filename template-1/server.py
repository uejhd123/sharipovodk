from http.server import HTTPServer, SimpleHTTPRequestHandler

class MyHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path.endswith('/'):
            self.path = '/index.html'
        elif self.path.endswith('/auth'):
            self.path = '/auth.html'
        elif self.path.endswith('/reg'):
            self.path = '/reg.html'  
        return SimpleHTTPRequestHandler.do_GET(self)

def run(server_class=HTTPServer, handler_class=MyHandler):
    server_address = ('', 7000)
    httpd = server_class(server_address, handler_class)
    print("Server running at http://localhost:7000/")
    httpd.serve_forever()

if __name__ == '__main__':
    run()