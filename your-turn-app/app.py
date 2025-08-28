from flask import Flask, send_from_directory, send_file
import os

app = Flask(__name__, static_folder='.next/static', static_url_path='/static')

@app.route('/')
def index():
    return send_file('.next/server/app/page.html')

@app.route('/<path:path>')
def serve_static(path):
    if os.path.exists(f'.next/server/app/{path}.html'):
        return send_file(f'.next/server/app/{path}.html')
    elif os.path.exists(f'.next/static/{path}'):
        return send_from_directory('.next/static', path)
    else:
        return send_file('.next/server/app/page.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
